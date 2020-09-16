import gsap from 'gsap';

type Options = {
  delayMs?: number;
  durationMs?: number;
};

export const applyFadeAnim = (el: HTMLElement, options: Options = {}): void => {
  const { delayMs = 0, durationMs = 1000 } = options;

  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      delay: delayMs / 1000,
      duration: durationMs / 1000,
      opacity: 1,
    },
  );
};
