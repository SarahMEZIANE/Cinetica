import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useSlider } from '../hooks/useSlider';
import React from 'react';

describe('useSlider', () => {
  it('should scroll to the left', () => {
    const TestComponent = () => {
      const slider = useSlider();
      return <div ref={slider.sliderRef} style={{ width: '1000px', overflow: 'auto' }} />;
    };

    const { container } = render(<TestComponent />);
    const div = container.firstChild as HTMLDivElement;
    div.scrollLeft = 500;
    Object.defineProperty(div, 'clientWidth', { value: 500 });

    act(() => {
      const event = new Event('scroll');
      div.dispatchEvent(event);
    });

    act(() => {
      const { result } = renderHook(() => useSlider());
      result.current.scroll('left');
    });

    expect(div.scrollLeft).toBe(100);
  });

  it('should scroll to the right', () => {
    const TestComponent = () => {
      const slider = useSlider();
      return <div ref={slider.sliderRef} style={{ width: '1000px', overflow: 'auto' }} />;
    };

    const { container } = render(<TestComponent />);
    const div = container.firstChild as HTMLDivElement;
    div.scrollLeft = 500;
    Object.defineProperty(div, 'clientWidth', { value: 500 });

    act(() => {
      const event = new Event('scroll');
      div.dispatchEvent(event);
    });

    act(() => {
      const { result } = renderHook(() => useSlider());
      result.current.scroll('right');
    });

    expect(div.scrollLeft).toBe(900);
  });
});