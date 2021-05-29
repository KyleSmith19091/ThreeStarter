import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/NormalMap.png");

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(.5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x292929);
material.roughness = 0.2;
material.metalness = 0.7;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const redLight = new THREE.PointLight(0xff0000, 1);
redLight.position.x = -1.86;
redLight.position.y = 1;
redLight.position.z = -1.65;
redLight.intensity = 10;
scene.add(redLight)

const pointLightHelper = new THREE.PointLightHelper(redLight);
scene.add(pointLightHelper);

gui.add(redLight.position, 'x', -10, 6);
gui.add(redLight.position, 'y', -10, 6);
gui.add(redLight.position, 'z', -10, 6);

const blueLight = new THREE.PointLight(0x00ff00, 2);
blueLight.position.x = -1.86;
blueLight.position.y = 1;
blueLight.position.z = -1.65;
blueLight.intensity = 1;
scene.add(blueLight);

gui.add(blueLight.position, 'x', -10, 6);
gui.add(blueLight.position, 'y', -10, 6);
gui.add(blueLight.position, 'z', -10, 6);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime;

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()