import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  children: React.ReactElement;
  delayMs?: number;
  durationMs?: number;
  offset?: number;
};

const FadeOnAppear: React.FC<Props> = ({
  children,
  delayMs = 0,
  durationMs = 500,
  offset = 100,
}) => {
  const fadeTargetRef = useRef<HTMLDivElement>(null);
  const anim = useRef<gsap.core.Tween>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = fadeTargetRef.current;
    if (!element) return;

    anim.current = gsap
      .fromTo(
        fadeTargetRef.current,
        {
          y: 20,
        },
        {
          delay: delayMs / 1000,
          duration: durationMs / 1000,
          opacity: 1,
          y: 0,
        },
      )
      .pause();

    const options = {
      root: null,
      rootMargin: `0px 0px -${offset}px 0px`,
      threshold: 0,
    };
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      setIsIntersecting(isIntersecting);
      if (isIntersecting) {
        observer.unobserve(element);
      }
    }, options);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delayMs, durationMs, offset]);

  useEffect(() => {
    if (isIntersecting) {
      anim.current?.restart();
    }
  }, [isIntersecting]);

  return (
    <div css={{ opacity: 0 }} ref={fadeTargetRef}>
      {children}
    </div>
  );
};

export default FadeOnAppear;
