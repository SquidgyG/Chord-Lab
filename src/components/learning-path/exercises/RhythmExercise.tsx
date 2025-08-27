import React from 'react';
import useMetronome from '../../../hooks/useMetronome';

const RhythmExercise: React.FC = () => {
  const [{ isPlaying, bpm, beat }, { start, stop, setBpm }] = useMetronome(60, 4);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Rhythm Keeping Exercise
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
            onChange={(e) => setBpm(parseInt(e.target.value))}
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
      <div className="flex justify-center items-center h-24 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="flex space-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full transition-all duration-100 ${
                isPlaying && beat === i ? 'bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Tap along with the pulsing dot to practice your timing.
      </p>
    </div>
  );
};

export default RhythmExercise;
