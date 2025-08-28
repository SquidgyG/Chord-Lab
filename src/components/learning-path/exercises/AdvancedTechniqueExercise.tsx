import React, { useState } from 'react'
import PianoDiagram from '../../diagrams/PianoDiagram'
import { chords } from '../../../data/chords'

const AdvancedTechniqueExercise: React.FC = () => {
  const progression: (keyof typeof chords)[] = ['C', 'G', 'Am', 'F']
  const [inversions, setInversions] = useState<Record<string, 0 | 1 | 2>>({
    C: 0,
    G: 0,
    Am: 0,
    F: 0,
  });

  const handleInversionChange = (chord: string, inversion: 0 | 1 | 2) => {
    setInversions((prev) => ({ ...prev, [chord]: inversion }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Advanced Technique: Inversions
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {progression.map(chord => (
          <div key={chord}>
            <PianoDiagram
              chordName={chord}
              notes={chords[chord].pianoNotes}
              inversion={inversions[chord]}
            />
            <div className="mt-2 flex justify-center space-x-2">
              {[0, 1, 2].map((inv) => (
                <button
                  key={inv}
                  onClick={() => handleInversionChange(chord, inv as 0 | 1 | 2)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    inversions[chord] === inv
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {inv === 0 ? 'Root' : `Inv ${inv}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Practice playing the progression with different inversions for smoother voice leading.
      </p>
    </div>
  );
};

export default AdvancedTechniqueExercise;
