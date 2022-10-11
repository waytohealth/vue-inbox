import Vue from 'vue';
import inbox from './InboxWrapper.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()
Vue.use(PiniaVuePlugin);
Vue.use(pinia);

new Vue({
  inbox,
  render: h => h(inbox),
  pinia
}).$mount('#app');