<template>
    <div class="Scene" ref="scene">
        <img src="../assets/round-compass.png" class="compass" ref="compass"/>
    </div>
</template>

<script>
    /* eslint-disable */
    import * as THREE from 'three';
    import moment from 'moment';
    import suncalc from 'suncalc';

    import TrackballControls from '../lib/TrackballControls';
    import OrbitControls from '../lib/OrbitControls';
    import ColladaLoader from '../lib/ColladaLoader2';
    //  import ConvexGeometry from '../lib/ConvexGeometry';

    const RADIUS = 35;
    let LAT;// = 51.096474713;
    let LNG;// = 17.034752369;

    let scene;
    let camera;
    let controls;
    let renderer;
    let time;
    let CONTAINER;
    let COMPASS;
    let WIDTH;
    let HEIGHT;

    let sphere;
    let sunMesh;
    let sunPathSummer;
    let sunPathWinter;
    let sunPathCurrent;

    let light;
    let lightHelper;


    function initRenderer() {
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.shadowMap.soft = true;
        //  renderer.shadowMap.needsUpdate = true;

        renderer.shadowMap.enabled = true;
//        renderer.shadowMap.type = THREE.PCFBasicShadowMap;
        renderer.setSize(WIDTH, HEIGHT);

        CONTAINER.appendChild(renderer.domElement);
    }

    function addCamera() {
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
        camera.position.set(-8, 32, 36);
        camera.lookAt(scene.position);

        /*controls = new TrackballControls(camera, CONTAINER);
         controls.rotateSpeed = 5.0;
         controls.zoomSpeed = 3.2;
         controls.panSpeed = 0.8;
         controls.noZoom = false;
         controls.noPan = false;
         controls.staticMoving = false;
         controls.dynamicDampingFactor = 0.2;*/

        controls = new OrbitControls(camera, CONTAINER);
        controls.noPan = true;
        controls.minZoom = 10;
        controls.maxPolarAngle = deg2rad(80);
        controls.enableKeys = false;
        controls.minDistance = 40;
        controls.maxDistance = 80;
        controls.zoomSpeed = 2;
    }

    function loadModel() {
        const loader = new ColladaLoader();
        const scale = 3;

        const darkMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        const wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, wireframe: true, transparent: true});
        const multiMaterial = [darkMaterial, wireframeMaterial];

        loader.load(
                // resource URL
                '/static/models/sf_house.dae',
                function(collada) {

                    let toRemove = [];
                    let edges = [];
                    const lineMaterial = new THREE.LineBasicMaterial({color: 0x7f8c8d, linewidth: 2});

                    collada.scene.traverse((object) => {

                        object.castShadow = true;
                        object.receiveShadow = true;
                        if (object instanceof THREE.Mesh) {
                            object.material.side = THREE.DoubleSide;

                            const edgeGeometry = new THREE.EdgesGeometry(object.geometry);
                            edges.push(new THREE.LineSegments(edgeGeometry, lineMaterial));
                        }

                        if (object.type === 'PointLight') {
                            toRemove.push(object);
                        }
                    });

                    toRemove.forEach(object => {
                        collada.scene.remove(object);
                    });

                    edges.forEach(object => {
                        collada.scene.add(object);
                    });

                    collada.scene.scale.set(scale, scale, scale);
                    scene.add(collada.scene);
                },
                // Function called when download progresses
                function(xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                }
        );
    }

    function addGeometry() {

        const darkMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        const wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, wireframe: true, transparent: true});
        const multiMaterial = [darkMaterial, wireframeMaterial];

        const geometry = new THREE.BoxGeometry(15, 15, 5);
//    const material = new THREE.MeshStandardMaterial({ color: 0xCC0000 });
//    const box = new THREE.Mesh(geometry, multiMaterial);
        const box = THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
        box.position.y = 7.5;
        box.rotation.y = deg2rad(-103.09);
        box.castShadow = true;
        //scene.add(box);

        // circle
        const circleGeometry = new THREE.CircleGeometry(RADIUS, 64);
        const circleMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, transparent: false});
