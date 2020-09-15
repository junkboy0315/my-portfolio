import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export type Props = {
  className: any;
  children: React.ReactElement;
  delayMs?: number;
  durationMs?: number;
};

const Fade: React.FC<Props> = ({
  className,
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

  return (
    <div className={className} ref={fadeTargetRef}>
      {children}
    </div>
  );
};

export default Fade;
