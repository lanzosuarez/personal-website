import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/utils';
import { DesktopNav } from '../DesktopNav';
import userEvent from '@testing-library/user-event';

describe('DesktopNav', () => {
  const mockScrollToSection = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render all navigation sections', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    expect(screen.getByLabelText('Go to Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to About')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Experience')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Projects')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Code')).toBeInTheDocument();
  });

  it('should highlight active section', () => {
    render(
      <DesktopNav
        activeSection={2}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const experienceButton = screen.getByLabelText('Go to Experience');
    const indicator = experienceButton.querySelector('div');
    expect(indicator).toHaveClass('bg-blue-500', 'w-8');
  });

  it('should call scrollToSection when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const aboutButton = screen.getByLabelText('Go to About');
    await user.click(aboutButton);

    expect(mockScrollToSection).toHaveBeenCalledWith(1);
  });

  it('should apply dark mode styles', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const homeButton = screen.getByLabelText('Go to Home');
    const indicator = homeButton.querySelector('div');
    expect(indicator).toHaveClass('bg-blue-500', 'w-8'); // Active section
  });

  it('should apply light mode styles for inactive sections', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={false}
      />
    );

    const aboutButton = screen.getByLabelText('Go to About');
    const indicator = aboutButton.querySelector('div');
    expect(indicator).toHaveClass('bg-gray-400', 'hover:bg-gray-600');
  });

  it('should show hover tooltips', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const homeButton = screen.getByLabelText('Go to Home');
    const tooltip = homeButton.querySelector('span');
    expect(tooltip).toHaveTextContent('Home');
    expect(tooltip).toHaveClass('opacity-0', 'group-hover:opacity-100');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const projectsButton = screen.getByLabelText('Go to Projects');
    
    // Focus and press Enter
    projectsButton.focus();
    await user.keyboard('{Enter}');

    expect(mockScrollToSection).toHaveBeenCalledWith(3);
  });

  it('should handle all section navigation correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const sections = ['Home', 'About', 'Experience', 'Projects', 'Code'];
    
    for (let i = 0; i < sections.length; i++) {
      const button = screen.getByLabelText(`Go to ${sections[i]}`);
      await user.click(button);
      expect(mockScrollToSection).toHaveBeenCalledWith(i);
    }

    expect(mockScrollToSection).toHaveBeenCalledTimes(5);
  });

  it('should have proper ARIA attributes', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation', { name: /section navigation/i });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Section navigation');
  });

  it('should have focus ring styles', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const homeButton = screen.getByLabelText('Go to Home');
    expect(homeButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('should be hidden on mobile screens', () => {
    render(
      <DesktopNav
        activeSection={0}
        scrollToSection={mockScrollToSection}
        darkMode={true}
      />
    );

    const nav = screen.getByRole('navigation', { name: /section navigation/i });
    expect(nav).toHaveClass('hidden', 'md:flex');
  });
});
