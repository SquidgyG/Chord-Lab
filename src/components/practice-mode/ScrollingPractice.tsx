import React, { useState } from 'react'
import ChordCard from './ChordCard'
import useMetronome from '../../hooks/useMetronome'

const ScrollingPractice: React.FC = () => {
  const chordProgression = ['C', 'G', 'Am', 'F']
  const [{ isPlaying, bpm }, { start, stop, setBpm }] = useMetronome(120, 4)
  const [isStarted, setIsStarted] = useState(false)

  // Each chord gets 4 beats (one measure)
  const beatsPerChord = 4
  const animationDuration = (60 / bpm) * beatsPerChord

  const handleStart = () => {
    start()
    setIsStarted(true)
  }

  const handleStop = () => {
    stop()
    setIsStarted(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Scrolling Practice
        </h2>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tempo: {bpm} BPM
            </label>
            <input
              type="range"
              min="40"
              max="200"
              value={bpm}
              onChange={e => setBpm(parseInt(e.target.value))}
              className="w-32"
              disabled={isPlaying}
            />
          </div>
          <button
            onClick={isPlaying ? handleStop : handleStart}
            className={`px-4 py-2 rounded-lg text-white font-bold ${
              isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      <div className="relative h-[600px] bg-gray-200 dark:bg-gray-900 rounded-lg overflow-hidden">
        {/* Play line */}
        <div className="absolute bottom-16 left-0 right-0 h-1 bg-red-500 z-10" />

        {/* Chord track */}
        {isStarted && (
          <div className="absolute inset-0">
            {chordProgression.map((chord, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: `scroll-down ${animationDuration}s linear`,
                  animationDelay: `${index * animationDuration}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                <ChordCard chordName={chord} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScrollingPractice
