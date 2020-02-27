<template>
  <div class="display-mode-widget">
    <span v-if="interlinear" class="click" @click="toggleInterlinear">
      Default
    </span>
    <span v-else class="active">
      Default
    </span>
    <span v-if="!interlinear" class="click" @click="toggleInterlinear">
      Interlinear
    </span>
    <span v-else class="active">
      Interlinear
    </span>
  </div>
</template>

<script>
  // TODO: Prefer scaife-widgets namespace
  // TODO: Simplify source / destination modes in template
  import { TOGGLE_INTERLINEAR } from '@/constants';

  export default {
    scaifeConfig: {
      displayName: 'Display Mode',
      location: 'sidebar',
      singleton: true,
    },
    computed: {
      interlinear() {
        return this.$store.getters.interlinear;
      },
      sourceMode() {
        return !this.interlinear ? 'Interlinear' : ' Default';
      },
      destinationMode() {
        return this.interlinear ? 'Default' : 'Interlinear';
      },
    },
    methods: {
      // TODO: Move out of store and into route
      toggleInterlinear() {
        this.$store.dispatch(`${TOGGLE_INTERLINEAR}`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  // TODO: Mimic TextWidth further
  .active {
    color: #343a40;
  }
  .click {
    cursor: pointer;
  }
  .display-mode-widget {
    margin: 0 2em;
    flex: 1;
    color: #adb5bd;
  }
  span {
    padding-right: 20px;
  }
</style>
