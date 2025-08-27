import { useEffect, useRef, useState } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const { initAudio, playChord } = useAudio();
  
  const [selectedKey, setSelectedKey] = useState('C');

  // Circle-of-fifths helpers for templates (match existing components)
  const MAJORS_ORDER = ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'] as const;
  const RELATIVE_MINORS: Record<string, string> = {
    C: 'Am', G: 'Em', D: 'Bm', A: 'F#m', E: 'C#m', B: 'G#m', 'F#': 'D#m', Db: 'Bbm', Ab: 'Fm', Eb: 'Cm', Bb: 'Gm', F: 'Dm'
  };

  // Map flats to enharmonic sharps for audio engine note names
  const FLAT_TO_SHARP: Record<string, string> = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
  const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

  function normalizeRoot(root: string): string {
    return FLAT_TO_SHARP[root as keyof typeof FLAT_TO_SHARP] || root;
  }

  function chordNameToNotes(name: string): string[] {
    const isMinor = /m$/.test(name);
    const rootRaw = name.replace(/m$/,'');
    const root = normalizeRoot(rootRaw);
    const rootIndex = NOTE_NAMES.indexOf(root);
    if (rootIndex === -1) return ['C4','E4','G4'];
    const baseOctave = 4; // mid-range
    const intervals = isMinor ? [0,3,7] : [0,4,7];
    const rootSemis = baseOctave * 12 + rootIndex;
    return intervals.map(iv => {
      const total = rootSemis + iv;
      const noteName = NOTE_NAMES[total % 12];
      const oct = Math.floor(total / 12);
      return `${noteName}${oct}`;
    });
  }

  // localStorage persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chordBuilder.state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.chords)) {
          setChords(parsed.chords);
        }
        if (parsed && typeof parsed.selectedKey === 'string') {
          setSelectedKey(parsed.selectedKey);
        }
      }
    } catch {
      // ignore localStorage read errors (private mode or quota)
      void 0;
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('chordBuilder.state', JSON.stringify({ chords, selectedKey }));
    } catch {
      // ignore localStorage write errors
      void 0;
    }
  }, [chords, selectedKey]);
  
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

  // Quick templates
  function toFoFKey(k: string): string {
    // Convert sharp-only UI keys to flats expected by MAJORS_ORDER where needed
    const map: Record<string, string> = { 'C#':'Db', 'D#':'Eb', 'G#':'Ab', 'A#':'Bb' };
    return map[k] || k;
  }

  const applyTemplate = (name: 'I-V-vi-IV' | 'ii-V-I') => {
    const keyFoF = toFoFKey(selectedKey);
    const idx = (MAJORS_ORDER as readonly string[]).indexOf(keyFoF);
    if (idx === -1) return;
    const I = MAJORS_ORDER[idx] as string;
    const V = MAJORS_ORDER[(idx + 1) % 12] as string;
    const IV = MAJORS_ORDER[(idx + 11) % 12] as string;
    if (name === 'I-V-vi-IV') {
      const vi = RELATIVE_MINORS[I];
      const seq = [I, V, vi, IV];
      setChords(seq.map((n, i) => ({ id: `${Date.now()}-${i}`, name: n, key: selectedKey })));
    } else {
      // ii = relative minor of IV
      const ii = RELATIVE_MINORS[IV];
      const seq = [ii, V, I];
      setChords(seq.map((n, i) => ({ id: `${Date.now()}-${i}`, name: n, key: selectedKey })));
    }
  };

  // Playback sequencing
  const stopPlayback = () => {
    timeoutsRef.current.forEach(t => window.clearTimeout(t));
    timeoutsRef.current = [];
    setIsPlaying(false);
  };

  const playProgression = () => {
    if (isPlaying || chords.length === 0) return;
    initAudio();
    setIsPlaying(true);
    const chordMs = 1000; // 1 second per chord for now
    chords.forEach((c, i) => {
      const t = window.setTimeout(() => {
        playChord(chordNameToNotes(c.name), 0.9, 'piano');
      }, i * chordMs);
      timeoutsRef.current.push(t);
    });
    const end = window.setTimeout(() => {
      setIsPlaying(false);
      timeoutsRef.current = [];
    }, chords.length * chordMs + 50);
    timeoutsRef.current.push(end);
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
      
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-2">Templates:</span>
        <button
          onClick={() => applyTemplate('I-V-vi-IV')}
          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-800"
        >
          I–V–vi–IV
        </button>
        <button
          onClick={() => applyTemplate('ii-V-I')}
          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-800"
        >
          ii–V–I
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Progression</label>
        <div
          className="flex flex-wrap gap-2 min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg p-4"
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer?.getData('text/plain');
            if (data) addChord(data);
          }}
          title="Drag chords from the Chord Wheel here"
        >
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
        <div className="flex gap-2">
          <button 
            onClick={isPlaying ? stopPlayback : playProgression}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isPlaying ? 'Stop' : 'Play Progression'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChordProgressionBuilder;
