import React from 'react';
import GuitarChordDiagram from './GuitarChordDiagram';
import PianoChordDiagram from './PianoChordDiagram';
import type { Chord } from '../../data/chords';

interface ChordDisplayProps {
  chord: Chord | null;
  instrument: 'guitar' | 'piano';
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chord, instrument }) => {
  if (!chord) {
    return <div className="chord-display-empty">No chord selected</div>;
  }

  try {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 chord-display">
        <div className="text-5xl font-bold text-gray-800" data-testid="current-chord-name">
          {chord.name}
        </div>
        
        {instrument === 'guitar' ? (
          <GuitarChordDiagram positions={chord.guitarPositions} />
        ) : (
          <PianoChordDiagram 
            notes={chord.pianoNotes} 
            chordName={chord.name}
          />
        )}
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
