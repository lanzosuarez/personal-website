import { MuscleGroup, Exercise } from '../types';

export const muscleGroups: MuscleGroup[] = [
  { id: 'chest', name: 'Chest', emoji: '💪' },
  { id: 'back', name: 'Back', emoji: '🔥' },
  { id: 'shoulders', name: 'Shoulders', emoji: '🌟' },
  { id: 'arms', name: 'Arms', emoji: '💥' },
  { id: 'legs', name: 'Legs', emoji: '🦵' },
  { id: 'core', name: 'Core', emoji: '⚡' }
];

export const workoutDatabase: Record<string, Exercise[]> = {
  chest: [
    { exercise: 'Barbell Bench Press', sets: '4 sets', reps: '6-8 reps', type: 'compound' },
    { exercise: 'Incline Dumbbell Press', sets: '3 sets', reps: '8-10 reps', type: 'compound' },
    { exercise: 'Dips', sets: '3 sets', reps: '10-12 reps', type: 'compound' },
    { exercise: 'Cable Flyes', sets: '3 sets', reps: '12-15 reps', type: 'isolation' }
  ],
  back: [
    { exercise: 'Deadlifts', sets: '4 sets', reps: '5-6 reps', type: 'compound' },
    { exercise: 'Pull-ups', sets: '3 sets', reps: '8-10 reps', type: 'compound' },
    { exercise: 'Barbell Rows', sets: '3 sets', reps: '8-10 reps', type: 'compound' },
    { exercise: 'Lat Pulldowns', sets: '3 sets', reps: '10-12 reps', type: 'isolation' }
  ],
  shoulders: [
    { exercise: 'Overhead Press', sets: '4 sets', reps: '6-8 reps', type: 'compound' },
    { exercise: 'Lateral Raises', sets: '3 sets', reps: '12-15 reps', type: 'isolation' },
    { exercise: 'Rear Delt Flyes', sets: '3 sets', reps: '12-15 reps', type: 'isolation' },
    { exercise: 'Face Pulls', sets: '3 sets', reps: '15-20 reps', type: 'isolation' }
  ],
  arms: [
    { exercise: 'Close-Grip Bench Press', sets: '4 sets', reps: '8-10 reps', type: 'compound' },
    { exercise: 'Barbell Curls', sets: '3 sets', reps: '8-10 reps', type: 'isolation' },
    { exercise: 'Tricep Dips', sets: '3 sets', reps: '10-12 reps', type: 'compound' },
    { exercise: 'Hammer Curls', sets: '3 sets', reps: '10-12 reps', type: 'isolation' }
  ],
  legs: [
    { exercise: 'Squats', sets: '4 sets', reps: '6-8 reps', type: 'compound' },
    { exercise: 'Romanian Deadlifts', sets: '3 sets', reps: '8-10 reps', type: 'compound' },
    { exercise: 'Bulgarian Split Squats', sets: '3 sets', reps: '10-12 reps', type: 'compound' },
    { exercise: 'Calf Raises', sets: '4 sets', reps: '15-20 reps', type: 'isolation' }
  ],
  core: [
    { exercise: 'Plank', sets: '3 sets', reps: '60 seconds', type: 'isometric' },
    { exercise: 'Russian Twists', sets: '3 sets', reps: '20 reps', type: 'dynamic' },
    { exercise: 'Dead Bug', sets: '3 sets', reps: '10 each side', type: 'stability' },
    { exercise: 'Mountain Climbers', sets: '3 sets', reps: '30 seconds', type: 'cardio' }
  ]
};
