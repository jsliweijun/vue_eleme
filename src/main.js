import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import VueResource from 'vue-resource';
//import './common/stylus/icon.styl';
import './common/css/iconfonts.css';
import './common/css/base.css';
import './common/css/reset.css';
//import axios from 'axios';
//import VueAxios from 'vue-axios'; 


Vue.config.productionTip = false;
Vue.use(VueResource);
//Vue.use(VueAxios,axios);
   
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
