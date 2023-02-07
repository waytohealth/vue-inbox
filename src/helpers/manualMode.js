import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default {
  session: null,
  conversation: null,

  setCurrentSession(messaging_mode_session) {
    this.session = messaging_mode_session;
  },

  setCurrentConversation(conversation) {
    this.conversation = conversation;
  },

  get isManualModeActive() {
    return !!this.session?.id;
  },
  get manualModeExpiration() {
    if (this.session) {
      let datetime = this.session.expires_at;
      return dayjs(datetime).format('h:mm:ss A z');
    }
  },
  get manualModeTimeRemaining() {
    if (this.session) {
      let datetime = this.session.expires_at;
      return dayjs(datetime).fromNow(true);
    }
  },

  get isConversationActive() {
    return !!this.conversation?.id;
  },
  get conversationExpiration() {
    if (this.conversation) {
      let datetime = this.conversation.expires_at;
      return dayjs(datetime).format('h:mm:ss A z');
    }
  },
  get conversationName() {
    if (this.conversation) {
      return this.conversation.source_name;
    }
  }
}