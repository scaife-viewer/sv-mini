<template>
  <div class="interlinear">
    <span class="click" @click="toggleInterlinear">
      Activate {{ destinationMode }}
    </span>
  </div>
</template>

<script>
  // TODO: Prefer scaife-widgets namespace
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
      destinationMode() {
        return this.interlinear ? 'Default' : 'Interlinear';
      },
    },
    methods: {
      toggleInterlinear() {
        this.$store.dispatch(`${TOGGLE_INTERLINEAR}`);
      },
    },
  };
</script>
