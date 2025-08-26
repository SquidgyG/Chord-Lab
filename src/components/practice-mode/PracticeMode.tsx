import { useState, useEffect } from 'react';
import GuitarDiagram from '../diagrams/GuitarDiagram';
import PianoDiagram from '../diagrams/PianoDiagram';

interface Chord {
  name: string;
  guitarPositions: { string: number; fret: number }[];
  guitarFingers: number[];
  pianoNotes: string[];
}

const PracticeMode = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<'guitar' | 'piano'>('guitar');
  const [currentChord, setCurrentChord] = useState<Chord | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [showTips, setShowTips] = useState(true);
  
  // Sample chord data
  const chords: Chord[] = [
    {
      name: 'C Major',
      guitarPositions: [
        { string: 2, fret: 1 },
        { string: 4, fret: 2 },
        { string: 5, fret: 3 }
      ],
      guitarFingers: [1, 2, 3],
      pianoNotes: ['C4', 'E4', 'G4']
    },
    {
      name: 'G Major',
      guitarPositions: [
        { string: 1, fret: 3 },
        { string: 2, fret: 0 },
        { string: 5, fret: 2 },
        { string: 6, fret: 3 }
      ],
      guitarFingers: [3, 0, 2, 4],
      pianoNotes: ['G3', 'B3', 'D4']
    },
    {
      name: 'Am',
      guitarPositions: [
        { string: 2, fret: 1 },
        { string: 3, fret: 2 },
        { string: 4, fret: 2 }
      ],
      guitarFingers: [1, 2, 3],
      pianoNotes: ['A3', 'C4', 'E4']
    }
  ];
  
  // Set initial chord
  useEffect(() => {
    if (chords.length > 0) {
      setCurrentChord(chords[0]);
    }
  }, []);
  
  // Function to play chord (placeholder)
  const playChord = () => {
    setIsPlaying(true);
    // In a real app, this would trigger audio playback
    setTimeout(() => setIsPlaying(false), 1000);
  };
  
  // Function to get a random chord
  const getRandomChord = () => {
    const randomIndex = Math.floor(Math.random() * chords.length);
    return chords[randomIndex];
  };
  
  // Function to go to next chord
  const nextChord = () => {
    setCurrentChord(getRandomChord());
  };
  
  // Calculate interval in milliseconds from BPM
  // const interval = 60000 / bpm;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Practice Mode</h2>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instrument</label>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedInstrument('guitar')}
              className={`px-4 py-2 rounded-lg ${selectedInstrument === 'guitar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Guitar
            </button>
            <button 
              onClick={() => setSelectedInstrument('piano')}
              className={`px-4 py-2 rounded-lg ${selectedInstrument === 'piano' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Piano
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tempo: {bpm} BPM</label>
          <input 
            type="range" 
            min="40" 
            max="200" 
            value={bpm} 
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-32"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tips</label>
          <button 
            onClick={() => setShowTips(!showTips)}
            className={`px-4 py-2 rounded-lg ${showTips ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {showTips ? 'On' : 'Off'}
          </button>
        </div>
      </div>
      
      {currentChord && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{currentChord.name}</h3>
            <div className="flex space-x-2">
              <button 
                onClick={playChord}
                disabled={isPlaying}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                {isPlaying ? 'Playing...' : 'Play'}
              </button>
              <button 
                onClick={nextChord}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Next Chord
              </button>
            </div>
          </div>
          
          <div className="flex justify-center my-6">
            {selectedInstrument === 'guitar' ? (
              <GuitarDiagram 
                chordName={currentChord.name} 
                positions={currentChord.guitarPositions} 
                fingers={currentChord.guitarFingers} 
              />
            ) : (
              <PianoDiagram 
                chordName={currentChord.name} 
                notes={currentChord.pianoNotes} 
              />
            )}
          </div>
          
          {showTips && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-bold text-blue-800 mb-2">Practice Tip</h4>
              <p className="text-blue-700">
                Practice this chord slowly at first, focusing on clean fingering. 
                Make sure each note rings clearly without any buzzing.
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-bold text-gray-800 mb-2">Other Chords to Practice</h4>
        <div className="flex flex-wrap gap-2">
          {chords
            .filter(chord => chord.name !== currentChord?.name)
            .map(chord => (
              <button 
                key={chord.name}
                onClick={() => setCurrentChord(chord)}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-lg transition-colors"
              >
                {chord.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;
