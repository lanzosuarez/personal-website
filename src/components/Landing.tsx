import React, { useState } from 'react';

// Components
import { DesktopNav } from './navigation/DesktopNav';
import { MobileNav } from './navigation/MobileNav';
import { ThemeToggle } from './ui/ThemeToggle';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CodeSection } from './sections/CodeSection';
import { ProjectModal } from './modals/ProjectModal';

// Hooks
import { useScrollTracking } from './hooks/useScrollTracking';
import { useTypingEffect } from './hooks/useTypingEffect';
import { useImageModal } from './hooks/useImageModal';

// Data
import { fullText } from './data/constants';

const Landing: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
    
    // Custom hooks
    const { activeSection, sectionsRef, scrollToSection } = useScrollTracking();
    const { typedText } = useTypingEffect(fullText);
    const {
        modalOpen,
        selectedProject,
        zoomLevel,
        panPosition,
        isDragging,
        openModal,
        closeModal,
        zoomIn,
        zoomOut,
        resetZoom,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel
    } = useImageModal();

    return (
        <div className={`min-h-screen transition-colors duration-500 pb-20 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
            {/* Skip to main content link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Skip to main content
            </a>
            
            {/* Navigation Components */}
            <DesktopNav 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
                darkMode={darkMode} 
            />
            <MobileNav 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
                darkMode={darkMode} 
            />
            
            {/* Theme Toggle */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Main Content */}
            <main id="main-content">
                <HeroSection 
                    darkMode={darkMode}
                    typedText={typedText}
                    scrollToSection={scrollToSection}
                    sectionsRef={sectionsRef}
                />
                
                <AboutSection 
                    darkMode={darkMode}
                    sectionsRef={sectionsRef}
                />
                
                <ExperienceSection 
                    darkMode={darkMode}
                    sectionsRef={sectionsRef}
                />
                
                <ProjectsSection 
                    darkMode={darkMode}
                    sectionsRef={sectionsRef}
                    openModal={openModal}
                />
                
                <CodeSection 
                    darkMode={darkMode}
                    sectionsRef={sectionsRef}
                />
            </main>

            {/* Project Modal */}
            <ProjectModal
                modalOpen={modalOpen}
                selectedProject={selectedProject}
                darkMode={darkMode}
                zoomLevel={zoomLevel}
                panPosition={panPosition}
                isDragging={isDragging}
                closeModal={closeModal}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetZoom={resetZoom}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                handleWheel={handleWheel}
            />

            {/* Footer */}
            <footer className={`py-8 px-8 text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <p>© 2025 Alfonzo Suarez. Built with React, TypeScript, TanStack Start & Cursor.</p>
            </footer>
        </div>
    );
};

export default Landing;
