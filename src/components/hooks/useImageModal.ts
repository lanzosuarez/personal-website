import React, { useState } from 'react';
import { Project, PanPosition } from '../types';

export const useImageModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState<PanPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<PanPosition>({ x: 0, y: 0 });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const zoomIn = () => {
    setZoomLevel(prev => {
      const newZoom = Math.min(prev * 1.5, 5);
      return newZoom;
    });
  };

  const zoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev / 1.5, 0.5);
      if (newZoom <= 1) {
        setPanPosition({ x: 0, y: 0 });
        return 1;
      }
      return newZoom;
    });
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    setZoomLevel(prev => {
      const newZoom = Math.max(0.5, Math.min(5, prev + delta * 0.2));
      if (newZoom <= 1) {
        setPanPosition({ x: 0, y: 0 });
        return 1;
      }
      return newZoom;
    });
  };

  return {
    modalOpen,
    selectedProject,
    currentImageIndex,
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
  };
};
