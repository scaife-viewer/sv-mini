import Vue from 'vue';
import {
  faChevronLeft,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import SkeletonPlugin from 'scaife-skeleton';
import EndpointsPlugin from '@scaife-viewer/scaife-widgets';
import GraphQLPlugin from '@/gql';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

const iconMap = [faChevronLeft, faChevronDown, faChevronRight].reduce(
  (map, obj) => {
    // eslint-disable-next-line no-param-reassign
    map[obj.iconName] = obj;
    return map;
  },
  {},
);

Vue.use(SkeletonPlugin, { iconMap });
Vue.use(GraphQLPlugin);

const widgetEndpoints = {};
if (process.env.VUE_APP_TOC_ENDPOINT) {
  widgetEndpoints.tocEndpoint = process.env.VUE_APP_TOC_ENDPOINT;
}
Vue.use(EndpointsPlugin, widgetEndpoints);

// FIXME: This is the only way I was able to actually modify
// $scaife.endpoints correctly
Vue.prototype.$scaife.endpoints = {
  ...Vue.prototype.$scaife.endpoints,
  ...widgetEndpoints,
};

Vue.config.productionTip = false;

Vue.prototype.$isEmpty = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
