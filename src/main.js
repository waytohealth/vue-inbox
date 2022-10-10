import Vue from 'vue';
import inbox from './InboxComponent.vue'


new Vue({
  inbox,
  render: h => h(inbox)
}).$mount('#app');