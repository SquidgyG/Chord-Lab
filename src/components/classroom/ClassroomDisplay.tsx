import React from 'react'
import type { ChordOption } from '../../types';
import GuitarChordDiagram from '../practice-mode/GuitarChordDiagram';
import PianoDiagram from '../diagrams/PianoDiagram'

interface ClassroomDisplayProps {
  displayedChords: ChordOption[];
  instrument: 'guitar' | 'piano';
  rootNoteColor: string;
}

const ClassroomDisplay: React.FC<ClassroomDisplayProps> = ({ displayedChords, instrument, rootNoteColor }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2`}>
      {displayedChords.map((chord, index) => {
        return (
          <div
            key={index}
            className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-center"
          >
            {instrument === 'guitar' ? (
              <GuitarChordDiagram chord={chord} rootNoteColor={rootNoteColor} />
            ) : (
              <PianoDiagram chord={chord} rootNoteColor={rootNoteColor} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ClassroomDisplay
