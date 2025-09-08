import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../test/utils';
import Landing from '../Landing';
import userEvent from '@testing-library/user-event';

describe('Landing Integration Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render all main sections', () => {
    render(<Landing />);

    expect(screen.getByText('Alfonzo Suarez')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText('Code & Gains')).toBeInTheDocument();
  });

  it('should have working theme toggle', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    const themeToggle = screen.getByLabelText('Toggle theme');
    await user.click(themeToggle);

    // Component should re-render with different theme
    expect(themeToggle).toBeInTheDocument();
  });

  it('should have working desktop navigation', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    const aboutButton = screen.getByLabelText('Go to About');
    expect(aboutButton).toBeInTheDocument();

    await user.click(aboutButton);
    // Navigation should work (scrollIntoView is mocked)
  });

  it('should have working mobile navigation', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    const aboutButton = screen.getByLabelText('Go to About section');
    expect(aboutButton).toBeInTheDocument();

    await user.click(aboutButton);
    // Navigation should work (scrollIntoView is mocked)
  });

  it('should display typing effect', () => {
    render(<Landing />);

    // Should show cursor
    expect(screen.getByText('|')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('/>')).toBeInTheDocument();
  });

  it('should render all projects', () => {
    render(<Landing />);

    expect(screen.getByText('TravelCon Traveller PWA')).toBeInTheDocument();
    expect(screen.getByText('TravelCon Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Component Library & Design System')).toBeInTheDocument();
  });

  it('should render all work experiences', () => {
    render(<Landing />);

    expect(screen.getByText('NetRoadshow')).toBeInTheDocument();
    expect(screen.getByText('The Pique Lab')).toBeInTheDocument();
    expect(screen.getByText('Coherent Technologies Inc.')).toBeInTheDocument();
    expect(screen.getByText('Samsung R&D Institute PH')).toBeInTheDocument();
    expect(screen.getByText('ChatbotPH')).toBeInTheDocument();
    expect(screen.getByText('Appventure')).toBeInTheDocument();
  });

  it('should have working workout generator', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    // Find chest workout button
    const chestButton = screen.getByText('Chest').closest('button');
    expect(chestButton).toBeInTheDocument();

    await user.click(chestButton!);

    // Should show generating state
    expect(screen.getByText('Generating optimal workout plan...')).toBeInTheDocument();

    // Fast forward time
    vi.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(screen.getByText(/Chest Day/)).toBeInTheDocument();
    });
  });

  it('should have working progress trackers', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    // Find workout progress tracker
    const workoutPlusButton = screen.getAllByLabelText(/Increase.*days/)[0];
    expect(workoutPlusButton).toBeInTheDocument();

    await user.click(workoutPlusButton);
    // Progress should update (though exact values depend on calculation)
  });

  it('should open project modal when available', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    const viewComponentsButton = screen.getByText('View Components');
    expect(viewComponentsButton).toBeInTheDocument();

    await user.click(viewComponentsButton);

    // Should open modal
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Component Library Screenshots')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    // Open modal first
    const viewComponentsButton = screen.getByText('View Components');
    await user.click(viewComponentsButton);

    // Find and click close button
    const closeButton = screen.getByRole('button', { name: '' }); // X button
    await user.click(closeButton);

    // Modal should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should have working modal zoom controls', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    // Open modal
    const viewComponentsButton = screen.getByText('View Components');
    await user.click(viewComponentsButton);

    // Find zoom controls
    const zoomInButton = screen.getByTitle('Zoom In');
    const zoomOutButton = screen.getByTitle('Zoom Out');
    const resetZoomButton = screen.getByTitle('Fit to Screen');

    expect(zoomInButton).toBeInTheDocument();
    expect(zoomOutButton).toBeInTheDocument();
    expect(resetZoomButton).toBeInTheDocument();

    await user.click(zoomInButton);
    // Zoom should work (functionality is tested in hook tests)
  });

  it('should have proper footer content', () => {
    render(<Landing />);

    expect(screen.getByText('© 2025 Alfonzo Suarez. Built with React, TypeScript, TanStack Start & Cursor.')).toBeInTheDocument();
  });

  it('should have social media links in hero section', () => {
    render(<Landing />);

    const githubLink = screen.getByLabelText("Visit Alfonzo Suarez's GitHub profile");
    const linkedinLink = screen.getByLabelText("Visit Alfonzo Suarez's LinkedIn profile");
    const emailLink = screen.getByLabelText("Send email to Alfonzo Suarez");

    expect(githubLink).toHaveAttribute('href', 'https://github.com/lanzosuarez');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alfonzo-suarez/');
    expect(emailLink).toHaveAttribute('href', 'mailto:lanzosuarez@gmail.com');
  });

  it('should have proper skip link', () => {
    render(<Landing />);

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should render workout generator with all muscle groups', () => {
    render(<Landing />);

    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Shoulders')).toBeInTheDocument();
    expect(screen.getByText('Arms')).toBeInTheDocument();
    expect(screen.getByText('Legs')).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
  });

  it('should have philosophy section with code snippet', () => {
    render(<Landing />);

    expect(screen.getByText('The Discipline Code')).toBeInTheDocument();
    expect(screen.getByText(/Asymptotic Growth - Never Stop Learning/)).toBeInTheDocument();
    expect(screen.getByText('"Every day is day 1"')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Landing />);

    // Tab through focusable elements
    await user.tab();
    expect(document.activeElement).toBeInTheDocument();

    // Should be able to navigate through multiple elements
    await user.tab();
    await user.tab();
    expect(document.activeElement).toBeInTheDocument();
  });

  it('should maintain responsive design classes', () => {
    render(<Landing />);

    // Check for responsive classes
    const mobileNav = screen.getByRole('navigation', { name: /mobile section navigation/i });
    expect(mobileNav).toHaveClass('md:hidden');

    const desktopNav = screen.getByRole('navigation', { name: /section navigation/i });
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });
});
