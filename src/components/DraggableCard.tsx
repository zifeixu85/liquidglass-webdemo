import { useState, useRef, useEffect } from 'react';

interface DraggableCardProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number | string; height: number | string };
  className?: string;
  id?: string;
  onInteraction?: (id: string) => void;
  zIndex?: number;
}

export function DraggableCard({ children, initialPosition = { x: 0, y: 0 }, initialSize = { width: 600, height: 'auto' }, className = '', id = '', onInteraction, zIndex = 1 }: DraggableCardProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));

        setDragStart({ x: e.clientX, y: e.clientY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        const newWidth = Math.max(300, resizeStart.width + deltaX);
        const newHeight = Math.max(200, resizeStart.height + deltaY);

        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Disable dragging on mobile
    if (isMobile) return;

    // Prevent dragging if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }

    // Bring this card to front
    if (onInteraction && id) {
      onInteraction(id);
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    // Don't prevent default to allow mouse events to bubble up for background effects
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag
    
    // Disable resizing on mobile
    if (isMobile) return;

    // Bring this card to front
    if (onInteraction && id) {
      onInteraction(id);
    }

    setIsResizing(true);
    setResizeStart({ 
      x: e.clientX, 
      y: e.clientY, 
      width: typeof size.width === 'number' ? size.width : cardRef.current?.offsetWidth || 600,
      height: typeof size.height === 'number' ? size.height : cardRef.current?.offsetHeight || 200
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${className} draggable ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} select-none relative`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: typeof size.width === 'number' ? `${size.width}px` : size.width,
        height: typeof size.height === 'number' ? `${size.height}px` : size.height,
        transition: (isDragging || isResizing) ? 'none' : 'transform 0.2s ease-out',
        zIndex: (isDragging || isResizing) ? 50 : zIndex,
        cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'grab'),
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
      
      {/* Resize handle in bottom-right corner - hide on mobile */}
      {!isMobile && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%)',
            borderBottomRightRadius: 'inherit'
          }}
          onMouseDown={handleResizeMouseDown}
          title="Drag to resize"
        />
      )}
    </div>
  );
}