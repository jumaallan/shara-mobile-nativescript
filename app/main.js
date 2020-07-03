import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import 'nativescript-tailwind/dist/tailwind.css'
import store from './store'
import axios from 'axios'
import {initializer} from './plugins/axios';
import {Feedback} from 'nativescript-feedback';
import Navigator from 'nativescript-vue-navigator';
import {routes} from './router';

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
global.axios = axios;
initializer(store);

Vue.prototype.$feedback = new Feedback();
Vue.registerElement(
    'PullToRefresh',
    () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);
Vue.registerElement(
    'Fab',
    () => require('nativescript-floatingactionbutton').Fab
);

Vue.use(Navigator, {routes});

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  store,
  render: h => h(App)
}).$start()
