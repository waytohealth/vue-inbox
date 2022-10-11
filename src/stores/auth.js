import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      method: "session",
      apiKey: ""
    }
  },
  getters: {
    requestCredentials() {
      if (this.method === 'session') {
        return {
          credentials: "include"
        }
      } else if (this.apiKey.length > 0) {
        return {
          headers: new Headers({
            'Authorization': 'Bearer '+ this.apiKey,
          })
        }
      }
    }
  }
})