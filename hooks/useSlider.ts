import { useRef } from 'react';

export function useSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    const scrollPosition = direction === 'left' 
      ? sliderRef.current.scrollLeft - scrollAmount
      : sliderRef.current.scrollLeft + scrollAmount;

    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  return { sliderRef, scroll };
}