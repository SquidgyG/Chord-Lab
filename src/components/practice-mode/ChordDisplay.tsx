import React, { Suspense, lazy } from 'react';
import type { ChordOption } from '../../types';
import { getChordTheme } from '../../utils/diagramTheme';
import DiagramSizeControl from '../controls/DiagramSizeControl';
import '../controls/DiagramSizeControl.css';

// Lazy load heavy chord diagram components
const GuitarChordDiagram = lazy(() => import('./GuitarChordDiagram'));
const PianoChordDiagram = lazy(() => import('./PianoChordDiagram'));

interface ChordDisplayProps {
  chord: ChordOption;
  color: string;
  instrument: 'guitar' | 'piano';
}

// Helper function to get chord quality
const getChordQuality = (chordName: string): string => {
  if (chordName.includes('m') && !chordName.includes('maj')) {
    return 'Minor';
  } else if (chordName.includes('maj7')) {
    return 'Major 7th';
  } else if (chordName.includes('m7')) {
    return 'Minor 7th';
  } else if (chordName.includes('7')) {
    return 'Dominant 7th';
  } else if (chordName.length === 1 || (chordName.length === 2 && chordName.includes('#'))) {
    return 'Major';
  }
  return '';
};

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chord, color, instrument }) => {
  if (!chord) {
    return <div className="chord-display-empty">No chord selected</div>;
  }

  try {
    const theme = getChordTheme(chord.name);
    const chordQuality = getChordQuality(chord.name);
    const notes = chord.notes;
    
    return (
      <div className="flex flex-col items-center justify-center space-y-4 chord-display">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-800" data-testid="current-chord-name">
            {chord.name}
          </div>
          {chordQuality && (
            <div className="text-xl font-medium text-gray-600 mt-1">
              {chordQuality}
            </div>
          )}
        </div>

        {/* Size control for diagrams */}
        <DiagramSizeControl className="mb-4" />

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse">
              <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        }>
          {instrument === 'guitar' ? (
            <GuitarChordDiagram 
              chord={chord} 
              rootNoteColor={color}
            />
          ) : (
            <PianoChordDiagram
              notes={notes}
              chordName={chord.name}
              color={theme.primary}
            />
          )}
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error rendering chord diagram:', error);
    return (
      <div className="chord-display-error">
        Error displaying chord diagram
      </div>
    );
  }
};

export default ChordDisplay;
