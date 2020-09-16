import React from 'react';
import { applyFadeAnim } from '../../gsap/applyFadeAnim';
import { applyFadeOnAppearAnim } from '../../gsap/applyFadeOnAppearAnim';

export type Props = {
  className: any;
  children: React.ReactElement;
  delayMs?: number;
  durationMs?: number;
  lazy: boolean;
};

const Fade: React.FC<Props> = ({
  className,
  children,
  delayMs = 0,
  durationMs = 1000,
  lazy = false,
}) => {
  const applyAnim = (el: HTMLDivElement) => {
    if (!el) return;
    if (lazy) {
      applyFadeOnAppearAnim(el);
    } else {
      applyFadeAnim(el, { delayMs, durationMs });
    }
  };

  return (
    <div className={className} css={{ opacity: 0 }} ref={applyAnim}>
      {children}
    </div>
  );
};

export default Fade;
