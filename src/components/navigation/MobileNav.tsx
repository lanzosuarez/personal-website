import React from 'react';
import { navigationSections } from '../data/constants';

interface MobileNavProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
  darkMode: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ 
  activeSection, 
  scrollToSection, 
  darkMode 
}) => {
  return (
    <nav 
      aria-label="Mobile section navigation" 
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden ${
        darkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-md border-t ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-around items-center py-2 px-4">
        {navigationSections.map((item, index) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(index)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              darkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
            } ${
              activeSection === index
                ? darkMode 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-blue-500/10 text-blue-600'
                : darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label={`Go to ${item.label} section`}
          >
            <span className="text-lg leading-none mb-1" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
