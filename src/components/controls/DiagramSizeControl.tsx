import React, { useState, useEffect } from 'react';

interface DiagramSizeControlProps {
  onSizeChange?: (size: string) => void;
  className?: string;
}

type DiagramSize = 'small' | 'medium' | 'large' | 'auto';

const DiagramSizeControl: React.FC<DiagramSizeControlProps> = ({
  onSizeChange,
  className = '',
}) => {
  const [selectedSize, setSelectedSize] = useState<DiagramSize>('auto');

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('diagram-size-preference');
    if (saved && ['small', 'medium', 'large', 'auto'].includes(saved)) {
      setSelectedSize(saved as DiagramSize);
    }
  }, []);

  // Apply size changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing size classes
    root.classList.remove('diagram-size-small', 'diagram-size-medium', 'diagram-size-large');
    
    if (selectedSize !== 'auto') {
      root.classList.add(`diagram-size-${selectedSize}`);
    }

    // Save preference
    localStorage.setItem('diagram-size-preference', selectedSize);
    
    onSizeChange?.(selectedSize);
  }, [selectedSize, onSizeChange]);

  const sizeOptions = [
    { value: 'small' as const, label: 'Small', icon: '📱' },
    { value: 'medium' as const, label: 'Medium', icon: '💻' },
    { value: 'large' as const, label: 'Large', icon: '🖥️' },
    { value: 'auto' as const, label: 'Auto', icon: '🔄' },
  ];

  return (
    <div className={`diagram-size-control ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Diagram Size:
        </span>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          {sizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedSize(option.value)}
              className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1 ${
                selectedSize === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              title={`Set diagram size to ${option.label}`}
            >
              <span className="text-xs">{option.icon}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Size preview indicator */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {selectedSize === 'auto' && 'Automatically adjusts to screen size'}
        {selectedSize === 'small' && 'Compact view for mobile devices'}
        {selectedSize === 'medium' && 'Balanced size for tablets'}
        {selectedSize === 'large' && 'Full size for large screens'}
      </div>
    </div>
  );
};

export default DiagramSizeControl;