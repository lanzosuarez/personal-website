import { describe, it, expect } from 'vitest';
import { render } from '../../test/utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Landing from '../Landing';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Landing Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Landing />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Landing />);
    
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check that we have h2 headings for main sections
    const h2Headings = container.querySelectorAll('h2');
    expect(h2Headings.length).toBeGreaterThan(0);
  });

  it('should have skip to main content link', () => {
    const { container } = render(<Landing />);
    
    const skipLink = container.querySelector('a[href="#main-content"]');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveTextContent('Skip to main content');
  });

  it('should have proper landmark structure', () => {
    const { container } = render(<Landing />);
    
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
    
    const navs = container.querySelectorAll('nav');
    expect(navs.length).toBeGreaterThanOrEqual(2); // Desktop and mobile nav
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should have proper aria-labels for navigation', () => {
    const { container } = render(<Landing />);
    
    const desktopNav = container.querySelector('nav[aria-label="Section navigation"]');
    expect(desktopNav).toBeInTheDocument();
    
    const mobileNav = container.querySelector('nav[aria-label="Mobile section navigation"]');
    expect(mobileNav).toBeInTheDocument();
  });

  it('should have proper button accessibility', () => {
    const { container } = render(<Landing />);
    
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      // Each button should have accessible text
      const hasAriaLabel = button.hasAttribute('aria-label');
      const hasTextContent = button.textContent && button.textContent.trim().length > 0;
      const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
      
      expect(hasAriaLabel || hasTextContent || hasAriaLabelledBy).toBe(true);
    });
  });

  it('should have proper link accessibility', () => {
    const { container } = render(<Landing />);
    
    const externalLinks = container.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('should have proper focus management', () => {
    const { container } = render(<Landing />);
    
    const focusableElements = container.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      // Skip elements that are intentionally not focusable
      if (element.getAttribute('tabindex') === '-1') return;
      
      // Check for focus styles or focus ring
      const classList = Array.from(element.classList);
      const hasFocusStyles = classList.some(className => 
        className.includes('focus:') || className.includes('focus-')
      );
      
      expect(hasFocusStyles).toBe(true);
    });
  });

  it('should have proper color contrast', async () => {
    const { container } = render(<Landing />);
    
    // Run axe specifically for color contrast
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper image alt text', () => {
    const { container } = render(<Landing />);
    
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  it('should use semantic HTML elements', () => {
    const { container } = render(<Landing />);
    
    // Check for proper semantic structure
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelectorAll('section')).toHaveLength(5); // 5 main sections
  });

  it('should have proper ARIA attributes for interactive elements', () => {
    const { container } = render(<Landing />);
    
    // Check buttons have proper ARIA
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.hasAttribute('aria-expanded')) {
        expect(['true', 'false']).toContain(button.getAttribute('aria-expanded'));
      }
    });
  });

  it('should be keyboard navigable', () => {
    const { container } = render(<Landing />);
    
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea'
    );
    
    expect(interactiveElements.length).toBeGreaterThan(0);
    
    // All interactive elements should be focusable
    interactiveElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
      }
    });
  });
});
