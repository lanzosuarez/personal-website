import React from 'react';
import { Workout } from '../types';
import { muscleGroups } from '../data/workouts';

interface WorkoutGeneratorProps {
  darkMode: boolean;
  generatedWorkout: Workout | null;
  isGenerating: boolean;
  generateWorkout: (muscleGroup: string) => void;
  resetWorkout: () => void;
}

export const WorkoutGenerator: React.FC<WorkoutGeneratorProps> = ({
  darkMode,
  generatedWorkout,
  isGenerating,
  generateWorkout,
  resetWorkout
}) => {
  return (
    <div className={`rounded-xl p-6 mb-8 ${
      darkMode 
        ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20' 
        : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
    }`}>
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span aria-hidden="true">💪</span> Training Plan Generator
        <span className="text-sm font-normal opacity-90">Built with domain expertise</span>
      </h3>

      {!generatedWorkout ? (
        <div className="space-y-4">
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            What do you want to workout today?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {muscleGroups.map(group => (
              <button
                key={group.id}
                onClick={() => generateWorkout(group.id)}
                disabled={isGenerating}
                className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                  isGenerating
                    ? 'opacity-50 cursor-not-allowed'
                    : darkMode
                      ? 'bg-gray-800/50 hover:bg-gray-700/70 hover:scale-105'
                      : 'bg-white/70 hover:bg-white hover:scale-105 shadow-sm'
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{group.emoji}</span>
                <span className="text-sm font-medium">{group.name}</span>
              </button>
            ))}
          </div>
          {isGenerating && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                <span>Generating optimal workout plan...</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <span aria-hidden="true">{generatedWorkout.emoji}</span> {generatedWorkout.target} Day
              <span className="text-sm font-normal opacity-90">• {generatedWorkout.duration}</span>
            </h4>
            <button
              onClick={resetWorkout}
              className={`text-sm px-3 py-1 rounded transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              Generate New
            </button>
          </div>

          <div className="grid gap-3">
            {generatedWorkout.exercises.map((exercise, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-800/30' : 'bg-white/50'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{exercise.exercise}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exercise.type === 'compound'
                      ? 'bg-green-500/20 text-green-400'
                      : exercise.type === 'isolation'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {exercise.type}
                  </span>
                </div>
                <div className="text-sm opacity-75 mt-1">
                  {exercise.sets} × {exercise.reps}
                </div>
              </div>
            ))}
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h5 className="font-medium text-blue-400 mb-2">💡 Pro Tips</h5>
            <ul className="text-sm space-y-1 opacity-90">
              {generatedWorkout.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
