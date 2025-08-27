import type { FC, ChangeEvent } from 'react';

interface PracticeMetronomeControlsProps {
  isPlaying: boolean;
  bpm: number;
  setBpm: (bpm: number) => void;
  toggleMetronome: () => void;
  handleStrum: () => void;
  nextChord: () => void;
  beginnerMode?: boolean;
}

const PracticeMetronomeControls: FC<PracticeMetronomeControlsProps> = ({
  isPlaying,
  bpm,
  setBpm,
  toggleMetronome,
  handleStrum,
  nextChord,
  beginnerMode = false,
}) => {
  if (beginnerMode) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tempo: {bpm} BPM
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleStrum}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
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
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tempo: {bpm} BPM
        </label>
        <input
          type="range"
          min="40"
          max="200"
          value={bpm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBpm(parseInt(e.target.value))
          }
          className="w-32"
        />
      </div>
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
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
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
  );
};

export default PracticeMetronomeControls;
