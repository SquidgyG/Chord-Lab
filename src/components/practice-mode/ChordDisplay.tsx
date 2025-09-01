import React from 'react';
import GuitarChordDiagram from './GuitarChordDiagram';
import PianoChordDiagram from './PianoChordDiagram';
import type { Chord } from '../../data/chords';
import { getChordTheme } from '../../utils/diagramTheme';

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

        {instrument === 'guitar' ? (
<<<<<<< HEAD
          <GuitarChordDiagram positions={chord.guitarPositions} color={theme.primary} />
=======
          <GuitarChordDiagram positions={chord.guitarPositions} color={chord.color} />
>>>>>>> b483546b3a9c8b1cf18daade3e61ed45fef82514
        ) : (
          <PianoChordDiagram
            notes={chord.pianoNotes}
            chordName={chord.name}
            color={theme.primary}
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
