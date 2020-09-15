import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export type Props = {
  children: React.ReactElement;
  delayMs?: number;
  durationMs?: number;
};

const Fade: React.FC<Props> = ({
  children,
  delayMs = 0,
  durationMs = 1000,
}) => {
  const fadeTargetRef = useRef(null);

  useEffect(() => {
    gsap.from(fadeTargetRef.current, {
      delay: delayMs / 1000,
      duration: durationMs / 1000,
      opacity: 0,
    });
  }, []);

  return <div ref={fadeTargetRef}>{children}</div>;
};

export default Fade;
