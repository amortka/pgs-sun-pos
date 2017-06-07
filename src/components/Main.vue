<template>
  <div class="container" ref="container">
    <header>header</header>
    <div class="Body">
      <main class="Content">
        <Scene :position="position"></Scene>
      </main>
      <nav class="Nav">
        <LeafletMap @updatePosition="updatePosition"></LeafletMap>
        <SunChart></SunChart>
      </nav>
    </div>
    <!--<footer>some footer here</footer>-->
  </div>
</template>

<script>
  import LeafletMap from './LeafletMap';
  import Scene from './Scene';
  import SunChart from './SunChart';

  const defaultPosition = {
    lat: 51.096474713,
    lng: 17.034752369,
  };

  export default {
    name: 'Main',
    components: {
      LeafletMap,
      Scene,
      SunChart,
    },
    data() {
      return {
        position: defaultPosition,
      };
    },
    methods: {
      updatePosition(newPosition) {
        this.position = newPosition;
      },
    },
  };
</script>

<style scoped>
  .container {
    flex-grow: 1;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  header {
    height: 100px;
    background-color: #34495e;
    color: #ecf0f1;
  }

  footer {
    height: 55px;
  }

  .Body {
    display: flex;
    flex: 1;
  }

  .Content {
    flex: 1;
    align-items: stretch;
    display: flex;
  }

  .Nav {
    flex: 0 0 300px;
    order: -1;
    background-color: #ecf0f1;
    display: flex;
    flex-direction: column;
  }
</style>
