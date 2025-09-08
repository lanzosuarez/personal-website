import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProgressTracking } from '../useProgressTracking';
import { useWorkoutGenerator } from '../useWorkoutGenerator';

describe('Custom Hooks - Basic Tests', () => {
  describe('useProgressTracking', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useProgressTracking());
      
      expect(result.current.workoutDays).toBe(250);
      expect(result.current.codingDays).toBe(1825);
      expect(result.current.workoutProgress).toBeDefined();
      expect(result.current.codingProgress).toBeDefined();
    });

    it('should calculate progress correctly', () => {
      const { result } = renderHook(() => useProgressTracking());
      
      const workoutProgress = result.current.workoutProgress;
      const codingProgress = result.current.codingProgress;
      
      expect(workoutProgress.strengthLevel).toBeGreaterThan(0);
      expect(workoutProgress.strengthLevel).toBeLessThan(100);
      expect(codingProgress.strengthLevel).toBeGreaterThan(0);
      expect(codingProgress.strengthLevel).toBeLessThan(100);
    });
  });

  describe('useWorkoutGenerator', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useWorkoutGenerator());
      
      expect(result.current.selectedMuscleGroup).toBe('');
      expect(result.current.generatedWorkout).toBe(null);
      expect(result.current.isGenerating).toBe(false);
    });
  });
});
