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
    updates: false,
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
  async fetchImage(url) {
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    let res = await fetch(url, requestParams);
    let blob = await res.blob();

    return URL.createObjectURL(blob);
  },
  async fetchMessages(params, update = true) {
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

    if (update) {
      // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
      // of a text we wouldn't get it. Move the search back by a second to account for that
      this.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
    }
    let messages = (await res.json()).data;
    if (messages.length) {
      let newMessages = messages.reduce((accumulator, text) => {
        if (!this.meta.oldest || text.created_at < this.meta.oldest) {
          this.meta.oldest = text.created_at;
        }
        return {...accumulator, [text.id]: text};
      }, {});
      this.messagesObj = Object.assign({}, this.messagesObj, newMessages)
    }
    return messages;
  },
  async loadMessages() {
    if (this.loading.initial) {
      return false;
    }
    this.loading.initial = true;
    await this.fetchMessages();
    this.loading.initial = false;
  },
  async poll() {
    if (this.loading.polling) {
      return false;
    }

    let params = {
      updated_at: 'after(' + this.meta.lastUpdated + ')',
    };

    this.loading.polling = true;
    let messages = await this.fetchMessages(params);
    this.loading.polling = false;
    if (messages.length) {
      this.meta.updates = true;
    }
  },
  async loadOlder() {
    if (this.loading.older) {
      return false;
    }

    let params = {
      created_at: 'before(' + this.meta.oldest + ')',
    };

    this.loading.older = true;
    await this.fetchMessages(params, false);
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
    let obj = {};
    obj[text.id] = text;

    this.messagesObj = Object.assign({}, this.messagesObj, obj);
    this.meta.updates = true;
    this.loading.send = false;
  }
};


export default appState;