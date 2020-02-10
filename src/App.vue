<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style src="@scaife-viewer/scaife-widgets/dist/scaife-widgets.css"></style>
<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: $font-family-sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .body {
    display: flex;
    justify-content: center;
  }
</style>
