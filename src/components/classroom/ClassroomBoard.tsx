import { useMemo, useState } from 'react'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'
import { useProgress } from '../../contexts/ProgressContext'
import { useClassroomMode } from '../../contexts/ClassroomModeContext'

// Shared basic chord data — keep small and readable for classroom demo
interface Chord {
  name: string
  guitarPositions: { string: number; fret: number }[]
  guitarFingers: number[]
  pianoNotes: string[]
}

const MAJORS_ORDER = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'] as const
const RELATIVE_MINORS: Record<string, string> = {
  C: 'Am', G: 'Em', D: 'Bm', A: 'F#m', E: 'C#m', B: 'G#m', 'F#': 'D#m', Db: 'Bbm', Ab: 'Fm', Eb: 'Cm', Bb: 'Gm', F: 'Dm'
}

function getDiatonicForKey(keyCenter: string) {
  const idx = (MAJORS_ORDER as readonly string[]).indexOf(keyCenter)
  if (idx === -1) return { majors: [] as string[], minors: [] as string[] }
  const I = MAJORS_ORDER[idx]
  const V = MAJORS_ORDER[(idx + 1) % 12]
  const IV = MAJORS_ORDER[(idx + 12 - 1) % 12]
  const majors = [I, IV, V]
  const minors = [RELATIVE_MINORS[I], RELATIVE_MINORS[V], RELATIVE_MINORS[IV]]
  return { majors, minors }
}

const chordData: Chord[] = [
  { name: 'C',  guitarPositions: [ { string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 } ], guitarFingers: [1,2,3], pianoNotes: ['C4','E4','G4'] },
  { name: 'G',  guitarPositions: [ { string: 1, fret: 3 }, { string: 2, fret: 0 }, { string: 5, fret: 2 }, { string: 6, fret: 3 } ], guitarFingers: [3,0,2,4], pianoNotes: ['G3','B3','D4'] },
  { name: 'F',  guitarPositions: [ { string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 } ], guitarFingers: [1,1,2,3], pianoNotes: ['F3','A3','C4'] },
  { name: 'Am', guitarPositions: [ { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 } ], guitarFingers: [1,2,3], pianoNotes: ['A3','C4','E4'] },
  { name: 'Em', guitarPositions: [ { string: 4, fret: 2 }, { string: 5, fret: 2 } ], guitarFingers: [2,3], pianoNotes: ['E3','G3','B3'] },
  { name: 'Dm', guitarPositions: [ { string: 1, fret: 1 }, { string: 2, fret: 3 }, { string: 3, fret: 2 } ], guitarFingers: [1,3,2], pianoNotes: ['D4','F4','A4'] },
]

const ClassroomBoard = () => {
  const { teacherUnlock } = useProgress()
  const { classroomMode } = useClassroomMode()

  const [showChordGrid, setShowChordGrid] = useState(true)
  const [showGuitar, setShowGuitar] = useState(true)
  const [showPiano, setShowPiano] = useState(false)

  const [keyCenter, setKeyCenter] = useState<string>('C')
  const [selectedChordName, setSelectedChordName] = useState<string>('C')
  const selectedChord = useMemo(() => chordData.find(c => c.name === selectedChordName) || chordData[0], [selectedChordName])

  const diatonicChips = useMemo(() => {
    const { majors, minors } = getDiatonicForKey(keyCenter)
    return [...majors, ...minors]
  }, [keyCenter])

  const panels = [
    showChordGrid ? 'grid' : null,
    showGuitar ? 'guitar' : null,
    showPiano ? 'piano' : null,
  ].filter(Boolean)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className={`${classroomMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800`}>Classroom Board</h2>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold border ${teacherUnlock ? 'bg-green-100 border-green-300 text-green-900' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
            {teacherUnlock ? 'Teacher Unlock: On' : 'Teacher Unlock: Off'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Panels</label>
          <button onClick={() => setShowChordGrid(s => !s)} className={`px-3 py-1 rounded border ${showChordGrid ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>Chord Grid</button>
          <button onClick={() => setShowGuitar(s => !s)} className={`px-3 py-1 rounded border ${showGuitar ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>Guitar</button>
          <button onClick={() => setShowPiano(s => !s)} className={`px-3 py-1 rounded border ${showPiano ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>Piano</button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Key</label>
          <select value={keyCenter} onChange={(e) => setKeyCenter(e.target.value)} className="px-2 py-1 border rounded">
            {(MAJORS_ORDER as readonly string[]).map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Chord</label>
          <select value={selectedChordName} onChange={(e) => setSelectedChordName(e.target.value)} className="px-2 py-1 border rounded">
            {chordData.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          {teacherUnlock && (
            <button onClick={() => { setShowGuitar(true); setShowPiano(true) }} className="px-3 py-1 rounded bg-emerald-500 text-white">Show Both</button>
          )}
        </div>
      </div>

      <div className={`grid gap-6 ${panels.length === 1 ? 'grid-cols-1' : panels.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {showChordGrid && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Chord Grid</h3>
              <span className="text-xs text-gray-500">Key: {keyCenter} major</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {diatonicChips.map(label => {
                const available = chordData.some(c => c.name === label)
                return (
                  <button
                    key={label}
                    onClick={() => available && setSelectedChordName(label)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold ${available ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 cursor-not-allowed'}`}
                    title={available ? `Select ${label}` : 'Diagram coming soon'}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600">Other chords</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {chordData.filter(c => !diatonicChips.includes(c.name)).map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedChordName(c.name)}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showGuitar && (
          <div className="flex justify-center">
            <GuitarDiagram chordName={selectedChord.name} positions={selectedChord.guitarPositions} fingers={selectedChord.guitarFingers} />
          </div>
        )}

        {showPiano && (
          <div className="flex justify-center">
            <PianoDiagram chordName={selectedChord.name} notes={selectedChord.pianoNotes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassroomBoard
