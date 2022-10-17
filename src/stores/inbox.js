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
    oldest: null
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
      order_by: 'desc(id)'
    }, params));

    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?`+search, requestParams);

    if (!res.ok) {
      throw new Error("womp");
    }

    this.meta.lastUpdated = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return (await res.json()).data;
  },

  async loadMessages() {
    let messages = await this.fetchMessages();
    this.messagesObj = messages.reduce((accumulator, text) => {
      return {...accumulator, [text.id]: text};
    }, {});
  },
  async poll() {
    console.log("polling");

    let params = {
      updated_at: 'after(' + this.meta.lastUpdated + ')',
    };

    let messages = await this.fetchMessages(params);
    if (messages.length) {
      let newMessages = messages.reduce((accumulator, text) => {
        return {...accumulator, [text.id]: text};
      }, {});
      this.messagesObj = Object.assign({}, this.messagesObj, newMessages)
    }
  },
  async sendMessage(message) {
    let body = {
      message_text: message
    }

    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });

    let res = await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/text_messages`, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    let text = (await res.json()).data;
    this.messages.push(text);
    this.messagesObj[text.id] = text;
  }
};


export default appState;