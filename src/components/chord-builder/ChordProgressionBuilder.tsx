import { useState, useEffect, useCallback, useMemo } from 'react';
import useAudio from '../../hooks/useAudio';
import { chords as chordData } from '../../data/chords';
import { getDiatonicChords } from '../../utils/music-theory';

interface Chord {
  id: string;
  name: string;
  key: string;
}

const ChordProgressionBuilder = () => {
  const [chords, setChords] = useState<Chord[]>(() => {
    const saved = localStorage.getItem('chordProgression');
    return saved
      ? (JSON.parse(saved) as Chord[])
      : [
          { id: '1', name: 'C', key: 'C' },
          { id: '2', name: 'G', key: 'G' },
          { id: '3', name: 'Am', key: 'A' },
          { id: '4', name: 'F', key: 'F' },
        ];
  });

  const [selectedKey, setSelectedKey] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);
  const [diatonicOnly, setDiatonicOnly] = useState(true);

  const { initAudio, playChord } = useAudio();

  useEffect(() => {
    initAudio();
  }, [initAudio]);

  useEffect(() => {
    localStorage.setItem('chordProgression', JSON.stringify(chords));
  }, [chords]);

  const handlePlay = useCallback(async () => {
    initAudio();
    setIsPlaying(true);
    for (const chord of chords) {
      const notes = chordData[chord.name]?.pianoNotes ?? [];
      if (notes.length > 0) {
        playChord(notes, 0.8);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    setIsPlaying(false);
  }, [chords, initAudio, playChord]);

  const addChord = useCallback((chordName: string) => {
    const newChord = {
      id: Date.now().toString(),
      name: chordName,
      key: selectedKey
    };
    setChords(prev => [...prev, newChord]);
  }, [selectedKey]);

  const removeChord = useCallback((id: string) => {
    setChords(prev => prev.filter(chord => chord.id !== id));
  }, []);

  const loadSavedProgression = useCallback(() => {
    const saved = localStorage.getItem('chordProgression');
    if (saved) {
      setChords(JSON.parse(saved) as Chord[]);
    }
  }, []);

  const allChords = useMemo(() => [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
    'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm',
    'Cdim', 'C#dim', 'Ddim', 'D#dim', 'Edim', 'Fdim', 'F#dim', 'Gdim', 'G#dim', 'Adim', 'A#dim', 'Bdim'
  ], []);

  const availableChords = useMemo(() => 
    diatonicOnly ? getDiatonicChords(selectedKey) : allChords
  , [diatonicOnly, selectedKey, allChords]);

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
        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setDiatonicOnly(true)}
            className={`px-4 py-2 rounded-lg ${diatonicOnly ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Diatonic Only
          </button>
          <button
            onClick={() => setDiatonicOnly(false)}
            className={`px-4 py-2 rounded-lg ${!diatonicOnly ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            All Chords
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {availableChords.map(chord => (
            <button
              key={chord}
              onClick={() => addChord(chord)}
              title={`Add ${chord} chord`}
              className="h-10 min-w-[40px] px-2 bg-gray-100 hover:bg-blue-100 text-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              {chord}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-2 justify-between">
        <button
          onClick={() => setChords([])}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={loadSavedProgression}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Load Saved Progression
        </button>
        <button
          onClick={() => void handlePlay()}
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