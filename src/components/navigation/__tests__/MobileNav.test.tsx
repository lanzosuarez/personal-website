import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '../../../test/utils';
import { MobileNav } from '../MobileNav';
import userEvent from '@testing-library/user-event';

describe('MobileNav', () => {
  const mockScrollToSection = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render all navigation sections with icons', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    expect(screen.getByLabelText('Go to Home section')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to About section')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Experience section')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Projects section')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Code section')).toBeInTheDocument();

    // Check for icons
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('👨‍💻')).toBeInTheDocument();
    expect(screen.getByText('💼')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('💪')).toBeInTheDocument();
  });

  it('should render section labels', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('should highlight active section in dark mode', () => {
    render(
      <MobileNav
        activeSection={1}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const aboutButton = screen.getByLabelText('Go to About section');
    expect(aboutButton).toHaveClass('bg-blue-500/20', 'text-blue-400');
  });

  it('should highlight active section in light mode', () => {
    render(
      <MobileNav
        activeSection={1}
        scrollToSection={mockScrollToSection}
        darkMode={false}
      />
    );

    const aboutButton = screen.getByLabelText('Go to About section');
    expect(aboutButton).toHaveClass('bg-blue-500/10', 'text-blue-600');
  });

  it('should call scrollToSection when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const experienceButton = screen.getByLabelText('Go to Experience section');
    await user.click(experienceButton);

    expect(mockScrollToSection).toHaveBeenCalledWith(2);
  });

  it('should apply dark mode styles for inactive sections', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const projectsButton = screen.getByLabelText('Go to Projects section');
    expect(projectsButton).toHaveClass(
      'text-gray-300',
      'hover:text-white',
      'hover:bg-gray-800/50'
    );
  });

  it('should apply light mode styles for inactive sections', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={false}
      />
    );

    const projectsButton = screen.getByLabelText('Go to Projects section');
    expect(projectsButton).toHaveClass(
      'text-gray-600',
      'hover:text-gray-900',
      'hover:bg-gray-100'
    );
  });

  it('should apply dark mode background styles', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-gray-900/95', 'border-gray-800');
  });

  it('should apply light mode background styles', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={false}
      />
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-white/95', 'border-gray-200');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const codeButton = screen.getByLabelText('Go to Code section');
    
    // Focus and press Enter
    codeButton.focus();
    await user.keyboard('{Enter}');

    expect(mockScrollToSection).toHaveBeenCalledWith(4);
  });

  it('should handle all section navigation correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const sections = ['Home', 'About', 'Experience', 'Projects', 'Code'];
    
    for (let i = 0; i < sections.length; i++) {
      const button = screen.getByLabelText(`Go to ${sections[i]} section`);
      await user.click(button);
      expect(mockScrollToSection).toHaveBeenCalledWith(i);
    }

    expect(mockScrollToSection).toHaveBeenCalledTimes(5);
  });

  it('should have proper ARIA attributes', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation', { name: /mobile section navigation/i });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Mobile section navigation');
  });

  it('should have focus ring styles', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const homeButton = screen.getByLabelText('Go to Home section');
    expect(homeButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('should be visible only on mobile screens', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation', { name: /mobile section navigation/i });
    expect(nav).toHaveClass('md:hidden');
  });

  it('should have backdrop blur and proper positioning', () => {
    render(
      <MobileNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation', { name: /mobile section navigation/i });
    expect(nav).toHaveClass(
      'fixed',
      'bottom-0',
      'left-0',
      'right-0',
      'backdrop-blur-md',
      'border-t'
    );
  });
});
