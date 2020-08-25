import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { sync } from 'vuex-router-sync';

import {
  faChevronLeft,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { SkeletonPlugin } from '@scaife-viewer/skeleton';
import { DefaultModeReader } from '@scaife-viewer/widget-reader';
import { DISPLAY_MODE_DEFAULT } from '@scaife-viewer/store';

import App from '@/App.vue';
import router from '@/router';
import store, { apolloProvider } from '@/store';

sync(store, router);

const iconMap = [faChevronLeft, faChevronDown, faChevronRight].reduce(
  (map, obj) => {
    // eslint-disable-next-line no-param-reassign
    map[obj.iconName] = obj;
    return map;
  },
  {},
);

const config = {
  readerComponents: {
    [DISPLAY_MODE_DEFAULT]: DefaultModeReader,
  },
};
Vue.use(SkeletonPlugin, { iconMap, config });

Vue.use(VueApollo);

Vue.config.productionTip = false;

Vue.prototype.$isEmpty = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

new Vue({
  router,
  store,
  render: (h) => h(App),
  apolloProvider,
}).$mount('#app');
