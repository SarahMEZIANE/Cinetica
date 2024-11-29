import { useRef } from "react";

export function useCastSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (sliderRef.current) {
        const scrollAmount = 200;
        sliderRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      }
    };
    return {sliderRef, scroll};
}
export default useCastSlider;