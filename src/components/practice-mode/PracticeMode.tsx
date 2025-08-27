import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// --- Mock/Placeholder Imports ---
// These would be in separate files in a real application.
// They are included here to make the component runnable.

const getChordTheme = (chordName) => {
  // A simple placeholder for diagram theme logic
  const colors = {
    major: { primary: '#3b82f6', background: '#dbeafe' },
    minor: { primary: '#8b5cf6', background: '#ede9fe' },
    default: { primary: '#6b7280', background: '#f3f4f6' },
  };
  if (chordName.includes('m')) return colors.minor;
  if (['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'].includes(chordName)) return colors.major;
  return colors.default;
};

const GuitarDiagram = ({ chordName, positions, fingers }) => (
  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
    <h4 className="font-bold text-lg dark:text-white">{chordName} - Guitar</h4>
    <pre className="dark:text-gray-300">{JSON.stringify({ positions, fingers }, null, 2)}</pre>
  </div>
);

const PianoDiagram = ({ chordName, notes }) => (
  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
    <h4 className="font-bold text-lg dark:text-white">{chordName} - Piano</h4>
    <p className="dark:text-gray-300">Notes: {notes.join(', ')}</p>
  </div>
);

const useMetronome = (initialBpm, beatsPerMeasure) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  // Placeholder for metronome logic
  const start = () => setIsPlaying(true);
  const stop = () => setIsPlaying(false);
  return [{ isPlaying, bpm }, { start, stop, setBpm }];
};

// --- Theory Utils ---
const MAJORS_ORDER = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const RELATIVE_MINORS = { C: 'Am', G: 'Em', D: 'Bm', A: 'F#m', E: 'C#m', B: 'G#m', 'F#': 'D#m', Db: 'Bbm', Ab: 'Fm', Eb: 'Cm', Bb: 'Gm', F: 'Dm' };

function getDiatonicForKey(keyCenter) {
  const idx = MAJORS_ORDER.indexOf(keyCenter);
  if (idx === -1) return { majors: [], minors: [] };
  const I = MAJORS_ORDER[idx];
  const V = MAJORS_ORDER[(idx + 1) % 12];
  const IV = MAJORS_ORDER[(idx + 11) % 12];
  const majors = [I, IV, V];
  const minors = [RELATIVE_MINORS[I], RELATIVE_MINORS[V], RELATIVE_MINORS[IV]];
  return { majors, minors };
}


// --- Chord Data ---
const chords = [
  // Majors
  { name: 'C', guitarPositions: [{ string: 2, fret: 1 }, { string: 4, fret: 2 }, { string: 5, fret: 3 }], guitarFingers: [1, 2, 3], pianoNotes: ['C4', 'E4', 'G4'] },
  { name: 'G', guitarPositions: [{ string: 1, fret: 3 }, { string: 2, fret: 0 }, { string: 5, fret: 2 }, { string: 6, fret: 3 }], guitarFingers: [3, 0, 2, 4], pianoNotes: ['G3', 'B3', 'D4'] },
  { name: 'F', guitarPositions: [{ string: 1, fret: 1 }, { string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 3 }], guitarFingers: [1, 1, 2, 3], pianoNotes: ['F3', 'A3', 'C4'] },
  // Minors
  { name: 'Am', guitarPositions: [{ string: 2, fret: 1 }, { string: 3, fret: 2 }, { string: 4, fret: 2 }], guitarFingers: [1, 2, 3], pianoNotes: ['A3', 'C4', 'E4'] },
  { name: 'Em', guitarPositions: [{ string: 4, fret: 2 }, { string: 5, fret: 2 }], guitarFingers: [2, 3], pianoNotes: ['E3', 'G3', 'B3'] },
  { name: 'Dm', guitarPositions: [{ string: 1, fret: 1 }, { string: 2, fret: 3 }, { string: 3, fret: 2 }], guitarFingers: [1, 3, 2], pianoNotes: ['D4', 'F4', 'A4'] },
];

