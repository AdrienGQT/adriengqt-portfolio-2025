import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";

/* Base */

// GUI
const gui = new GUI();

// Container
const container: HTMLElement = document.querySelector(
  ".content"
) as HTMLElement;

// Canvas
const canvas: HTMLElement = document.querySelector(
  "canvas.webgl"
) as HTMLElement;

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Lights

// Directionnal Light
const directionnalLight = new THREE.DirectionalLight("#f0e6d0", 3);
directionnalLight.position.set(1.2, 0.5, 3.4);
scene.add(directionnalLight);

const directionalLightSettings = {
  color: "#f0e6d0", // Store the original hex string
};

gui.add(directionnalLight, "intensity").min(1).max(10).step(0.1);
gui.add(directionnalLight.position, "x").min(-5).max(5).step(0.1);
gui.add(directionnalLight.position, "y").min(-5).max(5).step(0.1);
gui.add(directionnalLight.position, "z").min(-5).max(5).step(0.1);
gui.addColor(directionalLightSettings, "color").onChange((value: string) => {
  directionnalLight.color.set(value);
});

// Ambient Light
const ambientLight = new THREE.AmbientLight("#696969", 2);
scene.add(ambientLight);

const ambientLightSettings = {
  color: "#696969",
};

gui.add(ambientLight, "intensity").min(0).max(10).step(0.1);

gui.addColor(ambientLightSettings, "color").onChange((value: string) => {
  ambientLight.color.set(value);
});

/* Models */

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;

let myFace: THREE.Object3D | null = null;

gltfLoader.load("/models/myFace.glb", (gltf) => {
  // console.log(typeof(gltf.scene))
  myFace = gltf.scene;
  scene.add(myFace);

  tick();
});

/* Sizes */

const updateCanvasSize = () => {
  const properties = container.getBoundingClientRect();
  sizes.width = properties.width;
  sizes.height = properties.height;
  console.log(sizes.width, sizes.height);
};

let sizes = {
  width: 0,
  height: 0,
};

updateCanvasSize();

/* Handle window resize */

window.addEventListener("resize", () => {
  // Update sizes
  updateCanvasSize();

  // Update orthographic camera
  const aspect = sizes.width / sizes.height;
  camera.left = (frustumSize * aspect) / -2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = frustumSize / -2;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Cursor

let cursor = {
  x: 0,
  y: 0,
};

let targetRotation = {
    x : 0,
    y : 0
}

window.addEventListener("mousemove", (e: MouseEvent) => {
  // Get an normalize cursor position
  cursor.x = e.clientX / window.innerWidth;
  cursor.y = e.clientY / window.innerHeight;

  targetRotation.y = (cursor.x * 2 - 1) / 10
  targetRotation.x = (cursor.y * 2 - 1) / 10
});

/* Camera */
// Orthographic camera with proper scaling
const frustumSize = 5; // Adjust this value based on your model size
const aspect = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  0.1,
  1000
);
camera.position.set(0, 0, 10); // Move the camera back
scene.add(camera);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: false,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* Animation */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   Animate the face on cursor move
  if (myFace) {
    gsap.to(myFace.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      duration: 1,
      ease: "power2.out",
    });
  }

  // Render
  renderer.render(scene, camera);

  // Call tick on next frame
  window.requestAnimationFrame(tick);
};
