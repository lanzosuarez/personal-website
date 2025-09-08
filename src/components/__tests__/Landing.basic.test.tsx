import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import Landing from '../Landing';

describe('Landing Component - Basic Tests', () => {
  it('should render main sections', () => {
    render(<Landing />);

    // Check main headings are present
    expect(screen.getByText('Alfonzo Suarez')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText(/Code & Gains/)).toBeInTheDocument();
  });

  it('should have proper navigation structure', () => {
    render(<Landing />);

    // Check navigation elements exist
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');

    // Check theme toggle exists
    const themeToggle = screen.getByLabelText('Toggle theme');
    expect(themeToggle).toBeInTheDocument();
  });

  it('should display social media links', () => {
    render(<Landing />);

    const githubLink = screen.getByLabelText("Visit Alfonzo Suarez's GitHub profile");
    const linkedinLink = screen.getByLabelText("Visit Alfonzo Suarez's LinkedIn profile");
    const emailLink = screen.getByLabelText("Send email to Alfonzo Suarez");

    expect(githubLink).toHaveAttribute('href', 'https://github.com/lanzosuarez');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alfonzo-suarez/');
    expect(emailLink).toHaveAttribute('href', 'mailto:lanzosuarez@gmail.com');
  });

  it('should render all projects', () => {
    render(<Landing />);

    expect(screen.getByText('Personal Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('TravelCon Traveller PWA')).toBeInTheDocument();
    expect(screen.getByText('TravelCon Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Component Library & Design System')).toBeInTheDocument();
  });

  it('should render work experience', () => {
    render(<Landing />);

    expect(screen.getByText('NetRoadshow')).toBeInTheDocument();
    expect(screen.getByText('Development Lead')).toBeInTheDocument();
    expect(screen.getByText('Samsung R&D Institute PH')).toBeInTheDocument();
  });

  it('should have proper footer', () => {
    render(<Landing />);

    expect(screen.getByText('© 2025 Alfonzo Suarez. Built with React, TypeScript, TanStack Start & Cursor.')).toBeInTheDocument();
  });

  it('should have workout generator section', () => {
    render(<Landing />);

    expect(screen.getByText('Training Plan Generator')).toBeInTheDocument();
    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Shoulders')).toBeInTheDocument();
  });

  it('should have progress tracking section', () => {
    render(<Landing />);

    expect(screen.getByText('Bodybuilding Journey')).toBeInTheDocument();
    expect(screen.getByText('Coding Journey')).toBeInTheDocument();
  });
});
