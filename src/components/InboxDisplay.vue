<template>
  <div>
    {{loading ? 'loading':'done'}}
    <div v-if="!loading" id="inbox" style="min-height: 300px;">
      <span v-for="(msgs, date) in messagesByDate" :key="date">
        <div class="date">{{formatDate(date)}}</div>
        <div v-for="msg in msgs" :key="msg.id" class="message" :class="[msg.direction == 'inbound' ? 'inbound' : 'outbound'] ">
          <span class="time">{{messageTime(msg)}}</span>
          {{msg.message_text}}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InboxDisplay",
  props: {
    store: {
      type:Object,
      required: true
    },
    styleConfig: {
      type:Object,
      required: true
    }
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
  async created() {
    this.loading = true;
    this.store.loadMessages()
        .then(() => {
          this.loading = false
        }).catch((e) => {
      // TODO: proper error handling
      console.log(e);
      this.loading = false;
    });
  },
  methods: {
    formatDate(date) {
      // TODO: proper date formatting
      return "~ " + date + " ~";
    },
    messageTime(msg) {
      let datetime = msg.sent_at || msg.created_at;
      return datetime.split(" ")[1];
    }
  },
  data() {
    return {
      loading: false,
    }
  }
}
</script>

<style scoped>
#inbox {
  border: 5px solid blue;
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