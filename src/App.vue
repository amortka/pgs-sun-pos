<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  html, body {
    background: #fff;/*#4c4b4b;*/
    height: 100vh;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-grow: 1;
  }
</style>
