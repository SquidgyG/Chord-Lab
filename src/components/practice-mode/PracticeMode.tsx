import { useState, useEffect, useMemo, type FC } from 'react'
import { useLocation } from 'react-router-dom'
import { getChordTheme } from '../../utils/diagramTheme'
import GuitarDiagram from '../diagrams/GuitarDiagram'
import PianoDiagram from '../diagrams/PianoDiagram'
import useMetronome from '../../hooks/useMetronome'
import { useAchievements } from '../../contexts/AchievementContext'
import useAudio from '../../hooks/useAudio'

interface Chord {
  name: string
  guitarPositions: { string: number; fret: number }[]
  guitarFingers: number[]
  pianoNotes: string[]
}

const MAJORS_ORDER = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
type MajorKey = (typeof MAJORS_ORDER)[number]

const RELATIVE_MINORS: Record<MajorKey, string> = {
  C: 'Am',
  G: 'Em',
  D: 'Bm',
  A: 'F#m',
  E: 'C#m',
  B: 'G#m',
  'F#': 'D#m',
  Db: 'Bbm',
  Ab: 'Fm',
  Eb: 'Cm',
  Bb: 'Gm',
  F: 'Dm',
}

// Sample chord data
const chords: Chord[] = [
  // Majors
  {
    name: 'C',
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 4, fret: 2 },
      { string: 5, fret: 3 },
    ],
    guitarFingers: [1, 2, 3],
    pianoNotes: ['C4', 'E4', 'G4'],
  },
  {
    name: 'G',
    guitarPositions: [
      { string: 1, fret: 3 },
      { string: 2, fret: 0 },
      { string: 5, fret: 2 },
      { string: 6, fret: 3 },
    ],
    guitarFingers: [3, 0, 2, 4],
    pianoNotes: ['G3', 'B3', 'D4'],
  },
  {
    name: 'F',
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 3 },
    ],
    guitarFingers: [1, 1, 2, 3],
    pianoNotes: ['F3', 'A3', 'C4'],
  },
  // Minors
  {
    name: 'Am',
    guitarPositions: [
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
      { string: 4, fret: 2 },
    ],
    guitarFingers: [1, 2, 3],
    pianoNotes: ['A3', 'C4', 'E4'],
  },
  {
    name: 'Em',
    guitarPositions: [
      { string: 4, fret: 2 },
      { string: 5, fret: 2 },
    ],
    guitarFingers: [2, 3],
    pianoNotes: ['E3', 'G3', 'B3'],
  },
  {
    name: 'Dm',
    guitarPositions: [
      { string: 1, fret: 1 },
      { string: 2, fret: 3 },
      { string: 3, fret: 2 },
    ],
    guitarFingers: [1, 3, 2],
    pianoNotes: ['D4', 'F4', 'A4'],
  },
]

function getDiatonicForKey(keyCenter: MajorKey) {
  const idx = MAJORS_ORDER.indexOf(keyCenter)
  if (idx === -1) return { majors: [], minors: [] }
  const I = MAJORS_ORDER[idx]
  const V = MAJORS_ORDER[(idx + 1) % 12]
  const IV = MAJORS_ORDER[(idx + 11) % 12]
  const majors = [I, IV, V]
  const minors = [RELATIVE_MINORS[I], RELATIVE_MINORS[V], RELATIVE_MINORS[IV]]
  return { majors, minors }
}

