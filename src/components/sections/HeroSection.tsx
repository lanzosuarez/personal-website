import React from 'react';
import { Github, Mail, Linkedin, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  typedText: string;
  scrollToSection: (index: number) => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  typedText,
  scrollToSection,
  sectionsRef
}) => {
  return (
    <section
      ref={el => { sectionsRef.current[0] = el; }}
      className="min-h-screen flex flex-col items-center justify-center px-8 relative"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Alfonzo Suarez
          </span>
        </div>
        <div className="text-2xl md:text-3xl font-mono mb-8 h-10">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>&lt;</span>
          <span>{typedText}</span>
          <span className="animate-pulse">|</span>
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>/&gt;</span>
        </div>
        <p className={`text-lg max-w-2xl mx-auto mb-12 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Crafting elegant user interfaces with modern web technologies.
          Passionate about clean code, performance, accessibility, testing, and exceptional user experiences.
        </p>
        <div className="flex gap-6 justify-center">
          <a 
            href="https://github.com/lanzosuarez" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit Alfonzo Suarez's GitHub profile" 
            className={`p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              darkMode ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'
            } ${
              darkMode
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-200/60 hover:bg-gray-300/80'
            }`}
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/alfonzo-suarez/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit Alfonzo Suarez's LinkedIn profile" 
            className={`p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              darkMode ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'
            } ${
              darkMode
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-200/60 hover:bg-gray-300/80'
            }`}
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="mailto:lanzosuarez@gmail.com" 
            aria-label="Send email to Alfonzo Suarez" 
            className={`p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              darkMode ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'
            } ${
              darkMode
                ? 'bg-gray-800/50 hover:bg-gray-800'
                : 'bg-gray-200/60 hover:bg-gray-300/80'
            }`}
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <button
        onClick={() => scrollToSection(1)}
        className={`absolute bottom-8 animate-bounce w-6 h-6 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
          darkMode ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'
        } ${
          darkMode
            ? 'text-gray-300 hover:text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        aria-label="Scroll to About section"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};
