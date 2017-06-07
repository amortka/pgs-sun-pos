<template>
  <div class="Map" id="Map"></div>
</template>

<script>
  import L from 'leaflet';

  import icon from 'leaflet/dist/images/marker-icon.png';
  import iconShadow from 'leaflet/dist/images/marker-shadow.png';

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const config = {
    center: [51.096474713, 17.034752369],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    tileLayer: {
      uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      params: {
        attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy;
<a href="http://cartodb.com/attributions">CartoDB</a>`,
      },
    },
  };

  export default {
    name: 'LeafletMap',
    mounted() {
      this.map = L.map('Map', config);// .setView([], 2);

      L.tileLayer(config.tileLayer.uri, config.tileLayer.params)
        .addTo(this.map);

      this.marker = L.marker(
        L.latLng([51.096474713, 17.034752369]),
        {
          draggable: true,
        },
      );

      this.marker.on('drag', (e) => {
        this.$emit('updatePosition', e.target.getLatLng());
      });

      this.marker.on('click', L.DomEvent.stopPropagation);

      this.map.on('click', (e) => {
        this.marker.setLatLng(e.latlng);
        this.$emit('updatePosition', e.latlng);
      });

      this.marker.addTo(this.map);
    },
  };
</script>

<style scoped>
  @import '../../node_modules/leaflet/dist/leaflet.css';

  .Map {
    background: #95a5a6;
    flex-grow: 1;
  }
</style>
