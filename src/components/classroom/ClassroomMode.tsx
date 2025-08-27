import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getDiatonicChords } from '../../utils/music-theory'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'
import ClassroomDisplay from '../classroom/ClassroomDisplay'

const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const progressions = ['I–V–vi–IV', 'vi–IV–I–V', 'ii–V–I', 'I–vi–IV–V']
const numeralMap: Record<string, number> = {
  I: 0,
  ii: 1,
  iii: 2,
  IV: 3,
  V: 4,
  vi: 5,
  vii: 6,
}

interface ChordDefinition {
  notes: string[];
  guitarPositions: { string: number; fret: number }[];
}

const chordData: Record<string, ChordDefinition> = {
  C: { notes: ['C4', 'E4', 'G4'], guitarPositions: [{ string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 }] },
  G: { notes: ['G3', 'B3', 'D4'], guitarPositions: [{ string: 1, fret: 3 }, { string: 5, fret: 2 }, { string: 6, fret: 3 }] },
  Am: { notes: ['A3', 'C4', 'E4'], guitarPositions: [{ string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 }] },
  F: { notes: ['F3', 'A3', 'C4'], guitarPositions: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 }] },
  D: { notes: ['D4', 'F#4', 'A4'], guitarPositions: [{ string: 1, fret: 2 }, { string: 2, fret: 3 }, { string: 3, fret: 2 }] },
  Em: { notes: ['E3', 'G3', 'B3'], guitarPositions: [{ string: 4, fret: 2 }, { string: 5, fret: 2 }] },
  // Add other chords as needed
};

const ClassroomMode: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('C')
  const [selectedProgression, setSelectedProgression] = useState('I–V–vi–IV')
  const [instrument, setInstrument] = useState<'guitar' | 'piano'>('guitar')
  const [displayedChords, setDisplayedChords] = useState<string[]>([])

  const generatedChords = useMemo(() => {
    const diatonic = getDiatonicChords(selectedKey)
    if (diatonic.length === 0) return []

    const romanNumerals = selectedProgression.split('–')
    return romanNumerals.map(numeral => {
      const index = numeralMap[numeral]
      return diatonic[index]
    })
  }, [selectedKey, selectedProgression])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-end mb-4">
        <Link
          to="/classroom/games"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Games Dashboard
        </Link>
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Creator Mode</h3>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label
            htmlFor="key-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Key
          </label>
          <select
            id="key-select"
            value={selectedKey}
            onChange={e => setSelectedKey(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            {keys.map(key => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="progression-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Progression
          </label>
          <select
            id="progression-select"
            value={selectedProgression}
            onChange={e => setSelectedProgression(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            {progressions.map(prog => (
              <option key={prog}>{prog}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button onClick={() => setInstrument('guitar')} className={`px-3 py-1 text-sm rounded-md ${instrument === 'guitar' ? 'bg-white dark:bg-gray-900' : ''}`}>Guitar</button>
            <button onClick={() => setInstrument('piano')} className={`px-3 py-1 text-sm rounded-md ${instrument === 'piano' ? 'bg-white dark:bg-gray-900' : ''}`}>Piano</button>
          </div>
        </div>
        <div>
          <button
            onClick={() => setDisplayedChords(prev => [...prev, ...generatedChords])}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Display
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-bold text-gray-700 dark:text-gray-200">Generated Progression:</h4>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2`}>
          {generatedChords.map((chord, index) => {
            const data = chordData[chord] ?? { notes: [], guitarPositions: [] };
            return (
              <div
                key={index}
                className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center"
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
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-gray-700 dark:text-gray-200">Displayed Chords:</h4>
          <button
            onClick={() => setDisplayedChords([])}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
        </div>
        <ClassroomDisplay displayedChords={displayedChords} instrument={instrument} chordData={chordData} />
      </div>
    </div>
  )
}

export default ClassroomMode
