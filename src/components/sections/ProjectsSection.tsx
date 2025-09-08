import React from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data/projects';

interface ProjectsSectionProps {
  darkMode: boolean;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  openModal: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  darkMode,
  sectionsRef,
  openModal
}) => {
  return (
    <section
      ref={el => { sectionsRef.current[3] = el; }}
      className="min-h-screen px-8 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className={`group relative rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-gray-900/30 hover:bg-gray-900/50'
                  : 'bg-gray-100/60 hover:bg-gray-200/80'
              }`}
            >
              <div className="text-4xl mb-4">{project.image}</div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(tech => (
                  <span key={tech} className={`px-2 py-1 rounded text-xs ${
                    darkMode
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.hasScreenshots ? (
                  <button
                    onClick={() => openModal(project)}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Components
                  </button>
                ) : project.liveUrl !== "#" ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                ) : (
                  <span className={`flex items-center gap-2 ${
                    darkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    <ExternalLink className="w-4 h-4" />
                    In Development
                  </span>
                )}
                {project.githubUrl !== "#" ? (
                  <a href={project.githubUrl} className={`flex items-center gap-2 transition-colors ${
                    darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                ) : (
                  <span className={`flex items-center gap-2 ${
                    darkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    <Github className="w-4 h-4" />
                    Private Repository
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
