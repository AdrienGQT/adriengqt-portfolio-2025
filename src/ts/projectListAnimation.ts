import gsap from "gsap";

// Text animation

const animationDuration = 0.15;
const projectListItemName = document.querySelectorAll(".projectListItemName");
const initialFontColor = getComputedStyle(projectListItemName[0]).color;

projectListItemName.forEach((element) => {
  // Use a single event listener for each element
  element.addEventListener("mouseenter", () => {
    // Cancel any active animations
    gsap.killTweensOf(projectListItemName);

    // Set all items to gray except the hovered one
    projectListItemName.forEach((item) => {
      gsap.to(item, {
        color: item === element ? initialFontColor : "gray",
        x: item === element ? -5 : 0,
        duration: animationDuration,
        ease: "power2.inOut",
      });
    });
  });

  element.addEventListener("mouseleave", () => {
    // Cancel any active animations
    gsap.killTweensOf(projectListItemName);

    // Reset all items to white
    projectListItemName.forEach((item) => {
      gsap.to(item, {
        color: initialFontColor,
        x: 0,
        duration: animationDuration,
        ease: "power2.inOut",
      });
    });
  });
});
