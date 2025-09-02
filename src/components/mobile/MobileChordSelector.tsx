import React, { useState, useRef, useEffect } from 'react';
import TouchGestureHandler from './TouchGestureHandler';
import type { Chord } from '../../data/chords';

interface MobileChordSelectorProps {
  chords: Chord[];
  currentChord: Chord | null;
  onChordChange: (chord: Chord) => void;
  className?: string;
}

const MobileChordSelector: React.FC<MobileChordSelectorProps> = ({
  chords,
  currentChord,
  onChordChange,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredChords = chords.filter(chord =>
    chord.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentIndex = currentChord ? chords.findIndex(c => c.name === currentChord.name) : -1;

  const handlePreviousChord = () => {
    if (currentIndex > 0) {
      onChordChange(chords[currentIndex - 1]);
    } else if (chords.length > 0) {
      onChordChange(chords[chords.length - 1]); // Wrap to last
    }
  };

  const handleNextChord = () => {
    if (currentIndex < chords.length - 1) {
      onChordChange(chords[currentIndex + 1]);
    } else if (chords.length > 0) {
      onChordChange(chords[0]); // Wrap to first
    }
  };

  const handleRandomChord = () => {
    if (chords.length > 1) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * chords.length);
      } while (randomIndex === currentIndex && chords.length > 1);
      onChordChange(chords[randomIndex]);
    }
  };

  // Auto-scroll to current chord in expanded view
  useEffect(() => {
    if (isExpanded && currentChord && scrollRef.current) {
      const currentElement = scrollRef.current.querySelector(`[data-chord="${currentChord.name}"]`);
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isExpanded, currentChord]);

  return (
    <div className={`mobile-chord-selector ${className}`}>
      {/* Compact header with current chord */}
      <TouchGestureHandler
        onSwipeLeft={handleNextChord}
        onSwipeRight={handlePreviousChord}
        onTap={() => setIsExpanded(!isExpanded)}
        onDoubleTap={handleRandomChord}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-8 rounded"
              style={{ backgroundColor: currentChord?.color || '#gray' }}
            ></div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentChord?.name || 'Select Chord'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tap to expand • Swipe to change • Double-tap for random
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousChord}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 touch-manipulation"
              aria-label="Previous chord"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextChord}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 touch-manipulation"
              aria-label="Next chord"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 touch-manipulation"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <svg 
                className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </TouchGestureHandler>

      {/* Expanded chord grid */}
      {isExpanded && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search chords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 touch-manipulation"
            />
          </div>

          {/* Chord grid */}
          <div 
            ref={scrollRef}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto"
          >
            {filteredChords.map((chord) => (
              <TouchGestureHandler
                key={chord.name}
                onTap={() => {
                  onChordChange(chord);
                  setIsExpanded(false);
                }}
              >
                <button
                  data-chord={chord.name}
                  className={`p-3 rounded-lg text-center font-semibold transition-all touch-manipulation ${
                    currentChord?.name === chord.name
                      ? 'ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                  style={{
                    minHeight: '60px',
                    borderLeft: `4px solid ${chord.color}`,
                  }}
                >
                  <div className="text-lg font-bold">{chord.name}</div>
                  {chord.level && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Level {chord.level}
                    </div>
                  )}
                </button>
              </TouchGestureHandler>
            ))}
          </div>

          {filteredChords.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No chords found for "{searchQuery}"
            </div>
          )}

          {/* Quick actions */}
          <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={handleRandomChord}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 touch-manipulation"
            >
              🎲 Random
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 touch-manipulation"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileChordSelector;