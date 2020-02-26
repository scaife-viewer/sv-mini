<template>
  <div class="selected-tokens">
    <div class="selected-token" v-for="token in tokens" :key="token['uuid']">
      <pre>{{ prettyPrint(token) }}</pre>
    </div>
  </div>
</template>
<script>
  export default {
    scaifeConfig: {
      displayName: 'Token Annotations',
      location: 'main',
      singleton: true,
    },
    methods: {
      prettyPrint(token) {
        return JSON.stringify(token, null, 2);
      },
    },
    computed: {
      tokens() {
        return [
          {
            idx: 0,
            uuid: 't1.1',
            value: 'μῆνιν',
            lemma: 'μῆνις',
            tag: 'n-s---fa-',
          },
        ];
      },
    },
  };
</script>
<style lang="scss" scoped>
  .selected-tokens {
    width: 100%;
    margin: 0 2em;
  }
</style>
