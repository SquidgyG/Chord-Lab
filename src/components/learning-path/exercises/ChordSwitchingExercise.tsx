import React, { useState, useEffect } from 'react'
import useMetronome from '../../../hooks/useMetronome'
import GuitarDiagram from '../../diagrams/GuitarDiagram'

type ChordName = 'C' | 'F' | 'G' | 'Am' | 'D' | 'Em'
interface ChordData {
  name: ChordName
  guitarPositions: { string: number; fret: number; finger: number }[]
}

const chords: Record<ChordName, ChordData> = {
  C: {
    name: 'C',
    guitarPositions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 3 },
    ],
  },
  F: {
    name: 'F',
    guitarPositions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 3, finger: 3 },
    ],
  },
  G: {
    name: 'G',
    guitarPositions: [
      { string: 1, fret: 3, finger: 3 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 4 },
    ],
  },
  Am: {
    name: 'Am',
    guitarPositions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
  },
  D: {
    name: 'D',
    guitarPositions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 1 },
    ],
  },
  Em: {
    name: 'Em',
    guitarPositions: [
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
    ],
  },
}

interface ChordSwitchingExerciseProps {
  progression: ChordName[]
}

const ChordSwitchingExercise: React.FC<ChordSwitchingExerciseProps> = ({ progression }) => {
  const [{ isPlaying, bpm, beat }, { start, stop, setBpm }] = useMetronome(70, 4)
  const [progressionIndex, setProgressionIndex] = useState(0)

  const currentChord = progression[progressionIndex]

  useEffect(() => {
    if (isPlaying) {
      // Switch chord every 4 beats (1 measure)
      if (beat === 0) {
        setProgressionIndex(prev => (prev + 1) % progression.length)
      }
    }
  }, [beat, isPlaying, progression.length])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Chord Switching: {progression.join(' - ')}
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tempo: {bpm} BPM
          </label>
          <input
            type="range"
            min="40"
            max="120"
            value={bpm}
            onChange={e => setBpm(parseInt(e.target.value))}
            className="w-32"
            disabled={isPlaying}
          />
        </div>
        <button
          onClick={isPlaying ? stop : start}
          className={`px-4 py-2 rounded-lg text-white font-bold ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className={`grid grid-cols-${progression.length} gap-4`}>
        {progression.map(chordName => (
          <div
            key={chordName}
            className={`p-4 rounded-lg ${
              currentChord === chordName ? 'bg-blue-100 dark:bg-blue-900/50' : ''
            }`}
          >
            <GuitarDiagram
              chordName={chords[chordName].name}
              positions={chords[chordName].guitarPositions}
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Follow the highlighted chord and switch every measure.
      </p>
    </div>
  )
}

export default ChordSwitchingExercise
