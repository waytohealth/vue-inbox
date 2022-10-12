<template>
  <div>
    <h2>SMS Inbox</h2>
    <InboxDisplay />
    <InboxInput />
  </div>
</template>

<script>
import {useMessageStore} from "./stores/message";
import {useAuthStore} from "./stores/auth";
import InboxDisplay from "./components/InboxDisplay";
import InboxInput from "./components/InboxInput";
export default {
  name: "InboxComponent",
  components: {
    InboxInput,
    InboxDisplay
  },
  props: {
    auth: {
      type: Object,
      required: true,
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
    }
  },
  beforeMount() {
    const authStore = useAuthStore();
    const messageStore = useMessageStore();

    authStore.method = this.auth.method;
    if (this.auth.apiKey) {
      authStore.apiKey = this.auth.apiKey
    }

    messageStore.baseUrl = this.apiBaseUrl;
    messageStore.participant = this.participantId;
    messageStore.study = this.studyId;
  }
}
</script>

<style>
.b-overlay-wrap {
  min-height: 150px;
  padding-bottom: 1rem;
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