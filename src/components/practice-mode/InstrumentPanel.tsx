import type { FC } from 'react';
import GuitarDiagram from '../diagrams/GuitarDiagram';
import PianoDiagram from '../diagrams/PianoDiagram';
import { GUITAR_ICON, PIANO_ICON } from '../../assets/instrumentIcons';

interface Chord {
  name: string;
  guitarPositions: { string: number; fret: number }[];
  guitarFingers: number[];
  pianoNotes: string[];
}

interface InstrumentPanelProps {
  selectedInstrument: 'guitar' | 'piano';
  onInstrumentChange: (instrument: 'guitar' | 'piano') => void;
  chord: Chord | null;
  playGuitarNote: (string: number, fret: number) => void;
  playPianoNote: (note: string) => void;
  initAudio: () => void;
}

const InstrumentPanel: FC<InstrumentPanelProps> = ({
  selectedInstrument,
  onInstrumentChange,
  chord,
  playGuitarNote,
  playPianoNote,
  initAudio,
}) => {
  return (
    <div className="mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Instrument
        </label>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => onInstrumentChange('guitar')}
            aria-label="Select guitar instrument"
            className={`flex flex-col items-center justify-center px-4 py-4 h-24 rounded-lg ${
              selectedInstrument === 'guitar'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-3xl" aria-hidden="true">
              {GUITAR_ICON}
            </span>
            <span className="mt-1 text-sm">Guitar</span>
          </button>
          <button
            onClick={() => onInstrumentChange('piano')}
            aria-label="Select piano instrument"
            className={`flex flex-col items-center justify-center px-4 py-4 h-24 rounded-lg ${
              selectedInstrument === 'piano'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-3xl" aria-hidden="true">
              {PIANO_ICON}
            </span>
            <span className="mt-1 text-sm">Piano</span>
          </button>
        </div>
      </div>

      {chord && (
        <div className="flex justify-center my-6" onClick={initAudio}>
          {selectedInstrument === 'guitar' ? (
            <GuitarDiagram
              chordName={chord.name}
              positions={chord.guitarPositions}
              fingers={chord.guitarFingers}
              onPlayNote={playGuitarNote}
            />
          ) : (
            <PianoDiagram
              chordName={chord.name}
              notes={chord.pianoNotes}
              onPlayNote={playPianoNote}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InstrumentPanel;
