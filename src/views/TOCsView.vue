<template>
  <FixedSkeleton :main-widget="mainWidget" :right-widgets="rightWidgets" />
</template>

<script>
  export default {
    name: 'TOCsView',
    computed: {
      mainWidget() {
        return null;
      },
      rightWidgets() {
        return [];
      },
    },
  };
</script>
