import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollTracking } from '../useScrollTracking';

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();

describe('useScrollTracking', () => {
  beforeEach(() => {
    // Mock DOM elements
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
    });

    Element.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with activeSection 0', () => {
    const { result } = renderHook(() => useScrollTracking());
    
    expect(result.current.activeSection).toBe(0);
    expect(result.current.sectionsRef.current).toEqual([]);
  });

  it('should update activeSection based on scroll position', () => {
    const { result } = renderHook(() => useScrollTracking());
    
    // Mock section elements
    const mockSection1 = {
      offsetTop: 0,
      offsetHeight: 1000,
    } as HTMLElement;
    
    const mockSection2 = {
      offsetTop: 1000,
      offsetHeight: 1000,
    } as HTMLElement;

    act(() => {
      result.current.sectionsRef.current = [mockSection1, mockSection2];
    });

    // Simulate scroll to second section
    act(() => {
      window.scrollY = 1200; // 1200 + 500 (innerHeight/2) = 1700, which is in section 2
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.activeSection).toBe(1);
  });

  it('should scroll to section when scrollToSection is called', () => {
    const { result } = renderHook(() => useScrollTracking());
    
    const mockSection = document.createElement('div');
    mockSection.scrollIntoView = mockScrollIntoView;
    
    act(() => {
      result.current.sectionsRef.current = [mockSection];
    });

    act(() => {
      result.current.scrollToSection(0);
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should handle scrollToSection with invalid index gracefully', () => {
    const { result } = renderHook(() => useScrollTracking());
    
    act(() => {
      result.current.scrollToSection(999); // Invalid index
    });

    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('should clean up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollTracking());
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle sections with null values', () => {
    const { result } = renderHook(() => useScrollTracking());
    
    const mockSection = {
      offsetTop: 0,
      offsetHeight: 1000,
    } as HTMLElement;

    act(() => {
      result.current.sectionsRef.current = [null, mockSection];
    });

    // Should not crash and should handle null sections gracefully
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.activeSection).toBe(0); // Should remain 0 since no valid section matches
  });
});