const PracticeMode: FC = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<'guitar' | 'piano'>('guitar')
  const [currentChord, setCurrentChord] = useState<Chord | null>(chords[0])
  const { unlockAchievement } = useAchievements()
  const [{ isPlaying, bpm }, { start, stop, setBpm }] = useMetronome(60, 4)
  const [showTips, setShowTips] = useState<boolean>(true)
  const location = useLocation()
  const practicedChordsRef = useRef<Set<string>>(new Set())
  const [keyCenter, setKeyCenter] = useState<MajorKey | null>(null)
  const { playChord, playGuitarNote, initAudio, fretToNote } = useAudio()

  // Read URL params (?key=, ?chord=) and set initial state
  useEffect(() => {
    const sp = new URLSearchParams(location.search)
    const keyParam = sp.get('key')
    const chordParam = sp.get('chord')
    if (keyParam && (MAJORS_ORDER as readonly string[]).includes(keyParam)) {
      setKeyCenter(keyParam as MajorKey)
    }
    if (chordParam) {
      const target = chords.find(c => c.name.toLowerCase() === chordParam.toLowerCase())
      if (target) setCurrentChord(target)
    }
    if (!chordParam && chords.length > 0 && !currentChord) {
      setCurrentChord(chords[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  useEffect(() => {
    if (currentChord) {
      const practicedChords = practicedChordsRef.current
      if (!practicedChords.has(currentChord.name)) {
        practicedChords.add(currentChord.name)

        if (practicedChords.size === 1) {
          unlockAchievement('FIRST_CHORD')
        }
        if (practicedChords.size === 5) {
          unlockAchievement('CHORD_NOVICE')
        }
        if (practicedChords.size === 10) {
          unlockAchievement('CHORD_APPRENTICE')
        }
      }
    }
  }, [currentChord, unlockAchievement])

  // Start/Stop metronome
  const toggleMetronome = () => {
    if (isPlaying) {
      stop()
    } else {
      start()
    }
  }

  const handleStrum = () => {
    if (currentChord) {
      const notes = selectedInstrument === 'piano'
        ? currentChord.pianoNotes
        : currentChord.guitarPositions.map(p => fretToNote(p.string, p.fret));
      playChord(notes, 1, selectedInstrument);
    }
  }

  // Function to get a random chord
  const getRandomChord = (): Chord => {
    const randomIndex = Math.floor(Math.random() * chords.length)
    return chords[randomIndex]
  }

  // Function to go to next chord
  const nextChord = () => {
    setCurrentChord(getRandomChord())
  }

  // Calculate interval in milliseconds from BPM
  // const interval = 60000 / bpm;

  const diatonicChips = useMemo(() => {
    if (!keyCenter) return []
    const { majors, minors } = getDiatonicForKey(keyCenter)
    const list: string[] = [...majors, ...minors]
    return list.map((label: string) => ({
      label,
      available: chords.some((c: Chord) => c.name === label),
      color: getChordTheme(label),
    }))
  }, [keyCenter])

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Practice Mode</h2>
      {keyCenter && (
        <div className="mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-gray-800 dark:text-gray-200 font-semibold">
              Key: {keyCenter} major
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              These chords fit well in this key:
            </div>
          </div>
          <div data-testid="diatonic-chords" className="mt-2 flex flex-wrap gap-2">
            {diatonicChips.map(({ label, available, color }: { label: string; available: boolean; color: { primary: string; background: string } }) => (
              <button
                key={label}
                onClick={() => {
                  const c = chords.find((c: Chord) => c.name === label)
                  if (c) setCurrentChord(c)
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  available
                    ? 'text-white'
                    : 'text-gray-800 dark:text-gray-300 cursor-not-allowed opacity-80'
                }`}
                style={{
                  background: available ? color.primary : color.background,
                  border: `1px solid ${color.primary}`,
                }}
                title={available ? `Practice ${label}` : 'Diagram coming soon'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instrument
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedInstrument('guitar')}
              className={`px-4 py-2 rounded-lg ${
                selectedInstrument === 'guitar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Guitar
            </button>
            <button
              onClick={() => setSelectedInstrument('piano')}
              className={`px-4 py-2 rounded-lg ${
                selectedInstrument === 'piano'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Piano
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tempo: {bpm} BPM
          </label>
          <input
            type="range"
            min="40"
            max="200"
            value={bpm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBpm(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tips
          </label>
          <button
            onClick={() => setShowTips(!showTips)}
            className={`px-4 py-2 rounded-lg ${
              showTips
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {showTips ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {currentChord && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3
              data-testid="current-chord-name"
              className="text-xl font-bold text-gray-800 dark:text-gray-100"
            >
              {currentChord.name}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={toggleMetronome}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isPlaying ? 'Stop Metronome' : 'Start Metronome'}
              </button>
              <button
                onClick={handleStrum}
                className={`px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white`}
                title="Play a quick strum"
              >
                Strum
              </button>
              <button
                onClick={nextChord}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Next Chord
              </button>
            </div>
          </div>

          <div className="flex justify-center my-6" onClick={initAudio}>
            {selectedInstrument === 'guitar' ? (
              <GuitarDiagram
                chordName={currentChord.name}
                positions={currentChord.guitarPositions}
                fingers={currentChord.guitarFingers}
                onPlayNote={playGuitarNote}
              />
            ) : (
              <PianoDiagram chordName={currentChord.name} notes={currentChord.pianoNotes} onPlayNote={(note) => playNote(note)} />
            )}
          </div>

          {showTips && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Practice Tip</h4>
              <p className="text-blue-700 dark:text-blue-400">
                Practice this chord slowly at first, focusing on clean fingering. Make sure each
                note rings clearly without any buzzing.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
          Other Chords to Practice
        </h4>
        <div data-testid="other-chords" className="flex flex-wrap gap-2">
          {chords
            .filter((chord: Chord) => chord.name !== currentChord?.name)
            .map((chord: Chord) => (
              <button
                key={chord.name}
                onClick={() => setCurrentChord(chord)}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-colors"
              >
                {chord.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PracticeMode
