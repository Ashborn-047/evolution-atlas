/* ==========================================================================
   THREE-SCENE.JS
   Three.js 3D Typography (VERTEX experiment)
   ========================================================================== */

import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Get container element
const container = document.getElementById('canvas-mini');

if (container) {
    /* ---------- Scene Setup ---------- */
    const scene = new THREE.Scene();

    /* ---------- Camera ---------- */
    const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 60;

    /* ---------- Renderer ---------- */
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /* ---------- Text Group ---------- */
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    /* ---------- Load Font & Create Text ---------- */
    const loader = new FontLoader();
    loader.load(
        'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        function (font) {
            // Create 3D text geometry
            const geometry = new TextGeometry('VERTEX', {
                font: font,
                size: 12,
                height: 4,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.5,
                bevelSegments: 3
            });
            geometry.center();

            // Materials
            const matWire = new THREE.MeshBasicMaterial({
                color: 0x00e5ff,
                wireframe: true,
                transparent: true,
                opacity: 0.5
            });

            const matSolid = new THREE.MeshPhongMaterial({
                color: 0x111111,
                specular: 0xff0055,
                shininess: 100
            });

            // Create meshes
            const textMesh = new THREE.Mesh(geometry, matSolid);
            const wireMesh = new THREE.Mesh(geometry, matWire);
            wireMesh.scale.set(1.02, 1.02, 1.02);

            textGroup.add(textMesh);
            textGroup.add(wireMesh);
        }
    );

    /* ---------- Lighting ---------- */
    const light1 = new THREE.PointLight(0x00e5ff, 2, 50);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff0055, 2, 50);
    light2.position.set(-20, -20, 20);
    scene.add(light2);

    /* ---------- Animation Loop ---------- */
    function animate() {
        requestAnimationFrame(animate);

        // Rotate text
        textGroup.rotation.x += 0.01;
        textGroup.rotation.y += 0.015;

        renderer.render(scene, camera);
    }
    animate();

    /* ---------- Handle Window Resize ---------- */
    window.addEventListener('resize', () => {
        if (container) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}