//    const circleMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        circleMaterial.side = THREE.DoubleSide;

        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.rotation.x = deg2rad(90);
        circle.receiveShadow = true;
        scene.add(circle);
    }

    function addSunPathGeometry() {
        const sunGeo = getSunGeometries();

        sunPathSummer = sunGeo.pathSummer; // getSunPath(new Date(2017, 5, 21), RADIUS, LAT, LNG, 0xf1c40f);
        sunPathCurrent = sunGeo.pathCurrent; // getSunPath(new Date(2017, 5, 1), RADIUS, LAT, LNG, 0x00ff00);
        sunPathWinter = sunGeo.pathWinter; //getSunPath(new Date(2017, 11, 21), RADIUS, LAT, LNG, 0xf39c12);
        sunMesh = sunGeo.area;
        sphere = sunGeo.point;

        scene.add(sunPathSummer); // summer solistice
        scene.add(sunPathCurrent);
        scene.add(sunPathWinter); // winter solistice
        scene.add(sphere);
        scene.add(sunMesh);
    }

    function addSunPathLabels(font) {
        const ticks = getSunTicks(new Date(), RADIUS + 2, 2, LAT, LNG, 0x7f8c8d);
        const labels = getSunLabels(new Date(), font, RADIUS + 5, LAT, LNG, 0x7f8c8d);

        ticks.forEach(tick => scene.add(tick));
        labels.forEach(label => scene.add(label));
    }

    function addLight() {
        light = new THREE.DirectionalLight(0xffffff, 1, 100);
        light.position.set(15, 25, 0);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;

        const targetObject = new THREE.Object3D();
        scene.add(targetObject);
        light.target = targetObject;
        light.shadowMapWidth = 2048;
        light.shadowMapHeight = 2048;
        light.shadowCameraLeft = -50;
        light.shadowCameraBottom = -50;
        light.shadowCameraRight = 50;
        light.shadowCameraTop = 50;
        scene.add(light);

//    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        const ambientLight = new THREE.AmbientLight(0xFFFFFF); // soft white light
        scene.add(ambientLight);

        lightHelper = new THREE.DirectionalLightHelper(light, 5);
//    scene.add(lightHelper);

        const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
//    scene.add(cameraHelper);
    }

    function addSceneHelpers() {
        const axisHelper = new THREE.AxisHelper(10);
        scene.add(axisHelper);

        const gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);
    }

    function addAxisLabels(font) {
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
    }

    function onWindowResize() {
        renderer.setSize(0, 0);

        WIDTH = CONTAINER.offsetWidth;
        HEIGHT = CONTAINER.offsetHeight;

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);

        console.log('WIDTH', WIDTH);
        console.log('HEIGHT', HEIGHT);
        render();
    }

    function animate() {
        requestAnimationFrame(animate);

        time += 3 * 60 * 1000;
        const currentSunPosition = suncalc.getPosition(new Date(time), LAT, LNG);
        const currentSunPositionXYZ = getXYZbyRotation(RADIUS,
                currentSunPosition.azimuth + Math.PI,
                currentSunPosition.altitude);

        light.intensity = currentSunPosition.altitude > 0 ? 1 : 0;

        sphere.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
        light.position.set(currentSunPositionXYZ.x, currentSunPositionXYZ.y, currentSunPositionXYZ.z);
        lightHelper.update();

        if (camera.position.y < 0) {
//      camera.position.y = 0;
        }
        controls.update();

        // update compass rotation
        COMPASS.style.transform = `rotate(${rad2deg(controls.getAzimuthalAngle() + Math.PI/2)}deg`;

        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    function initEvents() {
        controls.addEventListener('change', render);
        window.addEventListener('resize', onWindowResize, false);
    }

    function init() {
        scene = new THREE.Scene();
        time = Date.now();

        loadModel();

        addCamera();
        addGeometry();
        addSunPathGeometry();
        addLight();

        const fontLoader = new THREE.FontLoader();
        fontLoader.load('/static/fonts/helvetiker_regular.typeface.json', (font) => {
            addSunPathLabels(font);
            addAxisLabels(font);
        });

        initRenderer();
        initEvents();

        render();
        animate();

//    addSceneHelpers();
    }

    function addText(text, xyz, rotation, font, color = 0xffffff, addToScene = true) {
        const textGeo = new THREE.TextGeometry(text, {
            size: 2,
            height: 0.2,
            curveSegments: 6,
            font,
            style: 'normal',
        });

        const colorThree = new THREE.Color(color);
        const textMaterial = new THREE.MeshBasicMaterial({color: colorThree});
        const textMesh = new THREE.Mesh(textGeo, textMaterial);

        textMesh.position.x = xyz[0];
        textMesh.position.y = xyz[1];
        textMesh.position.z = xyz[2];
        textMesh.rotation.x = rotation[0];
        textMesh.rotation.y = rotation[1];
        textMesh.rotation.z = rotation[2];

        if (addToScene) {
            scene.add(textMesh);
        } else {
            return textMesh;
        }
    }

    function getXYZbyRotation(radius = 0, azimuth = 0, altitude = 0) {
        const phi = (Math.PI / 2) - altitude;
        const x = radius * Math.sin(phi) * Math.cos(azimuth);
        const z = radius * Math.sin(phi) * Math.sin(azimuth);
        const y = radius * Math.cos(phi);

        return new THREE.Vector3(x, y, z);
    }

    function getSunPath(date, r, lat, lng, color = 0xff00ff, geometry = false) {
        const sunTimes = suncalc.getTimes(date, lat, lng);
        const sunrise = moment(sunTimes.sunrise).valueOf();
        const sunset = moment(sunTimes.sunset).valueOf();
        const step = 30 * 60 * 1000;

        const lineMaterial = new THREE.LineBasicMaterial({
            color,
        });

        const lineGeometry = new THREE.Geometry();

        for (let n = sunrise; n <= sunset; n += step) {
            const sunPos = suncalc.getPosition(new Date(n), LAT, LNG);
            const xyz = getXYZbyRotation(r, sunPos.azimuth + Math.PI, sunPos.altitude);
            lineGeometry.vertices.push(xyz);
        }

        return geometry ? lineGeometry : new THREE.Line(lineGeometry, lineMaterial);
    }

    function getSunTicks(date, r, length, lat, lng, color = 0xff00ff) {
        const sunTimes = suncalc.getTimes(date, lat, lng);
        const sunrise = moment(sunTimes.sunrise).valueOf();
        const sunset = moment(sunTimes.sunset).valueOf();

        const step = 60 * 60 * 1000;

        const lineMaterial = new THREE.LineBasicMaterial({
            color,
        });

        const ticks = [];

        for (let n = sunrise; n <= sunset; n += step) {
            const lineGeometry = new THREE.Geometry();
            const sunPos = suncalc.getPosition(new Date(n), LAT, LNG);

            const xyzStart = getXYZbyRotation(r, sunPos.azimuth + Math.PI, sunPos.altitude);
            const xyzEnd = getXYZbyRotation(r + length, sunPos.azimuth + Math.PI, sunPos.altitude);
            lineGeometry.vertices.push(xyzStart);
            lineGeometry.vertices.push(xyzEnd);
            ticks.push(new THREE.Line(lineGeometry, lineMaterial))
        }

        return ticks;
    }

    function getSunLabels(date, font, r, lat, lng, color = 0xff00ff) {
        const labels = [];

        const sunTimes = suncalc.getTimes(date, lat, lng);
        const sunrise = moment(sunTimes.sunrise).valueOf();
        const sunset = moment(sunTimes.sunset).valueOf();
        const step = 60 * 60 * 1000;

        const pos = suncalc.getPosition(Date.now(), LAT, LNG);
        const xyzCenter = getXYZbyRotation(1, pos.azimuth + Math.PI, pos.altitude);

        for (let n = sunrise; n <= sunset; n += step) {

            const sunPos = suncalc.getPosition(new Date(n), LAT, LNG);
            const xyz = getXYZbyRotation(r, sunPos.azimuth + Math.PI, sunPos.altitude);

            const textMesh = addText(moment(n).format('HH:mm'), [xyz.x, xyz.y, xyz.z], [-Math.PI / 2, sunPos.altitude, Math.PI - sunPos.azimuth], font, color, false);
//            textMesh.lookAt( xyzCenter );
            labels.push(textMesh);
        }

        return labels;
    }

    function getSunGeometries() {
        const pathSummer = getSunPath(new Date(2017, 5, 21), RADIUS, LAT, LNG, 0xf1c40f);
        const pathCurrent = getSunPath(new Date(), RADIUS, LAT, LNG, 0xf1c40f);
        const pathWinter = getSunPath(new Date(2017, 11, 21), RADIUS, LAT, LNG, 0xf1c40f);

        const sunMaterial = new THREE.MeshBasicMaterial({color: 0xf1c40f, transparent: true, opacity: 0.1});
        sunMaterial.side = THREE.DoubleSide;

        const sunMinMax = {
            min: new Date(2017, 5, 21).valueOf(),
            max: new Date(2017, 11, 21).valueOf(),
        };

        const sunGeo = new THREE.ParametricGeometry((u, v) => {
            const d = sunMinMax.min + (u * (sunMinMax.max - sunMinMax.min));
            const times = suncalc.getTimes(d, LAT, LNG);
            const t = times.sunrise.valueOf() + (v * (times.sunset.valueOf() - times.sunrise.valueOf()));

            const pos = suncalc.getPosition(t, LAT, LNG);
            return getXYZbyRotation(RADIUS, pos.azimuth + Math.PI, pos.altitude);
        }, 50, 50);
        const area = new THREE.Mesh(sunGeo, sunMaterial);

        const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xf39c12, transparent: true, opacity: 1});
        const point = new THREE.Mesh(sphereGeometry, sphereMaterial);

        return {
            pathSummer, // getSunPath(new Date(2017, 5, 21), RADIUS, LAT, LNG, 0xf1c40f);
            pathCurrent, // getSunPath(new Date(2017, 5, 1), RADIUS, LAT, LNG, 0x00ff00);
            pathWinter, //getSunPath(new Date(2017, 11, 21), RADIUS, LAT, LNG, 0xf39c12);
            area,
            point,
        }
    }
    function updateSunGeometry() {
        const sunGeo = getSunGeometries();

        sunMesh.geometry = sunGeo.area.geometry;
        sunMesh.geometry.verticesNeedUpdate = true;

        sphere.geometry = sunGeo.point.geometry;
        sphere.geometry.verticesNeedUpdate = true;

        sunPathSummer.geometry = sunGeo.pathSummer.geometry;
        sunPathSummer.geometry.verticesNeedUpdate = true;
        sunPathCurrent.geometry = sunGeo.pathCurrent.geometry;
        sunPathCurrent.geometry.verticesNeedUpdate = true;
        sunPathWinter.geometry = sunGeo.pathWinter.geometry;
        sunPathWinter.geometry.verticesNeedUpdate = true;
    }

    function rad2deg(rad) {
        return rad * (180 / Math.PI);
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    export default {
        name: 'scene',
        props: ['position'],
        data() {
            return {};
        },
        mounted() {
            if (this.$refs.scene.querySelector('canvas') === null) {
                CONTAINER = this.$refs.scene;
                COMPASS = this.$refs.compass;
                WIDTH = CONTAINER.offsetWidth;
                HEIGHT = CONTAINER.offsetHeight;

                LAT = this.position.lat;
                LNG = this.position.lng;
                init();
            }
        },
        watch: {
            position: function(updatedPosition) {
                LAT = updatedPosition.lat;
                LNG = updatedPosition.lng;

                updateSunGeometry();
            }
        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Scene {
        flex-grow: 1;
        position: relative;
    }

    .compass {
        position: absolute;
        z-index: 1024;
        width: 32px;
        height: 32px;
        right: 10px;
        top: 10px;
    }
</style>
