<template>

</template>

<script>
import {useMessageStore} from "../stores/message";
import {useAuthStore} from "../stores/auth";
import {mapState} from "pinia";
export default {
  name: "InboxInput",
  props: {
    studyId: {
      type: Number,
      required: true
    },
    participantId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(useMessageStore,  ['messages']),
    sortedMessages() {
      if (this.messages.length) {
        let tmp = this.messages;
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
  beforeMount() {
    const authStore = useAuthStore();
    const messageStore = useMessageStore();

    authStore.method = this.auth.method;
    if (this.auth.apiKey) {
      authStore.apiKey = this.auth.apiKey
    }

    messageStore.baseUrl = this.apiBaseUrl;
  },
  async mounted() {
    const messageStore = useMessageStore();
    this.loading = true;
    messageStore.loadMessages(this.studyId, this.participantId)
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

</style>