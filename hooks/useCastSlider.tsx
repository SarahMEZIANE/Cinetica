import { useRef, useCallback } from "react";

export function useCastSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      
      container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  }, []);

  return { sliderRef, scroll };
}

export default useCastSlider;