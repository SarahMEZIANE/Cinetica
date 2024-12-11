import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderNavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const SliderNavButton: React.FC<SliderNavButtonProps> = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10
        bg-black/50 hover:bg-black/70 text-white p-2 rounded-full 
        opacity-0 group-hover:opacity-100 transition-opacity`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default SliderNavButton;