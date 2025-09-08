export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  screenshots?: string[];
  hasScreenshots?: boolean;
}

export interface Experience {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export interface MuscleGroup {
  id: string;
  name: string;
  emoji: string;
}

export interface Exercise {
  exercise: string;
  sets: string;
  reps: string;
  type: 'compound' | 'isolation' | 'isometric' | 'dynamic' | 'stability' | 'cardio';
}

export interface Workout {
  target: string;
  emoji: string;
  exercises: Exercise[];
  tips: string[];
  duration: string;
}

export interface ProgressData {
  strengthLevel: number;
  experienceLevel: number;
  phase: string;
}

export interface PanPosition {
  x: number;
  y: number;
}
