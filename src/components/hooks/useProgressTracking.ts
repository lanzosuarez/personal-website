import React, { useState } from 'react';
import { ProgressData } from '../types';

export const useProgressTracking = () => {
  const [workoutDays, setWorkoutDays] = useState(250);
  const [codingDays, setCodingDays] = useState(1825); // 5 years

  // Calculate progress metrics - asymptotic growth (never reaches 100%)
  const calculateProgress = (days: number, type: 'workout' | 'coding'): ProgressData => {
    // Logarithmic growth that approaches but never reaches 100%
    const baseGrowth = type === 'workout' ? 15 : 20; // Base learning rate
    const diminishingFactor = type === 'workout' ? 800 : 1200; // How quickly growth slows

    // Asymptotic function: approaches 100% but never reaches it
    const strengthLevel = Math.floor(100 * (1 - Math.exp(-days / diminishingFactor)) * (baseGrowth / 20));

    const experienceLevel = type === 'workout'
      ? Math.floor(days / 30) // months of training (no cap)
      : Math.floor(days / 365 * 10) / 10; // years of coding (with decimal)

    // Growth phases
    const getPhase = (level: number) => {
      if (level < 20) return type === 'workout' ? 'Beginner Gains' : 'Learning Fundamentals';
      if (level < 40) return type === 'workout' ? 'Intermediate Grind' : 'Building Projects';
      if (level < 60) return type === 'workout' ? 'Advanced Training' : 'Senior Developer';
      if (level < 75) return type === 'workout' ? 'Elite Athlete' : 'Tech Lead';
      if (level < 85) return type === 'workout' ? 'Competition Ready' : 'Principal Engineer';
      return type === 'workout' ? 'Always Evolving 💪' : 'Always Learning 🧠';
    };

    return {
      strengthLevel: Math.max(strengthLevel, 1),
      experienceLevel,
      phase: getPhase(strengthLevel)
    };
  };

  const workoutProgress = calculateProgress(workoutDays, 'workout');
  const codingProgress = calculateProgress(codingDays, 'coding');

  return {
    workoutDays,
    setWorkoutDays,
    codingDays,
    setCodingDays,
    workoutProgress,
    codingProgress
  };
};
