<template>
  <div>
    <div>
      <div class="inbox" style="min-height: 300px;">
      <span v-for="(msgs, date) in messagesByDate" :key="date">
        <div class="date">{{formatDate(date)}}</div>
        <div v-for="msg in msgs" :key="msg.id" class="message" :class="[msg.direction == 'inbound' ? 'inbound' : 'outbound'] ">
          <span class="time">{{messageTime(msg)}}</span>
          {{msg.message_text}}
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

import store from './stores/inbox'
import styles from './stores/styles'
import dayjs from 'dayjs';

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
      textContent: ""
    }
  },
  beforeMount() {

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
  },
  computed: {
    sortedMessages() {
      if (this.store.messages?.length) {
        let tmp = this.store.messages;
        return tmp.sort(function(a,b) {
          if ((a.sent_at || a.created_at) > (b.sent_at || b.created_at)) {
            return 1;
          } else if ((a.sent_at || a.created_at) < (b.sent_at || b.created_at)) {
            return -1;
          }

          return a.id > b.id ? 1:-1;
        });
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
    formatDate(date) {
      return dayjs(date).format('~ dddd, D MMMM YYYY ~');
    },
    messageTime(msg) {
      let datetime = msg.sent_at || msg.created_at;
      return dayjs(datetime).format('h:m A');
    },
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.scrollToBottom(true);
        this.textContent = "";
      }
    }
  }
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
</style>