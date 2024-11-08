import { useState, useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const description =
  "Custom hook that tracks and returns the current window size.";

/**
 * Custom hook that tracks and returns the current window size.
 * @returns {WindowSize} An object containing the current width and height of the window.
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
