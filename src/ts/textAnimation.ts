// import { gsap } from "gsap";

// const frame = document.querySelector('#movingFrame');

// // Cursor position tracking
// const cursor = {
//   x: 0.5, // Start in the middle
//   y: 0.5  // Start in the middle
// };

// // Target position (where the frame should move to)
// const target = {
//   x: 0,
//   y: 0
// };

// // Create a single persistent tween that we'll update
// const frameTween = gsap.to(frame, {
//   x: 0,
//   y: 0,
//   duration: 0.8,
//   ease: "power2.out",
//   paused: true
// });

// // Use a throttled event for mouse movement
// let isThrottled = false;
// const throttleTime = 16; // ~60fps

// window.addEventListener('mousemove', (e) => {
//   if (!isThrottled) {
//     cursor.x = e.clientX / window.innerWidth;
//     cursor.y = e.clientY / window.innerHeight;
//     // 
//     isThrottled = true;
//     setTimeout(() => { isThrottled = false; }, throttleTime);
//   }
// });

// // Animation loop using requestAnimationFrame for optimal performance
// function updateFramePosition() {
//   // Calculate target position based on current cursor
//   target.x = (cursor.x - 0.5) * 5; // Centered movement, adjust multiplier as needed
//   target.y = (cursor.y - 0.5) * 5; // Centered movement, adjust multiplier as needed
  
//   // Update the tween with new target values
//   frameTween.vars.x = target.x;
//   frameTween.vars.y = target.y;
  
//   // Restart the tween with new values
//   frameTween.invalidate().restart();
  
//   // Continue the animation loop
//   requestAnimationFrame(updateFramePosition);
// }

// // Start the animation loop
// updateFramePosition();