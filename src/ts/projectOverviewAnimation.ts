const projectOverviewHTML: HTMLElement = document.querySelector(
    "#projectOverview"
  ) as HTMLElement;
  
  const projectListHTML: HTMLElement = document.querySelector(
    "#projectListContent"
  ) as HTMLElement;
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  
  const cursor = {
    x: 0.5,
    y: 0.5,
  };
  
  const projectOverview = {
    targetX: 0,
    targetY: 0,
  };
  
  window.addEventListener("mousemove", (e: MouseEvent) => {
    (cursor.x = e.clientX / sizes.width), (cursor.y = e.clientY / sizes.height);
  
    // console.log(cursor.x)
  
    projectOverview.targetX = cursor.x * sizes.width - 400;
    projectOverview.targetY = cursor.y * sizes.height - 50;
  
    gsap.to(projectOverviewHTML, {
      x: projectOverview.targetX,
      y: projectOverview.targetY,
      duration: 0.7,
      delay: 0.1,
    });
  });
  
  projectListHTML.addEventListener('mouseenter', () => {
      gsap.to(projectOverviewHTML, {
          opacity : 1,
          duration : 0.3,
          ease : 'power2.inOut'
      })
  })
  
  projectListHTML.addEventListener('mouseleave', () => {
      gsap.to(projectOverviewHTML, {
          opacity : 0,
          duration : 0.3,
          ease : 'power2.inOut'
      })
  })