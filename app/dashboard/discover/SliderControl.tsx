import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
  onScrollLeft,
  onScrollRight,
}) => {
  const buttonClasses = "absolute top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10";

  return (
    <>
      <button
        onClick={onScrollLeft}
        className={`${buttonClasses} left-2`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onScrollRight}
        className={`${buttonClasses} right-2`}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
};