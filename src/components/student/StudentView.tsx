import React, { useState } from 'react';
import { ChordWheel } from './ChordWheel';
import GuitarChordDiagram from '../practice-mode/GuitarChordDiagram';
import PianoDiagram from '../diagrams/PianoDiagram';
import type { ChordOption } from '../../types';

export const StudentView: React.FC = () => {
  const [selectedChord, setSelectedChord] = useState<ChordOption | null>(null);
  const [instrument, setInstrument] = useState<'guitar' | 'piano'>('guitar');
  
  // Sample chord data - would normally come from a shared library
  const chords: ChordOption[] = [
    {
      name: 'C Major',
      positions: [
        { fret: 0, string: 1 },
        { fret: 1, string: 2 },
        { fret: 0, string: 3 },
        { fret: 2, string: 4 },
        { fret: 3, string: 5 },
        { fret: 0, string: 6, muted: true }
      ],
      notes: ['C', 'E', 'G']
    },
    {
      name: 'G Major',
      positions: [
        { fret: 3, string: 1 },
        { fret: 0, string: 2 },
        { fret: 0, string: 3 },
        { fret: 0, string: 4 },
        { fret: 2, string: 5 },
        { fret: 3, string: 6 }
      ],
      notes: ['G', 'B', 'D']
    }
  ];

  return (
    <div className="student-view">
      <ChordWheel 
        chords={chords}
        selectedChord={selectedChord}
        onSelectChord={setSelectedChord}
        instrument={instrument}
        onSelectInstrument={setInstrument}
      />
      
      {selectedChord && (
        <div className="chord-display">
          {instrument === 'guitar' ? (
            <GuitarChordDiagram chord={selectedChord} />
          ) : (
            <PianoDiagram chord={selectedChord} />
          )}
        </div>
      )}
    </div>
  );
};
