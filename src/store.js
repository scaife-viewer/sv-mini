import Vue from 'vue';
import Vuex from 'vuex';

import { createStore as createSkeletonStore } from 'scaife-skeleton';
import { scaifeWidgets } from '@scaife-viewer/scaife-widgets';
// eslint-disable-next-line import/no-named-default
import { default as createReaderStore } from './reader/config';

import createStore from './config';

Vue.use(Vuex);

const readerStore = createReaderStore();
const skeletonStore = createSkeletonStore();

const store = new Vuex.Store({
  modules: {
    [readerStore.namespace]: readerStore.store,
    [scaifeWidgets.namespace]: scaifeWidgets.store,
    [skeletonStore.namespace]: skeletonStore.store,
  },
  ...createStore(),
});

if (process.env.VUE_APP_TOC_ENDPOINT) {
  // TODO: Determine if there is a better way to make this
  // a configurable value.
  store.state[scaifeWidgets.namespace].tocEndpoint =
    process.env.VUE_APP_TOC_ENDPOINT;
}

export default store;
