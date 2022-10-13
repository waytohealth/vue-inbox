let appState = {
  messages: [],
  apiBaseUrl: null,
  participantId: null,
  studyId: null,
  auth: {
    method: "session",
    apiKey: ""
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
  async loadMessages() {
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });

    let params = new URLSearchParams({
      study_id: this.studyId,
      participant_id: this.participantId,
      order_by: 'desc(id)'
    })
    console.log(this);
    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?`+params, requestParams);

    if (!res.ok) {
      throw new Error("womp");
    }

    this.messages = (await res.json()).data;
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
  }
};


export default appState;