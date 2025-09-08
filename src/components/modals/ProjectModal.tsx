import React from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  modalOpen: boolean;
  selectedProject: Project | null;
  darkMode: boolean;
  zoomLevel: number;
  panPosition: { x: number; y: number };
  isDragging: boolean;
  closeModal: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  modalOpen,
  selectedProject,
  darkMode,
  zoomLevel,
  panPosition,
  isDragging,
  closeModal,
  zoomIn,
  zoomOut,
  resetZoom,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel
}) => {
  if (!modalOpen || !selectedProject) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className={`relative max-w-6xl max-h-[90vh] w-full rounded-xl overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div>
            <h3 id="modal-title" className="text-xl font-semibold">
              {selectedProject.title}
            </h3>
            <p id="modal-description" className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Component Library Screenshots
            </p>
          </div>
          <button
            onClick={closeModal}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Viewer */}
        <div className="relative overflow-hidden max-h-[calc(90vh-120px)]">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={zoomOut}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                  : 'bg-white/80 hover:bg-gray-100 text-gray-900'
              } backdrop-blur-sm`}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                  : 'bg-white/80 hover:bg-gray-100 text-gray-900'
              } backdrop-blur-sm`}
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={zoomIn}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800/80 hover:bg-gray-700 text-white'
                  : 'bg-white/80 hover:bg-gray-100 text-gray-900'
              } backdrop-blur-sm`}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-lg text-sm ${
              darkMode
                ? 'bg-gray-800/80 text-white'
                : 'bg-white/80 text-gray-900'
            } backdrop-blur-sm`}>
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Image Container */}
          <div
            className="w-full h-full flex items-center justify-center p-6 overflow-hidden relative"
            style={{
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              minHeight: '60vh'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {selectedProject.screenshots && selectedProject.screenshots[0] && (
              <div
                className="flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transition: 'transform 0.2s ease-out',
                  transformOrigin: 'center center'
                }}
              >
                <img
                  src={selectedProject.screenshots[0]}
                  alt={`${selectedProject.title} component`}
                  className="select-none block"
                  style={{
                    maxHeight: '60vh',
                    maxWidth: '90vw',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <span className={`px-3 py-1 rounded-lg text-xs ${
              darkMode
                ? 'bg-gray-800/80 text-gray-300'
                : 'bg-white/80 text-gray-600'
            } backdrop-blur-sm`}>
              Scroll to zoom • Drag when zoomed • Click controls to zoom
            </span>
          </div>
        </div>

        {/* Tech Stack in Modal */}
        <div className="px-6 pb-6">
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map(tech => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
