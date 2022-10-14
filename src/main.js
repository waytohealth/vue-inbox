import Vue from 'vue';
import inbox from './InboxWrapper.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  inbox,
  render: h => h(inbox),
}).$mount('#app');