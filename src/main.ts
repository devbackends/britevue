import * as dotenv from 'dotenv';
dotenv.config();
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon,FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-pro/css/all.css'
import '@fortawesome/fontawesome-pro/js/all'
import {faHeart,faLink, faShareAlt, faStar, faCoin as CoinR, faSmileWink, faChevronLeft,faChevronRight,faTrashAlt,faArrowToTop, faQuestionCircle, faQuestion, faSearch, faPen,faChevronDown, faCheck, faTimesCircle } from "@fortawesome/pro-regular-svg-icons";
import {fas} from "@fortawesome/pro-solid-svg-icons";
import {faCoin,faSmile,faMapMarkedAlt,faCamera,faTimes, faBars} from "@fortawesome/pro-light-svg-icons";
import {} from "@fortawesome/pro-solid-svg-icons";
import ServiceContainer from '@/services/Container.ts';
import VueShowdown from 'vue-showdown';

import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  keyName: 'head'
})

Vue.use(VueShowdown, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false,
  },
})

const ProgressBar = require('vuejs-progress-bar');
Vue.use(ProgressBar);

import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);
require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCookies)
library.add(faHeart, faLink,faShareAlt, faStar, faCoin, CoinR, faChevronDown, faSmileWink, faChevronLeft, faChevronRight,faSmile,faMapMarkedAlt,faCamera,faTrashAlt,faArrowToTop,faTimes,faPen,faQuestionCircle, faQuestion,faSearch,faBars,faCheck,faTimesCircle, fas);
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  provide: ServiceContainer,
  router,
  render: h => h(App)
}).$mount('#app')

