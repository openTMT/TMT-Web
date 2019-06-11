<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {}
</script>

<style lang="less">

  html, body {
    height: 100%;
    overflow: auto;
    min-width: 1200px;
  }

  body {
    margin: 0;

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;

  }


</style>
