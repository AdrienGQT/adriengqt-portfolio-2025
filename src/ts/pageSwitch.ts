import gsap from "gsap";

console.log("Loading pageswitch");

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const links: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll(".pageSwitch");
    console.log(links);
    const loadingScreen: HTMLElement = document.querySelector(
      ".loading-screen"
    ) as HTMLElement;

    const redirect = (href :string) => {
      window.location.href = href;
      setTimeout(() => {
        reset()
      }, 1000);
    }
    const reset = () => {
      gsap.to(loadingScreen, {
        opacity : 0,
        display : 'none'
      })
    }

    const pageEaseIn = () => {
      gsap.to(loadingScreen, {
        duration: 1,
        ease: "power2.inOut",
        opacity: 0,
        onComplete: () => {
          loadingScreen.style.display = "none";
        },
      });
    };

    const pageEaseOut = (href: string) => {
      loadingScreen.style.display = "block";
      gsap.to(loadingScreen, {
        duration: 1,
        ease: "power2.inOut",
        opacity: 1,
        onComplete: () => {
          redirect(href)
        },
      });
    };

    pageEaseIn();

    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener(
        "click",
        function (event: MouseEvent): void {
          event.preventDefault();

          const href: string | null = this.getAttribute("href");

          if (!href) {
            console.log("No href attribute");
            return;
          }

          pageEaseOut(href);
        }
      );
    });
  },
);
