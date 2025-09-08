import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgressTracking } from '../useProgressTracking';

describe('useProgressTracking', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    expect(result.current.workoutDays).toBe(250);
    expect(result.current.codingDays).toBe(1825);
    expect(result.current.workoutProgress).toBeDefined();
    expect(result.current.codingProgress).toBeDefined();
  });

  it('should update workout days', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    act(() => {
      result.current.setWorkoutDays(300);
    });
    
    expect(result.current.workoutDays).toBe(300);
  });

  it('should update coding days', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    act(() => {
      result.current.setCodingDays(2000);
    });
    
    expect(result.current.codingDays).toBe(2000);
  });

  it('should calculate workout progress correctly', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    act(() => {
      result.current.setWorkoutDays(100);
    });
    
    const progress = result.current.workoutProgress;
    expect(progress.strengthLevel).toBeGreaterThan(0);
    expect(progress.strengthLevel).toBeLessThan(100);
    expect(progress.experienceLevel).toBe(Math.floor(100 / 30)); // months
    expect(progress.phase).toBeDefined();
  });

  it('should calculate coding progress correctly', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    act(() => {
      result.current.setCodingDays(365); // 1 year
    });
    
    const progress = result.current.codingProgress;
    expect(progress.strengthLevel).toBeGreaterThan(0);
    expect(progress.strengthLevel).toBeLessThan(100);
    expect(progress.experienceLevel).toBe(1.0); // 1 year
    expect(progress.phase).toBeDefined();
  });

  it('should ensure strength level is never below 1', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    act(() => {
      result.current.setWorkoutDays(1); // Very low days
    });
    
    expect(result.current.workoutProgress.strengthLevel).toBeGreaterThanOrEqual(1);
  });

  it('should provide appropriate phase names for different levels', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    // Test beginner phase
    act(() => {
      result.current.setWorkoutDays(10);
    });
    expect(result.current.workoutProgress.phase).toContain('Beginner');
    
    // Test higher level phase
    act(() => {
      result.current.setWorkoutDays(1000);
    });
    expect(result.current.workoutProgress.phase).toBeDefined();
  });

  it('should calculate experience levels correctly', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    // Test workout experience (in months)
    act(() => {
      result.current.setWorkoutDays(90); // 3 months
    });
    expect(result.current.workoutProgress.experienceLevel).toBe(3);
    
    // Test coding experience (in years with decimal)
    act(() => {
      result.current.setCodingDays(730); // 2 years
    });
    expect(result.current.codingProgress.experienceLevel).toBe(2.0);
  });

  it('should handle asymptotic growth (never reaches 100%)', () => {
    const { result } = renderHook(() => useProgressTracking());
    
    // Test with very high values
    act(() => {
      result.current.setWorkoutDays(10000);
      result.current.setCodingDays(10000);
    });
    
    // Should approach but never reach 100%
    expect(result.current.workoutProgress.strengthLevel).toBeLessThan(100);
    expect(result.current.codingProgress.strengthLevel).toBeLessThan(100);
  });
});
