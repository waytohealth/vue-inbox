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
    return this.session?.mode === 'Manual';
  },
  get isAutomatedModeActive() {
    return this.session?.mode === 'Automated';
  },
  get manualModeExpiration() {
    if (this.session?.mode === 'Manual') {
      let datetime = this.session.expires_at;
      return dayjs(datetime).format('h:mm:ss A z');
    }
  },
  get sessionTimeRemaining() {
    if (this.session?.expires_at) {
      const datetime = this.session.expires_at;
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