/* global describe, expect, it  */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import SkeletonPlugin from 'scaife-skeleton';

import createStore from '@/reader/config';
import LibraryWidget from '@/reader/widgets/LibraryWidget.vue';
import Node from '@/reader/components/Node.vue';

const localVue = createLocalVue();
const widgets = [LibraryWidget];
localVue.use(SkeletonPlugin, { widgets });
localVue.use(Vuex);

describe('LibraryWidget.vue', () => {
  it('Passes props and renders a Node tree.', () => {
    const moduleStore = createStore();
    const store = new Vuex.Store({
      modules: {
        [moduleStore.namespace]: moduleStore.store,
      },
    });
    const wrapper = shallowMount(LibraryWidget, {
      store,
      localVue,
      computed: {
        libraryTree() {
          return [{ some: 'data' }];
        },
      },
    });
    const container = wrapper.find('div');
    expect(container.classes()).toContain('library-widget');

    const root = wrapper.find('ul');
    expect(root.classes()).toStrictEqual(['node-tree', 'root']);

    expect(wrapper.find(Node).props()).toStrictEqual({
      node: { some: 'data' },
    });
  });
});
