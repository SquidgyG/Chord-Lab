import React, { useRef } from 'react';

interface TouchGestureHandlerProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  children: React.ReactNode;
  className?: string;
}

interface TouchPosition {
  x: number;
  y: number;
  timestamp: number;
}

const TouchGestureHandler: React.FC<TouchGestureHandlerProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  children,
  className = '',
}) => {
  const touchStart = useRef<TouchPosition | null>(null);
  const lastTap = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const touchEnd = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    const deltaX = touchEnd.x - touchStart.current.x;
    const deltaY = touchEnd.y - touchStart.current.y;
    const deltaTime = touchEnd.timestamp - touchStart.current.timestamp;
    
    const minSwipeDistance = 50;
    const maxSwipeTime = 500;

    // Check for swipe gestures
    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (deltaTime < maxSwipeTime) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 300) {
      // Tap gesture
      const now = Date.now();
      const timeSinceLastTap = now - lastTap.current;
      
      if (timeSinceLastTap < 300 && onDoubleTap) {
        // Double tap
        onDoubleTap();
        lastTap.current = 0; // Reset to prevent triple tap
      } else {
        // Single tap
        lastTap.current = now;
        setTimeout(() => {
          if (lastTap.current === now && onTap) {
            onTap();
          }
        }, 300);
      }
    }

    touchStart.current = null;
  };

  // Add haptic feedback for supported devices (currently unused but available for future use)
  // const triggerHapticFeedback = () => {
  //   if ('vibrate' in navigator) {
  //     navigator.vibrate(10); // Short vibration
  //   }
  // };

  return (
    <div
      ref={elementRef}
      className={`touch-gesture-handler ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: 'manipulation', // Optimize for touch
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default TouchGestureHandler;