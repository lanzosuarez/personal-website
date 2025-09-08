import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { ProgressData } from '../types';

interface ProgressTrackerProps {
  darkMode: boolean;
  days: number;
  setDays: (days: number) => void;
  progress: ProgressData;
  type: 'workout' | 'coding';
  title: string;
  emoji: string;
  increment: number;
  gradientColors: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  darkMode,
  days,
  setDays,
  progress,
  type,
  title,
  emoji,
  increment,
  gradientColors
}) => {
  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/80'}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span aria-hidden="true">{emoji}</span> {title}
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>{type === 'workout' ? 'Training Days:' : 'Coding Days:'}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDays(Math.max(type === 'workout' ? 1 : 365, days - increment))}
              className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
              }`}
              aria-label={`Decrease ${type} days by ${increment}`}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono w-16 text-center">{days}</span>
            <button
              onClick={() => setDays(days + increment)}
              className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
              }`}
              aria-label={`Increase ${type} days by ${increment}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Progress:</span>
            <span className="font-mono">{progress.strengthLevel}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${gradientColors}`}
              style={{ width: `${progress.strengthLevel}%` }}
            ></div>
          </div>
          <div className="text-sm opacity-75">
            {progress.experienceLevel} {type === 'workout' ? 'months' : 'years'} • {progress.phase}
          </div>
        </div>
      </div>
    </div>
  );
};
