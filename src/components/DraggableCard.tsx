import { useState, useRef, useEffect } from 'react';

interface DraggableCardProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
}

export function DraggableCard({ children, initialPosition = { x: 0, y: 0 }, className = '' }: DraggableCardProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    // Don't prevent default to allow mouse events to bubble up for background effects
  };

  return (
    <div
      ref={cardRef}
      className={`${className} draggable ${isDragging ? 'dragging' : ''} select-none`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        zIndex: isDragging ? 50 : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}