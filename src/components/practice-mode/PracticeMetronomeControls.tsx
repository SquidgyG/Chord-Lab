import type { FC, ChangeEvent } from 'react';

interface PracticeMetronomeControlsProps {
  isPlaying: boolean;
  bpm: number;
  setBpm: (bpm: number) => void;
  toggleMetronome: () => void;
  handleStrum: () => void;
  nextChord: () => void;
}

const PracticeMetronomeControls: FC<PracticeMetronomeControlsProps> = ({
  isPlaying,
  bpm,
  setBpm,
  toggleMetronome,
  handleStrum,
  nextChord,
}) => {
  const presets = [
    { label: 'Slow', bpm: 70 },
    { label: 'Medium', bpm: 100 },
    { label: 'Fast', bpm: 130 },
  ];
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
        <div className="flex gap-2 mt-2">
          {presets.map(({ label, bpm: presetBpm }) => (
            <button
              key={label}
              onClick={() => setBpm(presetBpm)}
              className={`px-2 py-1 rounded transition-colors ${
                bpm === presetBpm
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
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
