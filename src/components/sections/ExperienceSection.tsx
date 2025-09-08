import React from 'react';
import { Briefcase } from 'lucide-react';
import { experiences } from '../data/experiences';

interface ExperienceSectionProps {
  darkMode: boolean;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  darkMode,
  sectionsRef
}) => {
  return (
    <section
      ref={el => { sectionsRef.current[2] = el; }}
      className="min-h-screen px-8 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-500" />
          Experience
        </h2>
        <div className="relative">
          <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-300'
          }`}></div>
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 pb-12 group">
              <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-[3px] group-hover:scale-150 transition-transform"></div>
              <div className={`rounded-lg p-6 transition-colors ${
                darkMode
                  ? 'bg-gray-900/50 hover:bg-gray-900/70'
                  : 'bg-gray-100/80 hover:bg-gray-200/80'
              }`}>
                <div className="text-sm text-blue-400 mb-2">{exp.year}</div>
                <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                <div className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.company}
                </div>
                <p className={`mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-700'}`}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(tech => (
                    <span key={tech} className={`px-2 py-1 rounded text-xs ${
                      darkMode
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
