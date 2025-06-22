import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<HTMLElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<HTMLElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    gsap.fromTo(
      para,
      { autoAlpha: 0, y: 40, filter: "blur(8px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1.1,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  });
  titles.forEach((title) => {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 60, rotate: 8, filter: "blur(10px)" },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.2,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
