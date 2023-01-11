<template>
  <div class="component">
    <div>
      <div class="inbox">
        <spinner size="lg" :fixed="false" :value="store.loading.older || store.loading.initial"></spinner>
        <span v-for="(msgs, date) in messagesByDate" :key="date">
          <div class="date">{{inboxHelper.formatDate(date)}}</div>

          <span v-for="msg in msgs" :key="msg.id">
            <div v-if="msg.sender" class="sender">{{msg.sender}}</div>
            <div  class="message" :class="inboxHelper.messageClasses(msg)">
              <tooltip :content="inboxHelper.tooltipTime(msg)">
                <span class="time">{{ inboxHelper.messageTime(msg) }}</span>
              </tooltip>
              <popover :placement="msg.direction == 'inbound' ? 'right' : 'left'" title="Text message details" :content="`<strong>From:</strong> ${inboxHelper.formatNumber(msg.from_number)}<br>
                  <strong>To:</strong> ${inboxHelper.formatNumber(msg.to_number)}<br/>
                  <strong>Status:</strong> ${inboxHelper.messageStatus(msg)}<br/>
                  <strong>Sent:</strong> ${inboxHelper.messageDetailTime(msg)}`">
                <span class="status-icon glyphicon" :class="getIconForStatus(inboxHelper.statusType(msg))" ></span>
              </popover>
              {{msg.message_text}}
              <ul v-if="msg.media.length > 0" class="list-inline">
                <li v-for="(media, idx) in msg.media" :key="media.sid">
                  <LazyImage
                      :store="store"
                      :url="getImageUrl(msg, idx)"
                  />
                </li>
              </ul>
            </div>
          </span>
        </span>
      </div>
    </div>

    <div>
      <textarea
          rows="1"
          cols="30"
          class="form-control"
          v-model="textContent"
          :disabled="store.loading.send"
      ></textarea>
      <input
          type="submit"
          value="Send SMS Message"
          :class="styleConfig.inboxSubmit"
          v-on:click="sendMessage"
          :disabled="store.loading.send"
          v-if="!store.loading.send"
      >
      <div v-else :class="styleConfig.inboxSubmit" class="disabled">
        Send SMS Message <b-spinner small variant="light" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>

import { spinner, popover, tooltip } from '@waytohealth/vue2-strap3';
import store from './stores/inbox.js';
import styles from './stores/styles.js';
import inboxHelper from './helpers/inbox.js';
import LazyImage from "./components/LazyImage.vue";
export default {
  name: "InboxComponent",
  components: {
    LazyImage,
    spinner,
    popover,
    tooltip
  },
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
    this.handleTop();
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
      if (newObj.length > oldObj.length && store.meta.updates) {
        this.$nextTick(() => {
          this.scrollToBottom(true);
        });
      }
      store.meta.updates = false;
    },
  },
  methods: {
    getIconForStatus(status) {
      switch (status) {
        case "success":
          return "glyphicon-ok text-success";
        case "failure":
          return "glyphicon-warning-sign text-danger";
        case "unknown":
          return "glyphicon-info-sign text-info";
      }
    },
    scrollToBottom(force) {
      if (!this.scrolled || force) {
        let lastMessage = this.$el.querySelector('.inbox')?.lastElementChild?.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView();
          this.scrolled = true;
        } else {
          console.log("Failed to find last element");
        }
      }
    },
    handleTop() {
      let inboxDiv = this.$el?.querySelector('.inbox');
      inboxDiv.onscroll =  () => {
        if (inboxDiv) {
          if (inboxDiv.scrollTop === 0) {
            store.loadOlder();
          }
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
      return this.store.apiBaseUrl + "/api/v2/text_messages/" + msg.id + "/image/" + imageIndex;
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
.component {
  max-height: 55vh;
  min-height: 55vh;
}
.inbox {
  max-height:60vh;
  min-height:60vh;
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
div.sender {
  float: right;
  margin: 0 20px 0 0;
  clear: both;
  font-size: 12px;
  color: #6c6f76;
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
}
.outbound::before {
  right: -9px;
  -webkit-box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
  box-shadow: 2px -2px 2px 0 rgb(178 178 178 / 40%);
}
.outbound.automated, .outbound.automated::before {
  background-color: #e0f1ff;
}
.outbound.manual, .outbound.manual::before {
  background-color: #badfff;
}
.time {
  float: right;
  margin: 0 3px 0;
  color: gray;
}
</style>