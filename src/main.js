import Vue from 'vue';
import inbox from './InboxWrapper.vue'

new Vue({
  inbox,
  render: h => h(inbox),
}).$mount('#app');