const PracticeMode = () => {
  const [selectedInstrument, setSelectedInstrument] = useState('guitar');
  const [currentChord, setCurrentChord] = useState(null);
  const [{ isPlaying, bpm }, { start, stop, setBpm }] = useMetronome(60, 4);
  const [showTips, setShowTips] = useState(true);
  const location = useLocation();
  const [keyCenter, setKeyCenter] = useState(null);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const [audioActive, setAudioActive] = useState(false);

  // Read URL params (?key=, ?chord=) and set initial state
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const keyParam = sp.get('key');
    const chordParam = sp.get('chord');
    if (keyParam && MAJORS_ORDER.includes(keyParam)) {
      setKeyCenter(keyParam);
    }
    if (chordParam) {
      const target = chords.find(c => c.name.toLowerCase() === chordParam.toLowerCase());
      if (target) setCurrentChord(target);
    }
    if (!chordParam && chords.length > 0 && !currentChord) {
      setCurrentChord(chords[0]);
    }
  }, [location.search, currentChord]);

  // Start/Stop metronome
  const playChord = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  // WebAudio helpers
  function getAudioContextCtor() {
    const w = window;
    return w.AudioContext || w.webkitAudioContext || null;
  }

  function ensureAudioContext() {
    if (!audioCtxRef.current) {
      const Ctor = getAudioContextCtor();
      if (!Ctor) throw new Error('Web Audio API not supported');
      audioCtxRef.current = new Ctor();
    }
    return audioCtxRef.current;
  }

  function noteToFreq(note) {
    const m = /^([A-Ga-g])([#b]?)(\d)$/.exec(note);
    if (!m) return 440;
    const letter = m[1].toUpperCase();
    const accidental = m[2];
    const octave = parseInt(m[3], 10);
    const key = accidental === 'b' ? `${letter}b` : accidental === '#' ? `${letter}#` : letter;
    const SEMIS = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
    const semi = SEMIS[key] ?? 0;
    const midi = (octave + 1) * 12 + semi;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function stopAudio() {
    nodesRef.current.forEach(({ osc, gain }) => {
      try { osc.stop(); } catch { /* ignore */ }
      try { osc.disconnect(); } catch { /* ignore */ }
      try { gain.disconnect(); } catch { /* ignore */ }
    });
    nodesRef.current = [];
    setAudioActive(false);
  }

  function playNotes(notes, mode = 'strum') {
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const spacing = mode === 'strum' ? 0.045 : 0.16;
    const sustain = mode === 'strum' ? 0.9 : 0.8;
    const total = notes.length * spacing + sustain + 0.2;
    const waveform = selectedInstrument === 'guitar' ? 'triangle' : 'sine';

    notes.forEach((n, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveform;
      osc.frequency.value = noteToFreq(n);
      if (selectedInstrument === 'guitar') {
        osc.detune.value = (i - notes.length / 2) * 3;
      }
      gain.gain.setValueAtTime(0, now + i * spacing);
      gain.gain.linearRampToValueAtTime(0.9, now + i * spacing + 0.02);
      gain.gain.linearRampToValueAtTime(0.0, now + i * spacing + sustain);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * spacing);
      osc.stop(now + i * spacing + sustain + 0.05);
      nodesRef.current.push({ osc, gain });
    });

    setAudioActive(true);
    window.setTimeout(() => setAudioActive(false), Math.ceil(total * 1000));
  }

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const getRandomChord = () => {
    const randomIndex = Math.floor(Math.random() * chords.length);
    return chords[randomIndex];
  };

  const nextChord = () => {
    setCurrentChord(getRandomChord());
  };

  const diatonicChips = useMemo(() => {
    if (!keyCenter) return [];
    const { majors, minors } = getDiatonicForKey(keyCenter);
    const list = [...majors, ...minors];
    return list.map(label => ({
      label,
      available: chords.some(c => c.name === label),
      color: getChordTheme(label),
    }));
  }, [keyCenter]);

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Practice Mode</h2>
      {keyCenter && (
        <div className="mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-gray-800 dark:text-gray-200 font-semibold">
              Key: {keyCenter} major
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              These chords fit well in this key:
            </div>
          </div>
          <div data-testid="diatonic-chords" className="mt-2 flex flex-wrap gap-2">
            {diatonicChips.map(({ label, available, color }) => (
              <button
                key={label}
                onClick={() => {
                  const c = chords.find(c => c.name === label);
                  if (c) setCurrentChord(c);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  available
                    ? 'text-white'
                    : 'text-gray-800 dark:text-gray-300 cursor-not-allowed opacity-80'
                }`}
                style={{
                  background: available ? color.primary : color.background,
                  border: `1px solid ${color.primary}`,
                }}
                title={available ? `Practice ${label}` : 'Diagram coming soon'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instrument
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedInstrument('guitar')}
              className={`px-4 py-2 rounded-lg ${
                selectedInstrument === 'guitar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Guitar
            </button>
            <button
              onClick={() => setSelectedInstrument('piano')}
              className={`px-4 py-2 rounded-lg ${
                selectedInstrument === 'piano'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Piano
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tempo: {bpm} BPM
          </label>
          <input
            type="range"
            min="40"
            max="200"
            value={bpm}
            onChange={e => setBpm(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tips
          </label>
          <button
            onClick={() => setShowTips(!showTips)}
            className={`px-4 py-2 rounded-lg ${
              showTips
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {showTips ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {currentChord && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3
              data-testid="current-chord-name"
              className="text-xl font-bold text-gray-800 dark:text-gray-100"
            >
              {currentChord.name}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={playChord}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isPlaying ? 'Stop' : 'Start'}
              </button>
              <button
                onClick={() => playNotes(currentChord.pianoNotes, 'strum')}
                className={`px-4 py-2 rounded-lg ${
                  audioActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
                title="Play a quick strum"
              >
                Strum
              </button>
              <button
                onClick={() => playNotes(currentChord.pianoNotes, 'arp')}
                className={`px-4 py-2 rounded-lg ${
                  audioActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
                title="Play an arpeggio"
              >
                Arp
              </button>
              <button
                onClick={stopAudio}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                title="Stop audio playback"
              >
                Stop Audio
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
              <PianoDiagram chordName={currentChord.name} notes={currentChord.pianoNotes} />
            )}
          </div>

          {showTips && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Practice Tip</h4>
              <p className="text-blue-700 dark:text-blue-400">
                Practice this chord slowly at first, focusing on clean fingering. Make sure each
                note rings clearly without any buzzing.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
          Other Chords to Practice
        </h4>
        <div data-testid="other-chords" className="flex flex-wrap gap-2">
          {chords
            .filter(chord => chord.name !== currentChord?.name)
            .map(chord => (
              <button
                key={chord.name}
                onClick={() => setCurrentChord(chord)}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-colors"
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
