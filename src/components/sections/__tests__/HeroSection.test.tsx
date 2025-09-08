import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/utils';
import { HeroSection } from '../HeroSection';
import userEvent from '@testing-library/user-event';

describe('HeroSection', () => {
  const mockScrollToSection = vi.fn();
  const mockSectionsRef = { current: [] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the hero content', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText="Lead Frontend"
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText('Alfonzo Suarez')).toBeInTheDocument();
    expect(screen.getByText('Lead Frontend')).toBeInTheDocument();
    expect(screen.getByText(/Crafting elegant user interfaces/)).toBeInTheDocument();
  });

  it('should render typing animation with cursor', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText="Lead"
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    expect(screen.getByText('Lead')).toBeInTheDocument();
    expect(screen.getByText('|')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('/>')).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const githubLink = screen.getByLabelText("Visit Alfonzo Suarez's GitHub profile");
    const linkedinLink = screen.getByLabelText("Visit Alfonzo Suarez's LinkedIn profile");
    const emailLink = screen.getByLabelText("Send email to Alfonzo Suarez");

    expect(githubLink).toHaveAttribute('href', 'https://github.com/lanzosuarez');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alfonzo-suarez/');
    expect(emailLink).toHaveAttribute('href', 'mailto:lanzosuarez@gmail.com');
  });

  it('should have proper external link attributes', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const githubLink = screen.getByLabelText("Visit Alfonzo Suarez's GitHub profile");
    const linkedinLink = screen.getByLabelText("Visit Alfonzo Suarez's LinkedIn profile");

    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render scroll down button', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const scrollButton = screen.getByLabelText('Scroll to About section');
    expect(scrollButton).toBeInTheDocument();
  });

  it('should call scrollToSection when scroll button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const scrollButton = screen.getByLabelText('Scroll to About section');
    await user.click(scrollButton);

    expect(mockScrollToSection).toHaveBeenCalledWith(1);
  });

  it('should apply dark mode styles', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText="Test"
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const description = screen.getByText(/Crafting elegant user interfaces/);
    expect(description).toHaveClass('text-gray-300');
  });

  it('should apply light mode styles', () => {
    render(
      <HeroSection
        darkMode={false}
        typedText="Test"
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const description = screen.getByText(/Crafting elegant user interfaces/);
    expect(description).toHaveClass('text-gray-600');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const scrollButton = screen.getByLabelText('Scroll to About section');
    
    // Focus and press Enter
    scrollButton.focus();
    await user.keyboard('{Enter}');

    expect(mockScrollToSection).toHaveBeenCalledWith(1);
  });

  it('should have proper focus ring styles', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const githubLink = screen.getByLabelText("Visit Alfonzo Suarez's GitHub profile");
    expect(githubLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('should have animated scroll button', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const scrollButton = screen.getByLabelText('Scroll to About section');
    expect(scrollButton).toHaveClass('animate-bounce');
  });

  it('should have gradient text for the name', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    const nameElement = screen.getByText('Alfonzo Suarez');
    expect(nameElement).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'bg-clip-text', 'text-transparent');
  });

  it('should render with proper section structure', () => {
    render(
      <HeroSection
        darkMode={true}
        typedText=""
        scrollToSection={mockScrollToSection}
        sectionsRef={mockSectionsRef}
      />
    );

    // Check if the section has the right classes by finding the section element
    const sectionElement = screen.getByText('Alfonzo Suarez').closest('section');
    expect(sectionElement).toHaveClass('min-h-screen', 'flex', 'flex-col', 'items-center', 'justify-center');
  });
});
