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
const directionalLightSettings = {
  color: "#f0e6d0", // Store the original hex string
  intensity: 1.2,
  position: {
    x: 1.2,
    y: 0.5,
    z: 6,
  },
};

const directionnalLight = new THREE.DirectionalLight(
  directionalLightSettings.color,
  directionalLightSettings.intensity
);
directionnalLight.position.set(
  directionalLightSettings.position.x,
  directionalLightSettings.position.y,
  directionalLightSettings.position.z
);
scene.add(directionnalLight);

gui
  .add(directionalLightSettings, "intensity")
  .min(0)
  .max(10)
  .step(0.1)
  .name("Main intensity")
  .onChange((value: number) => {
    directionnalLight.intensity = value;
  });
gui
  .addColor(directionalLightSettings, "color")
  .name("Main color")
  .onChange((value: string) => {
    directionnalLight.color.set(value);
  });
gui
  .add(directionalLightSettings.position, "x")
  .min(-5)
  .max(10)
  .step(0.1)
  .name("Main X")
  .onChange((value: number) => {
    directionnalLight.position.x = value;
  });
gui
  .add(directionalLightSettings.position, "y")
  .min(-5)
  .max(10)
  .step(0.1)
  .name("Main X")
  .onChange((value: number) => {
    directionnalLight.position.y = value;
  });
gui
  .add(directionalLightSettings.position, "z")
  .min(-5)
  .max(10)
  .step(0.1)
  .name("Main X")
  .onChange((value: number) => {
    directionnalLight.position.z = value;
  });

// Ambient Light
const ambientLightSettings = {
  color: "#696969",
  intensity: 0.4,
};

const ambientLight = new THREE.AmbientLight(
  ambientLightSettings.color,
  ambientLightSettings.intensity
);
scene.add(ambientLight);

gui
  .add(ambientLightSettings, "intensity")
  .min(0)
  .max(10)
  .step(0.1)
  .name("Ambient intensity")
  .onChange((value: number) => {
    ambientLight.intensity = value;
  });

gui
  .addColor(ambientLightSettings, "color")
  .name("Ambient color")
  .onChange((value: string) => {
    ambientLight.color.set(value);
  });

// Cursor Light

const cursorLightSettings = {
  color: "#16a5fe",
  intensity: 2.2,
  position: {
    x: 0,
    y: 0,
    z: 0.15,
  },
};

const cursorLight = new THREE.DirectionalLight(
  cursorLightSettings.color,
  cursorLightSettings.intensity
);
cursorLight.position.set(
  cursorLightSettings.position.x,
  cursorLightSettings.position.y,
  cursorLightSettings.position.z
);
scene.add(cursorLight);

gui
  .add(cursorLightSettings, "intensity")
  .min(0)
  .max(10)
  .step(0.1)
  .name("Cursor intensity")
  .onChange((value: number) => {
    cursorLight.intensity = value;
  });
gui
  .addColor(cursorLightSettings, "color")
  .name("Cursor color")
  .onChange((value: string) => {
    cursorLight.color.set(value);
  });
gui
  .add(cursorLightSettings.position, "z")
  .min(0)
  .max(10)
  .step(0.1)
  .name("Cursor Z")
  .onChange((value: number) => {
    cursorLight.position.z = value;
  });

/* Models */

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let myFace: THREE.Object3D | null = null;

gltfLoader.load("/models/myFace.glb", (gltf) => {
  myFace = gltf.scene;
  myFace.scale.set(1.25, 1.25, 1.25);
  scene.add(myFace);
  playReveal()
  tick();
});

/* Sizes */

const updateCanvasSize = () => {
  const properties = container.getBoundingClientRect();
  sizes.width = properties.width;
  sizes.height = properties.height;
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

  targetRotation.y = (cursor.x * 2 - 1) / 12;
  targetRotation.x = (cursor.y * 2 - 1) / 12;

  cursorLightTarget.x = (cursor.x - 0.5) * 3;
  cursorLightTarget.y = -(cursor.y - 0.5) * 3;
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

const playReveal = () => {
  gsap.from(directionnalLight.position, {
    x: -3,
    y: 0.5,
    z: -2,
    duration : 2,
    ease: 'power3.inOut'
  })
  gsap.from(directionnalLight, {
    intensity : 0,
    duration : 2,
    ease: 'power3.inOut'
  })
  gsap.from(ambientLight, {
    intensity : 0,
    duration : 2,
    ease: 'power3.inOut'
  })
  gsap.from(cursorLight,{
    intensity : 0,
    delay : 1,
    duration: 1,
    ease : 'back.out'
  })
  
}

// const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime)

  //   Animate the face on cursor move
  if (myFace) {
    gsap.to(myFace.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      duration: 2,
      ease: "power2.out",
    });
  }

    // Animate the cursor light
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
