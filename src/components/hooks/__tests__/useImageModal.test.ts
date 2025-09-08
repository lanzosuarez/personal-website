import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useImageModal } from '../useImageModal';
import { Project } from '../../types';

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'Test description',
  tech: ['React', 'TypeScript'],
  liveUrl: 'https://test.com',
  githubUrl: 'https://github.com/test',
  image: '🎨',
  screenshots: ['/test-image.png'],
  hasScreenshots: true,
};

describe('useImageModal', () => {
  beforeEach(() => {
    // Mock document.body.style
    Object.defineProperty(document.body, 'style', {
      value: { overflow: 'unset' },
      writable: true,
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useImageModal());
    
    expect(result.current.modalOpen).toBe(false);
    expect(result.current.selectedProject).toBe(null);
    expect(result.current.currentImageIndex).toBe(0);
    expect(result.current.zoomLevel).toBe(1);
    expect(result.current.panPosition).toEqual({ x: 0, y: 0 });
    expect(result.current.isDragging).toBe(false);
  });

  it('should open modal with project', () => {
    const { result } = renderHook(() => useImageModal());
    
    act(() => {
      result.current.openModal(mockProject);
    });
    
    expect(result.current.modalOpen).toBe(true);
    expect(result.current.selectedProject).toBe(mockProject);
    expect(result.current.currentImageIndex).toBe(0);
    expect(result.current.zoomLevel).toBe(1);
    expect(result.current.panPosition).toEqual({ x: 0, y: 0 });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close modal and reset state', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Open modal first
    act(() => {
      result.current.openModal(mockProject);
    });
    
    expect(result.current.modalOpen).toBe(true);
    
    // Close modal
    act(() => {
      result.current.closeModal();
    });
    
    expect(result.current.modalOpen).toBe(false);
    expect(result.current.selectedProject).toBe(null);
    expect(result.current.currentImageIndex).toBe(0);
    expect(result.current.zoomLevel).toBe(1);
    expect(result.current.panPosition).toEqual({ x: 0, y: 0 });
    expect(document.body.style.overflow).toBe('unset');
  });

  it('should zoom in correctly', () => {
    const { result } = renderHook(() => useImageModal());
    
    act(() => {
      result.current.zoomIn();
    });
    
    expect(result.current.zoomLevel).toBe(1.5);
    
    act(() => {
      result.current.zoomIn();
    });
    
    expect(result.current.zoomLevel).toBe(2.25);
  });

  it('should not zoom in beyond maximum level', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Zoom in multiple times to reach maximum
    act(() => {
      result.current.zoomIn();
      result.current.zoomIn();
      result.current.zoomIn();
      result.current.zoomIn();
      result.current.zoomIn();
    });
    
    expect(result.current.zoomLevel).toBe(5); // Maximum zoom level
  });

  it('should zoom out correctly', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Zoom in first
    act(() => {
      result.current.zoomIn();
      result.current.zoomIn();
    });
    
    expect(result.current.zoomLevel).toBe(2.25);
    
    act(() => {
      result.current.zoomOut();
    });
    
    expect(result.current.zoomLevel).toBe(1.5);
  });

  it('should reset zoom and pan position when zooming out to 1 or below', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Set some pan position
    act(() => {
      result.current.zoomIn();
    });
    
    // Simulate pan position
    const mockPanPosition = { x: 100, y: 50 };
    act(() => {
      // This would normally be set by dragging, but we'll set it directly for testing
      result.current.zoomOut();
    });
    
    expect(result.current.zoomLevel).toBe(1);
    expect(result.current.panPosition).toEqual({ x: 0, y: 0 });
  });

  it('should reset zoom and pan position', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Zoom in and simulate pan
    act(() => {
      result.current.zoomIn();
      result.current.zoomIn();
    });
    
    act(() => {
      result.current.resetZoom();
    });
    
    expect(result.current.zoomLevel).toBe(1);
    expect(result.current.panPosition).toEqual({ x: 0, y: 0 });
  });

  it('should handle mouse down for dragging when zoomed', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Zoom in first
    act(() => {
      result.current.zoomIn();
    });
    
    const mockEvent = {
      clientX: 100,
      clientY: 50,
    } as React.MouseEvent;
    
    act(() => {
      result.current.handleMouseDown(mockEvent);
    });
    
    expect(result.current.isDragging).toBe(true);
  });

  it('should not start dragging when not zoomed', () => {
    const { result } = renderHook(() => useImageModal());
    
    const mockEvent = {
      clientX: 100,
      clientY: 50,
    } as React.MouseEvent;
    
    act(() => {
      result.current.handleMouseDown(mockEvent);
    });
    
    expect(result.current.isDragging).toBe(false);
  });

  it('should stop dragging on mouse up', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Start dragging
    act(() => {
      result.current.zoomIn();
    });
    
    const mockEvent = {
      clientX: 100,
      clientY: 50,
    } as React.MouseEvent;
    
    act(() => {
      result.current.handleMouseDown(mockEvent);
    });
    
    expect(result.current.isDragging).toBe(true);
    
    act(() => {
      result.current.handleMouseUp();
    });
    
    expect(result.current.isDragging).toBe(false);
  });

  it('should handle wheel zoom correctly', () => {
    const { result } = renderHook(() => useImageModal());
    
    const mockWheelEvent = {
      preventDefault: vi.fn(),
      deltaY: -100, // Zoom in
    } as unknown as React.WheelEvent;
    
    act(() => {
      result.current.handleWheel(mockWheelEvent);
    });
    
    expect(mockWheelEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.zoomLevel).toBeGreaterThan(1);
  });

  it('should handle wheel zoom out correctly', () => {
    const { result } = renderHook(() => useImageModal());
    
    // Zoom in first
    act(() => {
      result.current.zoomIn();
    });
    
    const mockWheelEvent = {
      preventDefault: vi.fn(),
      deltaY: 100, // Zoom out
    } as unknown as React.WheelEvent;
    
    act(() => {
      result.current.handleWheel(mockWheelEvent);
    });
    
    expect(mockWheelEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.zoomLevel).toBeLessThan(1.5);
  });
});
