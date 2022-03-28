import { useEffect, useState } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

type Option = {
  ignoreWidthChange?: boolean;
  ignoreHeightChange?: boolean;
};

export const useWindowSize = (option: Option = {}) => {
  const { ignoreWidthChange = false, ignoreHeightChange = false } = option;
  // Initialize state with undefined width/height
  // so both server and client renderings work fine
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const isWidthSame = window.innerWidth === windowSize.width;
      if (isWidthSame && ignoreHeightChange) {
        return;
      }

      const isHeightSame = window.innerHeight === windowSize.height;
      if (isHeightSame && ignoreWidthChange) {
        return;
      }

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [
    ignoreHeightChange,
    ignoreWidthChange,
    windowSize.height,
    windowSize.width,
  ]);

  return windowSize;
};
