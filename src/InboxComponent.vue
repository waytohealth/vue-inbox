<template>
  <div>
    <h2>SMS Inbox</h2>
    {{loading ? 'loading':'done'}}
    <div v-if="!loading" id="inbox" style="min-height: 300px;border-style: solid;">
      <span v-for="(message, idx) in messages" :key="message.id">
        {{idx}}: {{message.message_text}}
      </span>
    </div>
  </div>
</template>

<script>
import {useMessageStore} from "./stores/message";
import {useAuthStore} from "./stores/auth";
import {mapState} from "pinia";
export default {
  name: "InboxComponent",
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
  computed: {
    ...mapState(useMessageStore,  ['messages']),
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
        });

  },
  data() {
    return {
      loading: false,
    }
  }
}
</script>

<style>
.b-overlay-wrap {
  min-height: 150px;
  padding-bottom: 1rem;
}
</style>