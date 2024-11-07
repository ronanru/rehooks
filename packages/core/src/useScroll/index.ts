import { useState, useLayoutEffect } from "react";

const descripion =
  "Custom hook that tracks and returns the current scroll position, and provides a method to scroll to specific coordinates.";

/**
 * Represents the scroll position in the x and y directions.
 */
type ScrollPosition = {
  x: number;
  y: number;
};

/**
 * Custom hook that tracks and returns the current scroll position,
 * and provides a method to scroll to specific coordinates.
 *
 * @returns {{ position: ScrollPosition; scrollTo: (options: ScrollToOptions) => void }}
 */
export function useScroll(): {
  position: ScrollPosition;
  scrollTo: (options: ScrollToOptions) => void;
} {
  const [position, setPosition] = useState<ScrollPosition>({
    x: window.scrollX,
    y: window.scrollY,
  });

  const handleScroll = () => {
    setPosition({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    position,
    scrollTo: window.scrollTo.bind(window),
  };
}
