import React, { Suspense, lazy } from 'react';
import type { Chord } from '../../data/chords';
import { getChordTheme } from '../../utils/diagramTheme';

// Lazy load heavy chord diagram components
const GuitarChordDiagram = lazy(() => import('./GuitarChordDiagram'));
const PianoChordDiagram = lazy(() => import('./PianoChordDiagram'));

interface ChordDisplayProps {
  chord: Chord | null;
  instrument: 'guitar' | 'piano';
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chord, instrument }) => {
  if (!chord) {
    return <div className="chord-display-empty">No chord selected</div>;
  }

  try {
    const theme = getChordTheme(chord.name);
    return (
      <div className="flex flex-col items-center justify-center space-y-4 chord-display">
        <div className="text-5xl font-bold text-gray-800" data-testid="current-chord-name">
          {chord.name}
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse">
              <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        }>
          {instrument === 'guitar' ? (
            <GuitarChordDiagram 
              positions={chord.guitarPositions} 
              chordName={chord.name} 
              color={chord.color}
            />
          ) : (
            <PianoChordDiagram
              notes={chord.pianoNotes}
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
