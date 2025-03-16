import gsap from "gsap";

const loadingScreen: HTMLElement = document.querySelector('.loading-screen') as HTMLElement

const onContentLoaded = () => {
    gsap.to(loadingScreen,{
        delay: 0.5,
        duration: 1,
        ease : 'power2.inOut',
        opacity: 0,
        onComplete: () => {
            loadingScreen.style.display = 'none'
        }
    })
}

window.addEventListener('DOMContentLoaded', onContentLoaded)