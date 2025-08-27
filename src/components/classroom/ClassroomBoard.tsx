import { useEffect, useMemo, useState } from 'react'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'
import { useProgress } from '../../contexts/ProgressContext'
import { useClassroomMode } from '../../contexts/ClassroomModeContext'
import { MAJORS_ORDER, getDiatonicForKey } from '../../utils/theory'
import { chordData } from '../../data/basicChords'

const ClassroomBoard = () => {
  const { teacherUnlock } = useProgress()
  const { classroomMode } = useClassroomMode()

  // Load initial UI state (panels, key, chord) from localStorage once
  type BoardState = { showChordGrid: boolean; showGuitar: boolean; showPiano: boolean; keyCenter: string; selectedChordName: string }
  const initialState = useMemo<BoardState>(() => {
    try {
      const raw = localStorage.getItem('classroom.board.state')
      if (raw) {
        const p = JSON.parse(raw) as Partial<BoardState>
        const validKey = typeof p.keyCenter === 'string' && (MAJORS_ORDER as readonly string[]).includes(p.keyCenter) ? p.keyCenter : 'C'
        const validChord = typeof p.selectedChordName === 'string' ? p.selectedChordName : 'C'
        return {
          showChordGrid: !!p.showChordGrid,
          showGuitar: p.showGuitar === undefined ? true : !!p.showGuitar,
          showPiano: !!p.showPiano,
          keyCenter: validKey,
          selectedChordName: validChord,
        }
      }
    } catch {
      // ignore localStorage read/parse errors
      void 0
    }
    return { showChordGrid: true, showGuitar: true, showPiano: false, keyCenter: 'C', selectedChordName: 'C' }
  }, [])

  const [showChordGrid, setShowChordGrid] = useState<boolean>(() => initialState.showChordGrid)
  const [showGuitar, setShowGuitar] = useState<boolean>(() => initialState.showGuitar)
  const [showPiano, setShowPiano] = useState<boolean>(() => initialState.showPiano)

  const [keyCenter, setKeyCenter] = useState<string>(() => initialState.keyCenter)
  const [selectedChordName, setSelectedChordName] = useState<string>(() => initialState.selectedChordName)
  const selectedChord = useMemo(() => chordData.find(c => c.name === selectedChordName) || chordData[0], [selectedChordName])

  const diatonicChips = useMemo(() => {
    const { majors, minors } = getDiatonicForKey(keyCenter)
    return [...majors, ...minors]
  }, [keyCenter])

  // Persist UI state on change
  useEffect(() => {
    try {
      localStorage.setItem('classroom.board.state', JSON.stringify({
        showChordGrid, showGuitar, showPiano, keyCenter, selectedChordName,
      }))
    } catch {
      // ignore localStorage write errors
      void 0
    }
  }, [showChordGrid, showGuitar, showPiano, keyCenter, selectedChordName])

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
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold border ${teacherUnlock ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${teacherUnlock ? 'bg-emerald-600' : 'bg-gray-500'}`} aria-hidden />
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
