<template>
  <FixedSkeleton :main-widget="mainWidget" :right-widgets="rightWidgets" />
</template>

<script>
  import { TOCViewWidget, HelloWorld } from '@scaife-viewer/scaife-widgets';

  export default {
    name: 'TOCsView',
    computed: {
      mainWidget() {
        return TOCViewWidget;
      },
      rightWidgets() {
        return [HelloWorld];
      },
    },
  };
</script>
