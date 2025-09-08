import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/utils';
import { ThemeToggle } from '../ThemeToggle';
import userEvent from '@testing-library/user-event';

describe('ThemeToggle', () => {
  it('should render with dark mode enabled', () => {
    render(<ThemeToggle darkMode={true} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    
    // Should show Sun icon when in dark mode
    const sunIcon = screen.getByRole('button').querySelector('svg');
    expect(sunIcon).toHaveClass('lucide-sun');
  });

  it('should render with light mode enabled', () => {
    render(<ThemeToggle darkMode={false} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    
    // Should show Moon icon when in light mode
    const moonIcon = screen.getByRole('button').querySelector('svg');
    expect(moonIcon).toHaveClass('lucide-moon');
  });

  it('should call setDarkMode when clicked', async () => {
    const user = userEvent.setup();
    const mockSetDarkMode = vi.fn();
    
    render(<ThemeToggle darkMode={true} setDarkMode={mockSetDarkMode} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(false);
  });

  it('should toggle from light to dark mode', async () => {
    const user = userEvent.setup();
    const mockSetDarkMode = vi.fn();
    
    render(<ThemeToggle darkMode={false} setDarkMode={mockSetDarkMode} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it('should have proper accessibility attributes', () => {
    render(<ThemeToggle darkMode={true} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('should have focus styles', () => {
    render(<ThemeToggle darkMode={true} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('should apply dark mode styles correctly', () => {
    render(<ThemeToggle darkMode={true} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('bg-gray-800/20', 'hover:bg-gray-800/30');
  });

  it('should apply light mode styles correctly', () => {
    render(<ThemeToggle darkMode={false} setDarkMode={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('bg-gray-200/80', 'hover:bg-gray-300/80');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    const mockSetDarkMode = vi.fn();
    
    render(<ThemeToggle darkMode={true} setDarkMode={mockSetDarkMode} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Focus and press Enter
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(false);
  });

  it('should be keyboard accessible with Space key', async () => {
    const user = userEvent.setup();
    const mockSetDarkMode = vi.fn();
    
    render(<ThemeToggle darkMode={true} setDarkMode={mockSetDarkMode} />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Focus and press Space
    button.focus();
    await user.keyboard(' ');
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(false);
  });
});
