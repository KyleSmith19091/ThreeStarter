import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/NormalMap.png");

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(.5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x000000);
material.roughness = 0.2;
material.metalness = 0.7;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const redLight = new THREE.PointLight(0xff0000, 2);
redLight.position.x = -1.86;
redLight.position.y = 1;
redLight.position.z = -1.65;
redLight.intensity = 10;
scene.add(redLight)

// gui.add(redLight.position, 'x', -10, 6);
// gui.add(redLight.position, 'y', -10, 6);
// gui.add(redLight.position, 'z', -10, 6);

const blueLight = new THREE.PointLight(0x0000ff, 2);
blueLight.position.x = 2.1;
blueLight.position.y = -2.4;
blueLight.position.z = -2.1;
blueLight.intensity = 10;

scene.add(blueLight);

// gui.add(blueLight.position, 'x', -10, 6);
// gui.add(blueLight.position, 'y', -10, 6);
// gui.add(blueLight.position, 'z', -10, 6);

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

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
});

window.addEventListener("scroll", (e) => {
    sphere.rotation.y = window.scrollY * 0.01;
});


const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime;
    sphere.rotation.y += 0.5 * (targetY - sphere.rotation.y);
    sphere.rotation.x += 0.5 * (targetX - sphere.rotation.x);
    sphere.rotation.z += -0.05 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();

////////////

const topLink = document.querySelector("#top");

top.addEventListener("click", (e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});