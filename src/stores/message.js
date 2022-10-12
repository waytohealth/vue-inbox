import {defineStore} from 'pinia'
import {useAuthStore} from "./auth";

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      baseUrl: "http://localhost",
      participant: null,
      study: null,
      messages: []
    }
  },
  actions: {
    async loadMessages() {
      const authStore = useAuthStore();
      let auth = authStore.requestCredentials;
      let requestParams = Object.assign(auth, {
        method: "GET"
      });

      let params = new URLSearchParams({
        study_id: this.study,
        participant_id: this.participant,
        order_by: 'desc(id)'
      })
      console.log(params);
      let res = await fetch(`${this.baseUrl}/api/v2/text_messages?`+params, requestParams);

      if (!res.ok) {
        throw new Error("womp");
      }

      this.messages = (await res.json()).data;
    },
    async sendMessage(message) {
      const authStore = useAuthStore();

      let body = {
        message_text: message
      }

      let auth = authStore.requestCredentials;
      let requestParams = Object.assign(auth, {
        method: "POST",
        body: JSON.stringify(body)
      });


      let res = await fetch(`${this.baseUrl}/api/v2/participants/${this.participant}/text_messages`, requestParams);
      if (!res.ok) {
        throw new Error("womp");
      }
      let text = (await res.json()).data;
      this.messages.push(text);
    }
  }
})