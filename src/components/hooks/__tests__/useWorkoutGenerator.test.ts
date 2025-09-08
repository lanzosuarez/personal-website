import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWorkoutGenerator } from '../useWorkoutGenerator';

describe('useWorkoutGenerator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    expect(result.current.selectedMuscleGroup).toBe('');
    expect(result.current.generatedWorkout).toBe(null);
    expect(result.current.isGenerating).toBe(false);
  });

  it('should start generating workout when generateWorkout is called', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('chest');
    });
    
    expect(result.current.selectedMuscleGroup).toBe('chest');
    expect(result.current.isGenerating).toBe(true);
    expect(result.current.generatedWorkout).toBe(null);
  });

  it('should generate workout after timeout', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('chest');
    });
    
    expect(result.current.isGenerating).toBe(true);
    
    // Fast forward time by 1500ms (the timeout duration)
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(result.current.isGenerating).toBe(false);
    expect(result.current.generatedWorkout).not.toBe(null);
    expect(result.current.generatedWorkout?.target).toBe('Chest');
    expect(result.current.generatedWorkout?.emoji).toBe('💪');
    expect(result.current.generatedWorkout?.exercises).toBeDefined();
    expect(result.current.generatedWorkout?.tips).toBeDefined();
    expect(result.current.generatedWorkout?.duration).toBe('45-60 minutes');
  });

  it('should generate workout for different muscle groups', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('back');
    });
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(result.current.generatedWorkout?.target).toBe('Back');
    expect(result.current.generatedWorkout?.emoji).toBe('🔥');
  });

  it('should handle unknown muscle group', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('unknown');
    });
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(result.current.generatedWorkout?.target).toBe('unknown');
    expect(result.current.generatedWorkout?.emoji).toBe('💪'); // fallback
    expect(result.current.generatedWorkout?.exercises).toEqual([]); // no exercises for unknown group
  });

  it('should reset workout when resetWorkout is called', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    // Generate a workout first
    act(() => {
      result.current.generateWorkout('chest');
    });
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(result.current.generatedWorkout).not.toBe(null);
    
    // Reset the workout
    act(() => {
      result.current.resetWorkout();
    });
    
    expect(result.current.generatedWorkout).toBe(null);
    expect(result.current.selectedMuscleGroup).toBe('');
  });

  it('should include proper workout structure', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('chest');
    });
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    const workout = result.current.generatedWorkout;
    expect(workout).toHaveProperty('target');
    expect(workout).toHaveProperty('emoji');
    expect(workout).toHaveProperty('exercises');
    expect(workout).toHaveProperty('tips');
    expect(workout).toHaveProperty('duration');
    
    expect(Array.isArray(workout?.exercises)).toBe(true);
    expect(Array.isArray(workout?.tips)).toBe(true);
    expect(workout?.tips.length).toBe(3);
  });

  it('should include exercises with proper structure', () => {
    const { result } = renderHook(() => useWorkoutGenerator());
    
    act(() => {
      result.current.generateWorkout('chest');
    });
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    const exercises = result.current.generatedWorkout?.exercises;
    expect(exercises?.length).toBeGreaterThan(0);
    
    exercises?.forEach(exercise => {
      expect(exercise).toHaveProperty('exercise');
      expect(exercise).toHaveProperty('sets');
      expect(exercise).toHaveProperty('reps');
      expect(exercise).toHaveProperty('type');
      expect(['compound', 'isolation', 'isometric', 'dynamic', 'stability', 'cardio']).toContain(exercise.type);
    });
  });
});
