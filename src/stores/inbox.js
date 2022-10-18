import dayjs from 'dayjs';

let appState = {
  messagesObj: {},
  apiBaseUrl: null,
  participantId: null,
  studyId: null,
  auth: {
    method: "session",
    apiKey: ""
  },
  meta: {
    lastUpdated: null,
    oldest: null,
    limit: 20
  },
  loading: {
    older: false,
    initial: false,
    polling: false,
    send: false
  },
  authCredentials() {
    if (this.auth.method === 'session') {
      return {
        credentials: "include"
      }
    } else if (this.auth.apiKey.length > 0) {
      return {
        headers: new Headers({
          'Authorization': 'Bearer '+ this.auth.apiKey,
        })
      }
    }
  },
  async fetchMessages(params) {
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });

    let search = new URLSearchParams(Object.assign({
      study_id: this.studyId,
      participant_id: this.participantId,
      order_by: 'desc(id)',
      per_page: this.meta.limit
    }, params));

    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?`+search, requestParams);

    if (!res.ok) {
      throw new Error("womp");
    }

    this.meta.lastUpdated = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return (await res.json()).data;
  },
  async loadMessages() {
    if (this.loading.initial) {
      return false;
    }
    this.loading.initial = true;
    let messages = await this.fetchMessages();
    this.messagesObj = messages.reduce((accumulator, text) => {
      if (!this.meta.oldest || text.created_at < this.meta.oldest) {
        this.meta.oldest = text.created_at;
      }
      return {...accumulator, [text.id]: text};
    }, {});
    this.loading.initial = false;
  },
  async poll() {
    if (this.loading.polling) {
      return false;
    }
    console.log("polling");

    let params = {
      updated_at: 'after(' + this.meta.lastUpdated + ')',
    };

    this.loading.polling = true;
    let messages = await this.fetchMessages(params);
    if (messages.length) {
      let newMessages = messages.reduce((accumulator, text) => {
        if (!this.meta.oldest || text.created_at < this.meta.oldest) {
          this.meta.oldest = text.created_at;
        }
        return {...accumulator, [text.id]: text};
      }, {});
      this.messagesObj = Object.assign({}, this.messagesObj, newMessages)
    }
    this.loading.polling = false;
  },
  async loadOlder() {
    if (this.loading.older) {
      return false;
    }
    console.log("older");

    let params = {
      created_at: 'before(' + this.meta.oldest + ')',
    };

    this.loading.older = true;
    let messages = await this.fetchMessages(params);
    if (messages.length) {
      let newMessages = messages.reduce((accumulator, text) => {
        return {...accumulator, [text.id]: text};
      }, {});
      this.messagesObj = Object.assign({}, this.messagesObj, newMessages)
    }
    this.loading.older = false;
  },
  async sendMessage(message) {
    if (this.loading.send) {
      return false;
    }
    let body = {
      message_text: message
    }

    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });

    this.loading.send = true;
    let res = await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/text_messages`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }
    let text = (await res.json()).data;
    this.messagesObj[text.id] = text;
    this.loading.send = false;
  }
};


export default appState;