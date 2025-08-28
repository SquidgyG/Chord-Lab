import { useState, useEffect, type FC } from 'react';
import songs, { type Song } from '../../data/songs';
import useMetronome from '../../hooks/useMetronome';
import useAudio from '../../hooks/useAudio';
import PracticeMetronomeControls from './PracticeMetronomeControls';
import InstrumentPanel from './InstrumentPanel';

interface Chord {
  name: string;
  guitarPositions: { string: number; fret: number }[];
  guitarFingers: number[];
  pianoNotes: string[];
}

const chords: Chord[] = [
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
];

const getChord = (name: string): Chord | null =>
  chords.find(c => c.name === name) ?? null;

interface SongPracticeProps {
  onClose: () => void;
}

const SongPractice: FC<SongPracticeProps> = ({ onClose }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [selectedInstrument, setSelectedInstrument] =
    useState<'guitar' | 'piano'>('guitar');
  const [{ isPlaying, bpm }, { start, stop, setBpm }] = useMetronome(60, 4);
  const { playChord, playGuitarNote, initAudio, fretToNote } = useAudio();

  const chordName = selectedSong?.progression[currentChordIndex];
  const currentChord = chordName ? getChord(chordName) : null;

  useEffect(() => {
    if (selectedSong) {
      setBpm(selectedSong.bpm);
    }
  }, [selectedSong, setBpm]);

  const toggleMetronome = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  const handleStrum = () => {
    if (currentChord) {
      const notes =
        selectedInstrument === 'piano'
          ? currentChord.pianoNotes
          : currentChord.guitarPositions.map(p => fretToNote(p.string, p.fret));
      playChord(notes, 1, selectedInstrument);
    }
  };

  const nextChord = () => {
    if (!selectedSong) return;
    setCurrentChordIndex((currentChordIndex + 1) % selectedSong.progression.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Song Practice
        </h2>
        <button
          onClick={onClose}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Back
        </button>
      </div>

      {!selectedSong ? (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Choose a Song
          </h3>
          <ul className="space-y-2">
            {songs.map(song => (
              <li key={song.title}>
                <button
                  onClick={() => {
                    setSelectedSong(song);
                    setCurrentChordIndex(0);
                  }}
                  className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-gray-600"
                >
                  {song.title} – {song.artist}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {selectedSong.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {selectedSong.artist} • Key: {selectedSong.key} • Original Tempo:{' '}
            {selectedSong.bpm} BPM
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {selectedSong.progression.map((chordName, idx) => (
              <button
                key={`${chordName}-${idx}`}
                onClick={() => setCurrentChordIndex(idx)}
                className={`px-3 py-1 rounded-lg ${
                  idx === currentChordIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {chordName}
              </button>
            ))}
          </div>

          <PracticeMetronomeControls
            isPlaying={isPlaying}
            bpm={bpm}
            setBpm={setBpm}
            toggleMetronome={toggleMetronome}
            handleStrum={handleStrum}
            nextChord={nextChord}
          />

          <InstrumentPanel
            selectedInstrument={selectedInstrument}
            onInstrumentChange={setSelectedInstrument}
            chord={currentChord}
            playGuitarNote={playGuitarNote}
            playPianoNote={note => playChord([note], 0.5, 'piano')}
            initAudio={initAudio}
          />
        </div>
      )}
    </div>
  );
};

export default SongPractice;