import Vue from 'vue';
import inbox from './InboxWrapper.vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

new Vue({
  inbox,
  render: h => h(inbox),
}).$mount('#app');