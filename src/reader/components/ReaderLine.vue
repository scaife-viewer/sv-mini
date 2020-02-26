<template>
  <div class="line u-flex">
    <div class="line-ref">{{ line.ref }}</div>
    <div class="line-text" v-html="line.textContent"></div>
  </div>
</template>
<script>
  export default {
    props: ['line'],
  };
</script>
<style lang="scss" scoped>
  .line {
    display: flex;
    align-items: baseline;
    .line-ref {
      font-size: 10pt;
      color: #69c;
      font-family: 'Noto Sans';
      min-width: 4em;
      margin-left: 1em;
      text-align: right;
    }
    .line-text {
      margin-left: 1em;
    }
  }
</style>
