/* global describe, expect, it  */
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Node from '@/reader/components/Node.vue';

describe('Node.vue', () => {
  it('It renders nodes without children.', () => {
    const node = {
      data: { urn: 'urn:cts:1:', kind: 'node', metadata: {} },
      children: [],
    };
    const wrapper = shallowMount(Node, { propsData: { node } });

    expect(wrapper.html()).not.toContain('<span class="open-toggle"');
    expect(wrapper.html()).toContain(
      '<span class="node monospace"><tt>urn:cts:1:</tt></span>',
    );
    expect(wrapper.html()).not.toContain('<a>');
    expect(wrapper.html()).not.toContain('<ul class="node-tree"');
  });

  it('It renders routable version nodes without children.', () => {
    const node = {
      data: {
        urn: 'urn:cts:1:1.1.1:',
        kind: 'version',
        metadata: {
          workTitle: 'some title',
          firstPassageUrn: 'urn:cts:1:1.1.1:1',
        },
      },
      children: [],
    };
    const wrapper = shallowMount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });

    expect(wrapper.html()).not.toContain('<span class="open-toggle"');
    expect(wrapper.html()).toContain('<span class="node version">');
    const route = wrapper.find('a');
    expect(route.text()).toBe('some title');
    expect(wrapper.html()).not.toContain('<ul class="node-tree"');
  });

  it('It does not render children when parent node not expanded.', () => {
    const node = {
      data: { urn: 'urn:cts:1:1.1:', kind: 'node', metadata: {} },
      children: [
        {
          data: {
            urn: 'urn:cts:1:1.1.1:',
            kind: 'version',
            metadata: {
              workTitle: 'some title',
              firstPassageUrn: 'urn:cts:1:1.1.1:1',
            },
          },
          children: [],
        },
      ],
    };
    const wrapper = shallowMount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });

    const spans = wrapper.findAll('span');
    expect(spans.at(0).classes()).toStrictEqual(['open-toggle']);
    expect(spans.at(1).classes()).toStrictEqual(['node', 'monospace']);
    const monospace = wrapper.findAll('tt');
    expect(monospace.length).toBe(1);
    expect(monospace.at(0).text()).toBe('urn:cts:1:1.1:');

    const childList = wrapper.findAll('ul');
    expect(childList.length).toBe(0);
  });

  it('It renders all nodes when expanded.', async () => {
    const node = {
      data: { urn: 'urn:cts:1:1.1:', kind: 'node', metadata: {} },
      children: [
        {
          data: {
            urn: 'urn:cts:1:1.1.1:',
            kind: 'version',
            metadata: {
              workTitle: 'some title',
              firstPassageUrn: 'urn:cts:1:1.1.1:1',
            },
          },
          children: [],
        },
      ],
    };
    // Use a full mount here so we can see the recursion happen.
    const wrapper = mount(Node, {
      propsData: { node },
      stubs: { RouterLink: RouterLinkStub },
    });
    const toggle = wrapper.find('span');
    toggle.trigger('click');
    await wrapper.vm.$nextTick();

    const spans = wrapper.findAll('span');
    expect(spans.at(0).classes()).toStrictEqual(['open-toggle']);
    expect(spans.at(1).classes()).toStrictEqual(['node', 'monospace']);
    const monospace = wrapper.findAll('tt');
    expect(monospace.length).toBe(1);
    expect(monospace.at(0).text()).toBe('urn:cts:1:1.1:');

    const childList = wrapper.findAll('ul');
    expect(childList.length).toBe(1);
    expect(childList.at(0).classes()).toStrictEqual(['node-tree']);
    expect(spans.at(2).classes()).toStrictEqual(['node', 'version']);

    const route = wrapper.findAll('a');
    expect(route.length).toBe(1);
    expect(route.at(0).text()).toBe('some title');
  });
});
