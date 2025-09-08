import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-8 right-8 z-50 p-3 rounded-full backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        darkMode ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'
      } ${
        darkMode
          ? 'bg-gray-800/20 hover:bg-gray-800/30'
          : 'bg-gray-200/80 hover:bg-gray-300/80'
      }`}
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
