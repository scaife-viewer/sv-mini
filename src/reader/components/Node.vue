<template>
  <li>
    <template v-if="hasChildren">
      <span class="open-toggle" @click.prevent="toggle">
        <Icon :name="icon" class="fa-xs" fixed-width />
      </span>
    </template>

    <span class="node version" v-if="routable">
      <router-link
        :to="{ path: 'reader', query: { urn: metadata.firstPassageUrn } }"
      >
        {{ metadata.workTitle }}
      </router-link>
    </span>
    <span v-else class="node monospace">
      <tt>{{ urn }}</tt>
    </span>

    <ul class="node-tree" v-if="expanded">
      <Node
        v-for="(node, index) in node.children"
        :key="index"
        :node="node"
      ></Node>
    </ul>
  </li>
</template>

<script>
  import { Icon } from '@scaife-viewer/scaife-widgets';

  export default {
    name: 'Node',
    props: ['node'],
    components: {
      Icon,
    },
    data() {
      return {
        expanded: false,
      };
    },
    computed: {
      urn() {
        // TODO: Cast to URN post-refactor.
        return this.node.data.urn;
      },
      kind() {
        return this.node.data.kind;
      },
      metadata() {
        return this.node.data.metadata;
      },
      routable() {
        return this.kind === 'version';
      },
      icon() {
        return this.expanded ? 'chevron-down' : 'chevron-right';
      },
      hasChildren() {
        return this.node.children && this.node.children.length;
      },
    },
    methods: {
      toggle() {
        this.expanded = !this.expanded;
      },
    },
  };
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
  li {
    margin-top: 0.33em;
  }
  span {
    text-decoration: none;
    &.open-toggle {
      color: $gray-400;
      padding: 0 0.33em 0 0;
      &:hover {
        color: $gray-700;
      }
    }
  }
  .node {
    font-size: 0.9rem;
    &.monospace {
      font-size: 1.1rem;
    }
    &.version {
      margin-left: 0.66em;
    }
  }
</style>
