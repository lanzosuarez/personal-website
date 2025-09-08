import React from 'react';
import { User } from 'lucide-react';
import { coreTechnologies } from '../data/constants';

interface AboutSectionProps {
  darkMode: boolean;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  darkMode,
  sectionsRef
}) => {
  return (
    <section
      ref={el => { sectionsRef.current[1] = el; }}
      className="min-h-screen flex items-center px-8 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <User className="w-8 h-8 text-blue-500" />
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm a Lead Frontend Developer with 7+ years of experience building
              scalable web applications. I specialize in TypeScript, React, Vue.js, and modern
              frontend architectures with a focus on performance optimization and team leadership.
            </p>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              I have a proven track record of leading teams, establishing development standards,
              and delivering high-performance user interfaces for enterprise applications across
              various industries including fintech, ERP systems, and mobile platforms.
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>Beyond code,</strong> I'm passionate about bodybuilding 💪 — the same discipline,
              consistency, and progressive overload mindset that builds muscle also drives my approach
              to software development. Whether it's optimizing code performance or hitting new PRs,
              it's all about showing up every day and getting 1% better.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {coreTechnologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
