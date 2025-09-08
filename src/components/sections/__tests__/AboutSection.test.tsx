import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils';
import { AboutSection } from '../AboutSection';

describe('AboutSection', () => {
  const mockSectionsRef = { current: [] };

  it('should render the About Me heading', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('should render the main description paragraphs', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText(/Lead Frontend Developer with 7\+ years/)).toBeInTheDocument();
    expect(screen.getByText(/proven track record of leading teams/)).toBeInTheDocument();
    expect(screen.getByText(/Beyond code,/)).toBeInTheDocument();
    expect(screen.getByText(/bodybuilding/)).toBeInTheDocument();
  });

  it('should render Core Technologies section', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText('Core Technologies')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('should apply dark mode styles to text', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    const paragraph = screen.getByText(/Lead Frontend Developer with 7\+ years/);
    expect(paragraph).toHaveClass('text-gray-300');
  });

  it('should apply light mode styles to text', () => {
    render(
      <AboutSection
        darkMode={false}
        sectionsRef={mockSectionsRef}
      />
    );

    const paragraph = screen.getByText(/Lead Frontend Developer with 7\+ years/);
    expect(paragraph).toHaveClass('text-gray-600');
  });

  it('should render User icon in heading', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    // Check if the icon is present (User icon from lucide-react)
    const heading = screen.getByRole('heading', { name: /about me/i });
    expect(heading).toBeInTheDocument();
  });

  it('should have proper section structure', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    // Check if the section has the right classes by finding the section element
    const sectionElement = screen.getByRole('heading', { name: /about me/i }).closest('section');
    expect(sectionElement).toHaveClass('min-h-screen', 'flex', 'items-center');
  });

  it('should render technology tags with proper styling', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    const typeScriptTag = screen.getByText('TypeScript');
    expect(typeScriptTag).toHaveClass('px-3', 'py-1', 'bg-blue-500/10', 'text-blue-400', 'rounded-full', 'text-sm');
  });

  it('should have responsive grid layout', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    // Find the grid container
    const gridContainer = screen.getByText(/Lead Frontend Developer with 7\+ years/).closest('.grid');
    expect(gridContainer).toHaveClass('grid', 'md:grid-cols-2', 'gap-12');
  });

  it('should highlight bodybuilding philosophy', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText('Beyond code,')).toBeInTheDocument();
    expect(screen.getByText(/bodybuilding.*discipline/)).toBeInTheDocument();
  });

  it('should mention key technical skills', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText(/TypeScript, React, Vue\.js/)).toBeInTheDocument();
    expect(screen.getByText(/performance optimization and team leadership/)).toBeInTheDocument();
  });

  it('should mention experience with enterprise applications', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText(/enterprise applications/)).toBeInTheDocument();
    expect(screen.getByText(/fintech, ERP systems, and mobile platforms/)).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    render(
      <AboutSection
        darkMode={true}
        sectionsRef={mockSectionsRef}
      />
    );

    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('About Me');

    const subHeading = screen.getByRole('heading', { level: 3 });
    expect(subHeading).toHaveTextContent('Core Technologies');
  });
});
