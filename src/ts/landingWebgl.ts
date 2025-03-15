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
directionnalLight.position.set(1.2, 0.5, 6);
scene.add(directionnalLight);

const directionalLightSettings = {
  color: "#f0e6d0", // Store the original hex string
};

gui.add(directionnalLight, "intensity").min(1).max(10).step(0.1);
gui.add(directionnalLight.position, "x").min(-5).max(10).step(0.1);
gui.add(directionnalLight.position, "y").min(-5).max(10).step(0.1);
gui.add(directionnalLight.position, "z").min(-5).max(10).step(0.1);
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

// Cursor Light
const cursorLight = new THREE.DirectionalLight("#ed4a4a", 1.2);
cursorLight.position.set(0, 0, 1);
scene.add(cursorLight);

const cursorLightSettings = {
    color: "#ed4a4a",
  };

gui.add(cursorLight, 'intensity').min(0).max(10).step(0.1)
gui.addColor(cursorLightSettings, 'color').onChange((value: string) => {
    cursorLight.color.set(value)
})

/* Models */

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

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
  x: 0,
  y: 0,
};

let cursorLightTarget = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e: MouseEvent) => {
  // Get an normalize cursor position
  cursor.x = e.clientX / window.innerWidth;
  cursor.y = e.clientY / window.innerHeight;

  targetRotation.y = (cursor.x * 2 - 1) / 13;
  targetRotation.x = (cursor.y * 2 - 1) / 13;

  cursorLightTarget.x = (cursor.x - 0.5) * 3
  cursorLightTarget.y = -(cursor.y - 0.5) * 3
});

/* Camera */

// Orthographic camera

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
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* Animation */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime)

  //   Animate the face on cursor move
  if (myFace) {
    gsap.to(myFace.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      duration: 2,
      ease: "power2.out",
    });
  }

  //   Animate the cursor light
  if (cursorLight) {
    gsap.to(cursorLight.position, {
      x: cursorLightTarget.x,
      y: cursorLightTarget.y,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  // Render
  renderer.render(scene, camera);

  // Call tick on next frame
  window.requestAnimationFrame(tick);
};
