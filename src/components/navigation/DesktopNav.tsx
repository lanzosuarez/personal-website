import React from 'react';

interface DesktopNavProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
  darkMode: boolean;
}

const sections = ['Home', 'About', 'Experience', 'Projects', 'Code'];

export const DesktopNav: React.FC<DesktopNavProps> = ({ 
  activeSection, 
  scrollToSection, 
  darkMode 
}) => {
  return (
    <nav 
      aria-label="Section navigation" 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
    >
      {sections.map((label, index) => (
        <button
          key={label}
          onClick={() => scrollToSection(index)}
          className="group relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-2"
          aria-label={`Go to ${label}`}
        >
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeSection === index
              ? 'bg-blue-500 w-8'
              : darkMode 
                ? 'bg-gray-600 hover:bg-gray-400' 
                : 'bg-gray-400 hover:bg-gray-600'
          }`} />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};
