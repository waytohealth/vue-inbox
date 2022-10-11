import {defineStore} from 'pinia'
import {useAuthStore} from "./auth";

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      baseUrl: "http://localhost",
      user: null,
      messages: []
    }
  },
  actions: {
    async loadMessages(study, participant) {
      const authStore = useAuthStore();
      let auth = authStore.requestCredentials;
      console.log(auth)
      let requestParams = Object.assign(auth, {
        method: "GET"
      });

      let params = new URLSearchParams({
        study_id: study,
        participant_id: participant,
        order_by: 'desc(id)'
      })
      console.log(params);
      let res = await fetch(`${this.baseUrl}/api/v2/text_messages?`+params, requestParams);

      if (!res.ok) {
        throw new Error("womp");
      }

      this.messages = (await res.json()).data;
    }
  }
})