import React, { useState } from 'react';
import { Workout } from '../types';
import { muscleGroups, workoutDatabase } from '../data/workouts';

export const useWorkoutGenerator = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [generatedWorkout, setGeneratedWorkout] = useState<Workout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWorkout = (muscleGroup: string) => {
    setIsGenerating(true);
    setSelectedMuscleGroup(muscleGroup);

    // Generate workout plan
    setTimeout(() => {
      const exercises = workoutDatabase[muscleGroup] || [];
      const selectedGroup = muscleGroups.find(mg => mg.id === muscleGroup);

      const workout: Workout = {
        target: selectedGroup?.name || muscleGroup,
        emoji: selectedGroup?.emoji || '💪',
        exercises: exercises,
        tips: [
          "Progressive overload: Increase weight when you can complete all sets",
          "Rest 60-90 seconds between isolation sets, 2-3 minutes for compounds",
          "Focus on form over weight - quality reps build quality muscle"
        ],
        duration: "45-60 minutes"
      };

      setGeneratedWorkout(workout);
      setIsGenerating(false);
    }, 1500); // Processing time for better UX
  };

  const resetWorkout = () => {
    setGeneratedWorkout(null);
    setSelectedMuscleGroup('');
  };

  return {
    selectedMuscleGroup,
    generatedWorkout,
    isGenerating,
    generateWorkout,
    resetWorkout
  };
};
