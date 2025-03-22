import gsap from "gsap";

// Text animation

const animationDuration = 0.15;

const createAnimation = (elementsToAnimate: NodeListOf<Element>, offset : boolean) => {

  if(!elementsToAnimate.length){
    console.log('No button in this page')
    return
  }

  const initialFontColor = getComputedStyle(elementsToAnimate[0]).color;

  elementsToAnimate.forEach((element) => {
    // Use a single event listener for each element
    element.addEventListener("mouseenter", () => {
      // Cancel any active animations
      gsap.killTweensOf(elementsToAnimate);

      // Set all items to gray except the hovered one
      elementsToAnimate.forEach((item) => {
        gsap.to(item, {
          color: item === element ? initialFontColor : "gray",
          x: item === element && offset ? -5 : 0,
          duration: animationDuration,
          ease: "power2.inOut",
        });
      });
    });

    element.addEventListener("mouseleave", () => {
      // Cancel any active animations
      gsap.killTweensOf(elementsToAnimate);

      // Reset all items to white
      elementsToAnimate.forEach((item) => {
        gsap.to(item, {
          color: initialFontColor,
          x: 0,
          duration: animationDuration,
          ease: "power2.inOut",
        });
      });
    });
  });
};

const projectListItemName = document.querySelectorAll(".projectListItemName");
const headerButtons = document.querySelectorAll(".headerButton");
createAnimation(projectListItemName, true);
createAnimation(headerButtons, false);
