<template>
  <div id="app">
    <Scene></Scene>
  </div>
</template>

<script>
  import Scene from './components/Scene';

  export default {
    name: 'app',
    components: { Scene },
  };
</script>

<style>
  html, body {
    background: #4c4b4b;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
