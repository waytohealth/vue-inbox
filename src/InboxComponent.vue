<template>
  <div>
    <div>
      <div class="inbox" style="min-height: 300px;">
      <span v-for="(msgs, date) in messagesByDate" :key="date">
        <div class="date">{{inboxHelper.formatDate(date)}}</div>
        <div v-for="msg in msgs" :key="msg.id" class="message" :class="[msg.direction == 'inbound' ? 'inbound' : 'outbound'] ">
          <span class="time" v-b-tooltip.hover :title="inboxHelper.tooltipTime(msg)">{{ inboxHelper.messageTime(msg) }}</span>
          <a href="#" :id="'icon-'+msg.id">
            <b-icon
                v-if="inboxHelper.statusType(msg) == 'success'"
                class="status-icon"
                icon="check-lg"
                variant="success">
            </b-icon>
            <b-icon
                v-if="inboxHelper.statusType(msg) == 'failure'"
                class="status-icon"
                icon="exclamation-triangle-fill"
                variant="danger">
            </b-icon>
            <b-icon
                v-if="inboxHelper.statusType(msg) == 'unknown'"
                class="status-icon"
                icon="info-circle-fill"
                variant="info">
            </b-icon>
          </a>
          <b-popover
              :target="'icon-'+msg.id"
              title="Text Message Details"
              triggers="click blur"
              :placement="msg.direction == 'inbound' ? 'right' : 'left'"
          >
            <template #title>Text Message Details</template>
            <strong>From:</strong> {{ inboxHelper.formatNumber(msg.from_number) }}<br/>
            <strong>To:</strong> {{ inboxHelper.formatNumber(msg.to_number) }}<br/>
            <strong>Status:</strong> {{ inboxHelper.messageStatus(msg) }}<br/>
            <strong>Sent:</strong> {{ inboxHelper.messageDetailTime(msg) }}
          </b-popover>
          {{msg.message_text}}
          <ul v-if="msg.media.length > 0" class="list-inline">
            <li v-for="(media, index) in msg.media" :key="media.sid">
              <img class="inbox-img" :src="getImageUrl(msg, index)"/>
            </li>
          </ul>
        </div>
      </span>
      </div>
    </div>

    <div>
      <textarea rows="4" cols="30" class="form-control" v-model="textContent"></textarea>
      <input type="submit" value="Send SMS Message" :class="styleConfig.inboxSubmit" v-on:click="sendMessage">
    </div>
  </div>
</template>

<script>

import store from './stores/inbox';
import styles from './stores/styles';
import inboxHelper from './helpers/inbox';

export default {
  name: "InboxComponent",
  props: {
    auth: {
      type: Object,
      required: false,
      default() {
        return {
          method: "session",
          apiKey: ""
        }
      }
    },
    apiBaseUrl: {
      type: String,
      required: true
    },
    studyId: {
      type: Number,
      required: true
    },
    participantId: {
      type: Number,
      required: true
    },
    styles: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles, this.styles),
      store: store,
      inboxHelper: inboxHelper,
      textContent: ""
    }
  },
  async created() {
    this.store.apiBaseUrl = this.apiBaseUrl;
    this.store.participantId = this.participantId;
    this.store.studyId = this.studyId;
    this.store.auth = this.auth;

    this.loading = true;
    this.store.loadMessages()
        .then(() => {
          this.loading = false;
          this.scrollToBottom();
        }).catch((e) => {
          // TODO: proper error handling
          console.log(e);
          this.loading = false;
        });
  },
  mounted() {
    this.scrollToBottom();
    this.poll();
  },
  computed: {
    sortedMessages() {
      if (Object.keys(this.store.messagesObj).length > 0) {
        return this.inboxHelper.sortMessages(Object.values(this.store.messagesObj));
      }
      return [];
    },
    messagesByDate() {
      if (this.sortedMessages.length) {
        return this.sortedMessages.reduce(function(rv, x) {
          (rv[x['created_at'].split(" ")[0]] = rv[x['created_at'].split(" ")[0]] || []).push(x);
          return rv;
        }, {});
      }
      return [];
    },
  },
  watch: {
    sortedMessages(newObj, oldObj) {
      if (newObj.length > oldObj.length) {
        this.$nextTick(() => {
          this.scrollToBottom(true);
        });
      }
    },
  },
  methods: {
    scrollToBottom(force) {
      if (!this.scrolled || force) {
        let lastMessage = this.$el.querySelector('.inbox')?.lastElementChild?.lastElementChild;
        if (lastMessage) {
          console.log("Scrolling");
          console.log(lastMessage);
          lastMessage.scrollIntoView();
          this.scrolled = true;
        } else {
          console.log("Failed to find last element");
        }
      }
    },
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.scrollToBottom(true);
        this.textContent = "";
      }
    },
    getImageUrl(msg, imageIndex) {
      return this.store.apiBaseUrl + "/admin/study/" + this.studyId + "/textMessage/" + msg.id + "/image/" + imageIndex;
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll()
      }, 10000)
    }
  },
}
</script>

<style scoped>
.inbox {
  height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom: 2px solid rgba(0,0,0,.2);
}
.date {
  clear: both;
  font-size: 1.1em;
  color: gray;
  text-align: center;
}
.message {
  position: relative;
  display: inline-block;
  min-width: 150px;
  max-width: 450px;
  padding: 10px 18px;
  clear: both;
  vertical-align: top;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 6px #b2b2b2;
  box-shadow: 0 0 6px #b2b2b2;
}
.inbound {
  float: left;
  margin: 5px 45px 5px 20px;
  background-color: #bdf9bd;
}
.inbound::before {
  left: -9px;
  background-color: #bdf9bd;
  -webkit-box-shadow: -2px 2px 2px 0 rgba(178,178,178,.4);
  box-shadow: -2px 2px 2px 0 rgba(178,178,178,.4);
}
.message::before {
  position: absolute;
  top: 11px;
  display: block;
  width: 20px;
  height: 16px;
  content: "\00a0";
  -webkit-transform: rotate(29deg) skew(-35deg);
  -moz-transform: rotate(29deg) skew(-35deg);
  -ms-transform: rotate(29deg) skew(-35deg);
  -o-transform: rotate(29deg) skew(-35deg);
  transform: rotate(29deg) skew(-35deg);
}
.outbound {
  float: right;
  margin: 5px 20px 5px 45px;
  background-color: #e0f1ff;
}
.outbound::before {
  right: -9px;
  background-color: #e0f1ff;
  -webkit-box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
  box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
}
.time {
  float: right;
  margin: 0 3px 0;
  color: gray;
}
.inbox-img {
    width: 200px;
    height: 200px;
    margin: 20px 0;
    text-align: center;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
}
</style>