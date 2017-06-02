<template>
  <div class="Scene" ref="scene"></div>
</template>

<script>
  /* eslint-disable */
  import * as THREE from 'three';
  import TrackballControls from '../lib/TrackballControls';
  import ConvexGeometry from '../lib/ConvexGeometry';

  import coords from 'coordinate-systems';
  import moment from 'moment';
  import suncalc from 'suncalc';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(-8, 32, 36);
  camera.lookAt(scene.position);
  //camera.up = new THREE.Vector3( 0, 0, 1 );

  const controls = new TrackballControls(camera);
  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 3.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.2;

  /**
   * ---------------------------------
   * Geometry
   * ---------------------------------
   */

  const RADIUS = 35;
  const geometry = new THREE.BoxGeometry(15, 15, 5);
  const material = new THREE.MeshStandardMaterial({ color: 0xCC0000 });
  const box = new THREE.Mesh(geometry, material);
  box.position.y = 7.5;
  box.rotation.y = deg2rad(-103.09);
  box.castShadow = true;
  scene.add(box);

  // circle
  const circleGeometry = new THREE.CircleGeometry(RADIUS, 64);
  const circleMaterial = new THREE.MeshStandardMaterial({ color: 0x3498db, transparent: true, opacity: 1 });
  circleMaterial.side = THREE.DoubleSide;

  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.rotation.x = deg2rad(90);
  circle.receiveShadow = true;
  scene.add(circle);


  var light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(15, 25, 0); 			//default; light shining from top
  light.target.position.set(0, 0, 0);

  light.castShadow = true;            // default false

  var targetObject = new THREE.Object3D();
  scene.add(targetObject);
  light.target = targetObject;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  light.shadowCameraLeft = -50;
  light.shadowCameraBottom = -50;
  light.shadowCameraRight = 50;
  light.shadowCameraTop = 50;
  scene.add(light);

  //Set up shadow properties for the light
  //  light.shadow.mapSize.width = 1024;  // default
  //  light.shadow.mapSize.height = 1024; // default
  //  light.shadow.camera.far = 500;     // default

  const lightHelper = new THREE.DirectionalLightHelper(light, 5);
  //scene.add(lightHelper);

  var helper = new THREE.CameraHelper(light.shadow.camera);
  //scene.add(helper);

  // sphere
  /*const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
   const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xf1c40f, transparent: true, opacity: 0.2 });
   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
   scene.add(sphere);*/

  // line
  const LAT = 51.096474713;
  const LNG = 17.034752369;

  //  scene.add(getSunPath(new Date(), LAT, LNG, 0x00ff00));
  scene.add(getSunPath(new Date(2017, 5, 21), RADIUS, LAT, LNG, 0xf1c40f)); // summer solistice
  scene.add(getSunPath(new Date(2017, 5, 1), RADIUS, LAT, LNG, 0x00ff00));
  scene.add(getSunPath(new Date(2017, 11, 21), RADIUS, LAT, LNG, 0xf39c12)); // winter solistice

  const sunMeshVertices = [
    ...(getSunPath(new Date(2017, 5, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 6, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 7, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 8, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 9, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 10, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
    ...(getSunPath(new Date(2017, 11, 21), RADIUS, LAT, LNG, 0xf1c40f, true).vertices),
  ];

  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xf1c40f, transparent: true, opacity: 0.25 });
  sunMaterial.side = THREE.DoubleSide;

  const sunMinMax = {
    min: new Date(2017, 5, 21).valueOf(),
    max: new Date(2017, 11, 21).valueOf()
  };

  const sunGeo = new THREE.ParametricGeometry((u, v) => {
    const d = sunMinMax.min + u * (sunMinMax.max - sunMinMax.min);
    const times = suncalc.getTimes(d, LAT, LNG);
    const t = times.sunrise.valueOf() + v * (times.sunset.valueOf() - times.sunrise.valueOf());

    const pos = suncalc.getPosition(t, LAT, LNG);
    return getXYZbyRotation(RADIUS, pos.azimuth + Math.PI, pos.altitude);
  }, 25, 25);
  const sunMesh = new THREE.Mesh(sunGeo, sunMaterial);


  const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);


  scene.add(sphere);
  scene.add(sunMesh);

  let time = Date.now();
  const currentSunPosition = suncalc.getPosition(new Date(time), LAT, LNG);
  const currentSunPositionXYZ = getXYZbyRotation(RADIUS, currentSunPosition.azimuth + Math.PI, currentSunPosition.altitude);

  sphere.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
  //  light.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
  //  light.target.position.set(0, 0, 0);

  /**
   * ---------------------------------
   * EoF Geometry
   * ---------------------------------
   */

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.soft = true;
  //  renderer.shadowMap.needsUpdate = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);

  /**
   * ---------------------------------
   * Helpers
   * ---------------------------------
   */
  const axisHelper = new THREE.AxisHelper(10);
  scene.add(axisHelper);

  const gridHelper = new THREE.GridHelper(100, 100);
  //  scene.add(gridHelper);

  const loader = new THREE.FontLoader();

  // labels XYZ + NSEW
  loader.load('/static/fonts/helvetiker_regular.typeface.json', function(font) {
    const offsetXYZ = RADIUS * 0.75;
    const offsetNSEW = RADIUS + 5;
    addText('X', [offsetXYZ, 0, 0], [0, 0, 0], font, 0xe74c3c);
    addText('Y', [0, offsetXYZ, 0], [0, 0, 0], font, 0x2ecc71);
    addText('Z', [0, 0, offsetXYZ], [0, 0, 0], font, 0x3498db);

    addText('N', [offsetNSEW, 0, 0], [-Math.PI / 2, 0, 0], font, 0xf1c40f);
    addText('S', [-offsetNSEW, 0, 0], [-Math.PI / 2, 0, 0], font, 0xf1c40f);
    addText('E', [0, 0, offsetNSEW], [-Math.PI / 2, 0, 0], font, 0xf1c40f);
    addText('W', [0, 0, -offsetNSEW], [-Math.PI / 2, 0, 0], font, 0xf1c40f);
    render();
  });

  /**
   * ---------------------------------
   * Render loop
   * ---------------------------------
   */
  controls.addEventListener('change', render);

  function animate() {
    requestAnimationFrame(animate);

   time += 5 * 60 * 1000;
    const currentSunPosition = suncalc.getPosition(new Date(time), LAT, LNG);
    const currentSunPositionXYZ = getXYZbyRotation(RADIUS, currentSunPosition.azimuth + Math.PI, currentSunPosition.altitude);

    sphere.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
    light.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
    lightHelper.update();


    controls.update();
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
  /**
   * =================================
   * EoF Render loop
   * =================================
   */


  function addText(text, xyz, rotation, font, color = 0xffffff) {
    const textGeo = new THREE.TextGeometry(text, {
      size: 2,
      height: 0.2,
      curveSegments: 6,
      font,
      style: 'normal'
    });

    const colorThree = new THREE.Color(color);
    const textMaterial = new THREE.MeshBasicMaterial({ color: colorThree });
    const textMesh = new THREE.Mesh(textGeo, textMaterial);

    textMesh.position.x = xyz[0];
    textMesh.position.y = xyz[1];
    textMesh.position.z = xyz[2];
    textMesh.rotation.x = rotation[0];
    textMesh.rotation.y = rotation[1];
    textMesh.rotation.z = rotation[2];
    scene.add(textMesh);
  }

  function getXYZbyRotation(radius = 0, theta = 0, phi = 0) {
    phi = Math.PI / 2 - phi;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  function getSunPath(date, RADIUS, LAT, LNG, color = 0xff00ff, geometry = false) {
    const sunTimes = suncalc.getTimes(date, LAT, LNG);
//    console.group(moment(date).format());
//    console.groupEnd(moment(date).format());

    const sunrise = moment(sunTimes.sunrise).valueOf();
    const sunset = moment(sunTimes.sunset).valueOf();
    const step = 30 * 60 * 1000;

    const lineMaterial = new THREE.LineBasicMaterial({
      color
    });

    const lineGeometry = new THREE.Geometry();

    for (let n = sunrise; n <= sunset; n += step) {
      const sunPos = suncalc.getPosition(new Date(n), LAT, LNG);
      const xyz = getXYZbyRotation(RADIUS, sunPos.azimuth + Math.PI, sunPos.altitude);
      lineGeometry.vertices.push(xyz);
    }

    return geometry ? lineGeometry : new THREE.Line(lineGeometry, lineMaterial);
  }

  function rad2deg(rad) {
    return rad * (180 / Math.PI);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  export default {
    name: 'scene',
    data() {
      return {};
    },
    mounted() {
      if (this.$refs.scene.querySelector('canvas') === null) {
        this.$refs.scene.appendChild(renderer.domElement);
        render();
        animate();
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
