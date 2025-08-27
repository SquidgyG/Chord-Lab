import React from 'react'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'

interface ChordDefinition {
  notes: string[];
  guitarPositions: { string: number; fret: number; finger?: number }[];
}

interface ClassroomDisplayProps {
  displayedChords: string[];
  instrument: 'guitar' | 'piano';
  chordData: Record<string, ChordDefinition>;
}

const ClassroomDisplay: React.FC<ClassroomDisplayProps> = ({ displayedChords, instrument, chordData }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2`}>
      {displayedChords.map((chord, index) => {
        const data = chordData[chord] ?? { notes: [], guitarPositions: [] }
        return (
          <div
            key={index}
            className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-center"
          >
            {instrument === 'guitar' ? (
              <GuitarDiagram chordName={chord} positions={data.guitarPositions} />
            ) : (
              <PianoDiagram chordName={chord} notes={data.notes} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ClassroomDisplay
