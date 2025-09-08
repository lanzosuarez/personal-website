import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypingEffect } from '../useTypingEffect';

describe('useTypingEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with empty typed text', () => {
    const { result } = renderHook(() => useTypingEffect('Hello World'));
    
    expect(result.current.typedText).toBe('');
    expect(result.current.isTyping).toBe(true);
  });

  it('should type text character by character', () => {
    const { result } = renderHook(() => useTypingEffect('Hello', 100));
    
    expect(result.current.typedText).toBe('');
    
    // Advance timer by 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.typedText).toBe('H');
    
    // Advance timer by another 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.typedText).toBe('He');
    
    // Continue until complete
    act(() => {
      vi.advanceTimersByTime(300); // 3 more characters
    });
    expect(result.current.typedText).toBe('Hello');
  });

  it('should respect custom typing speed', () => {
    const { result } = renderHook(() => useTypingEffect('Hi', 50));
    
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.typedText).toBe('H');
    
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.typedText).toBe('Hi');
  });

  it('should stop typing when isTyping is set to false', () => {
    const { result } = renderHook(() => useTypingEffect('Hello World'));
    
    act(() => {
      result.current.setIsTyping(false);
    });
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.typedText).toBe('');
    expect(result.current.isTyping).toBe(false);
  });

  it('should handle empty string input', () => {
    const { result } = renderHook(() => useTypingEffect(''));
    
    expect(result.current.typedText).toBe('');
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.typedText).toBe('');
  });

  it('should not exceed the full text length', () => {
    const { result } = renderHook(() => useTypingEffect('Hi'));
    
    act(() => {
      vi.advanceTimersByTime(1000); // More time than needed
    });
    
    expect(result.current.typedText).toBe('Hi');
    expect(result.current.typedText.length).toBe(2);
  });
});
