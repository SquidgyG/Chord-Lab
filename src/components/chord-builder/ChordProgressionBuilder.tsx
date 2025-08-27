import { useState, useEffect } from 'react';
import useAudio from '../../hooks/useAudio';

interface Chord {
  id: string;
  name: string;
  key: string;
}

const ChordProgressionBuilder = () => {
  const [chords, setChords] = useState<Chord[]>([
    { id: '1', name: 'C', key: 'C' },
    { id: '2', name: 'G', key: 'G' },
    { id: '3', name: 'Am', key: 'A' },
    { id: '4', name: 'F', key: 'F' },
  ]);

  const [selectedKey, setSelectedKey] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);

  const { initAudio, playChord } = useAudio();

  useEffect(() => {
    initAudio();
  }, [initAudio]);

  const NOTE_SEQUENCE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const chordToNotes = (name: string): string[] => {
    const isMinor = name.endsWith('m');
    const root = isMinor ? name.slice(0, -1) : name;
    const rootIndex = NOTE_SEQUENCE.indexOf(root);
    if (rootIndex === -1) return [];

    const thirdIndex = (rootIndex + (isMinor ? 3 : 4)) % 12;
    const fifthIndex = (rootIndex + 7) % 12;

    return [
      `${root}4`,
      `${NOTE_SEQUENCE[thirdIndex]}4`,
      `${NOTE_SEQUENCE[fifthIndex]}4`,
    ];
  };

  const handlePlay = async () => {
    initAudio();
    setIsPlaying(true);
    for (const chord of chords) {
      const notes = chordToNotes(chord.name);
      if (notes.length > 0) {
        playChord(notes, 0.8);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    setIsPlaying(false);
  };
  
  const addChord = (chordName: string) => {
    const newChord = {
      id: Date.now().toString(),
      name: chordName,
      key: selectedKey
    };
    setChords([...chords, newChord]);
  };
  
  const removeChord = (id: string) => {
    setChords(chords.filter(chord => chord.id !== id));
  };
  
  const commonChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm'];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chord Progression Builder</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
        <select 
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Progression</label>
        <div className="flex flex-wrap gap-2 min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg p-4">
          {chords.length === 0 ? (
            <p className="text-gray-500">Add chords to build your progression</p>
          ) : (
            chords.map(chord => (
              <div 
                key={chord.id} 
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-lg"
              >
                <span className="font-medium">{chord.name}</span>
                <button 
                  onClick={() => removeChord(chord.id)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Chords</label>
        <div className="grid grid-cols-7 gap-2">
          {commonChords.map(chord => (
            <button
              key={chord}
              onClick={() => addChord(chord)}
              className="py-2 bg-gray-100 hover:bg-blue-100 text-gray-800 font-medium rounded-lg transition-colors"
            >
              {chord}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={() => setChords([])}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? 'Playing...' : 'Play Progression'}
        </button>
      </div>
    </div>
  );
};

export default ChordProgressionBuilder;
