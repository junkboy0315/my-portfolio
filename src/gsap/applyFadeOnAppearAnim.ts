import gsap from 'gsap';

export const applyFadeOnAppearAnim = (el: HTMLElement): void => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    })
    .fromTo(
      el,
      {
        y: 20,
      },
      {
        duration: 0.5,
        opacity: 1,
        y: 0,
      },
    );
};
