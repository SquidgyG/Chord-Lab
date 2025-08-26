import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

// --- Enhanced Data Structure ---
const CHORD_DATA = {
  guitar: {
    "Em": { 
      name: "E Minor", 
      frets: [0, 2, 2, 0, 0, 0], 
      fingers: [0, 2, 3, 0, 0, 0], 
      difficulty: 1, 
      notes: ["E2", "B2", "E3", "G3", "B3", "E4"],
      color: "#ef4444"
    },
    "Am": { 
      name: "A Minor", 
      frets: [-1, 0, 2, 2, 1, 0], 
      fingers: [0, 0, 2, 3, 1, 0], 
      difficulty: 1, 
      notes: ["", "A2", "E3", "A3", "C4", "E4"],
      color: "#f97316"
    },
    "C": { 
      name: "C Major", 
      frets: [-1, 3, 2, 0, 1, 0], 
      fingers: [0, 3, 2, 0, 1, 0], 
      difficulty: 2, 
      notes: ["", "C3", "E3", "G3", "C4", "E4"],
      color: "#eab308"
    },
    "D": { 
      name: "D Major", 
      frets: [-1, -1, 0, 2, 3, 2], 
      fingers: [0, 0, 0, 1, 3, 2], 
      difficulty: 2, 
      notes: ["", "", "D3", "A3", "D4", "F#4"],
      color: "#84cc16"
    },
    "G": { 
      name: "G Major", 
      frets: [3, 2, 0, 0, 0, 3], 
      fingers: [3, 2, 0, 0, 0, 4], 
      difficulty: 2, 
      notes: ["G2", "B2", "D3", "G3", "B3", "G4"],
      color: "#22c55e"
    },
    "F": { 
      name: "F Major", 
      frets: [1, 1, 3, 2, 1, 1], 
      fingers: [1, 1, 3, 2, 1, 1], 
      difficulty: 4, 
      notes: ["F2", "A2", "F3", "A3", "C4", "F4"],
      color: "#6366f1"
    }
  },
  piano: {
    "C": { 
      name: "C Major", 
      rightHand: { notes: ["C4", "E4", "G4"], fingers: [1, 3, 5] },
      leftHand: { notes: ["C3", "E3", "G3"], fingers: [5, 3, 1] },
      color: "#ef4444"
    },
    "Dm": { 
      name: "D Minor", 
      rightHand: { notes: ["D4", "F4", "A4"], fingers: [1, 3, 5] },
      leftHand: { notes: ["D3", "F3", "A3"], fingers: [5, 3, 1] },
      color: "#f97316"
    },
    "Em": { 
      name: "E Minor", 
      rightHand: { notes: ["E4", "G4", "B4"], fingers: [1, 3, 5] },
      leftHand: { notes: ["E3", "G3", "B3"], fingers: [5, 3, 1] },
      color: "#eab308"
    },
    "F": { 
      name: "F Major", 
      rightHand: { notes: ["F4", "A4", "C5"], fingers: [1, 3, 5] },
      leftHand: { notes: ["F3", "A3", "C4"], fingers: [5, 3, 1] },
      color: "#84cc16"
    },
    "G": { 
      name: "G Major", 
      rightHand: { notes: ["G4", "B4", "D5"], fingers: [1, 3, 5] },
      leftHand: { notes: ["G3", "B3", "D4"], fingers: [5, 3, 1] },
      color: "#22c55e"
    },
    "Am": { 
      name: "A Minor", 
      rightHand: { notes: ["A4", "C5", "E5"], fingers: [1, 3, 5] },
      leftHand: { notes: ["A3", "C4", "E4"], fingers: [5, 3, 1] },
      color: "#6366f1"
    }
  }
};

// --- Chord Wheel (SVG-based with major/minor sectors like ultimate_chord_app) ---
const ChordWheel = ({ activeKey = 'C Major', onChordSelect, onKeyChange }) => {
  const MAJORS_ORDER = ["C Major", "G Major", "D Major", "A Major", "E Major", "B Major", "F# Major", "Db Major", "Ab Major", "Eb Major", "Bb Major", "F Major"];
  const MINOR_REL = { "C Major": "A Minor", "G Major": "E Minor", "D Major": "B Minor", "A Major": "F# Minor", "E Major": "C# Minor", "B Major": "G# Minor", "F# Major": "D# Minor", "Db Major": "Bb Minor", "Ab Major": "F Minor", "Eb Major": "C Minor", "Bb Major": "G Minor", "F Major": "D Minor" };
  
  const KEY_DEGREES = {
    "C Major": { I: "C Major", ii: "D Minor", iii: "E Minor", IV: "F Major", V: "G Major", vi: "A Minor" },
    "G Major": { I: "G Major", ii: "A Minor", iii: "B Minor", IV: "C Major", V: "D Major", vi: "E Minor" },
    "D Major": { I: "D Major", ii: "E Minor", iii: "F# Minor", IV: "G Major", V: "A Major", vi: "B Minor" },
    "A Major": { I: "A Major", ii: "B Minor", iii: "C# Minor", IV: "D Major", V: "E Major", vi: "F# Minor" },
    "E Major": { I: "E Major", ii: "F# Minor", iii: "G# Minor", IV: "A Major", V: "B Major", vi: "C# Minor" },
    "B Major": { I: "B Major", ii: "C# Minor", iii: "D# Minor", IV: "E Major", V: "F# Major", vi: "G# Minor" },
    "F# Major": { I: "F# Major", ii: "G# Minor", iii: "Bb Minor", IV: "B Major", V: "Db Major", vi: "D# Minor" },
    "Db Major": { I: "Db Major", ii: "D# Minor", iii: "F Minor", IV: "F# Major", V: "Ab Major", vi: "Bb Minor" },
    "Ab Major": { I: "Ab Major", ii: "Bb Minor", iii: "C Minor", IV: "Db Major", V: "Eb Major", vi: "F Minor" },
    "Eb Major": { I: "Eb Major", ii: "F Minor", iii: "G Minor", IV: "Ab Major", V: "Bb Major", vi: "C Minor" },
    "Bb Major": { I: "Bb Major", ii: "C Minor", iii: "D Minor", IV: "Eb Major", V: "F Major", vi: "G Minor" },
    "F Major": { I: "F Major", ii: "G Minor", iii: "A Minor", IV: "Bb Major", V: "C Major", vi: "D Minor" }
  };

  const PALETTE = {
    "C Major": "#ff0040", "A Minor": "#d4003a",
    "G Major": "#ff4000", "E Minor": "#d43700",
    "D Major": "#ff8000", "B Minor": "#d46d00",
    "A Major": "#ffbf00", "F# Minor": "#d4a200",
    "E Major": "#ffff00", "C# Minor": "#d4d400",
    "B Major": "#bfff00", "G# Minor": "#a2d400",
    "F# Major": "#80ff00", "D# Minor": "#6dd400",
    "Db Major": "#40ff00", "Bb Minor": "#37d400",
    "Ab Major": "#00ff40", "F Minor": "#00d437",
    "Eb Major": "#00ff80", "C Minor": "#00d46d",
    "Bb Major": "#00ffbf", "G Minor": "#00d4a2",
    "F Major": "#00ffff", "D Minor": "#00d4d4"
  };

  const size = 580, cx = size / 2, cy = size / 2, rOuter = 260, rMid = 188, rInner = 116;
  const TWO_PI = Math.PI * 2, step = TWO_PI / 12;

  const diatonicChords = React.useMemo(() => new Set(Object.values(KEY_DEGREES[activeKey] || {})), [activeKey]);
  const invDegrees = React.useMemo(() => {
    const deg = KEY_DEGREES[activeKey] || {};
    return Object.fromEntries(Object.entries(deg).map(([k, v]) => [v, k]));
  }, [activeKey]);

  const sectorPath = (r1, r2, a0, a1) => {
    const c = a => ({ x: Math.cos(a), y: Math.sin(a) });
    const p0 = c(a0), p1 = c(a1);
    return `M ${p0.x * r2} ${p0.y * r2} A ${r2} ${r2} 0 0 1 ${p1.x * r2} ${p1.y * r2} L ${p1.x * r1} ${p1.y * r1} A ${r1} ${r1} 0 0 0 ${p0.x * r1} ${p0.y * r1} Z`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Chord Wheel</h3>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={activeKey}
          onChange={(e) => onKeyChange && onKeyChange(e.target.value)}
        >
          {Object.keys(KEY_DEGREES).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
          <g transform={`translate(${cx},${cy})`}>
            {MAJORS_ORDER.map((maj, i) => {
              const a0 = -Math.PI / 2 + i * step;
              const a1 = a0 + step;
              const min = MINOR_REL[maj];
              const isMajDiatonic = diatonicChords.has(maj);
              const isMinDiatonic = diatonicChords.has(min);
              const majRN = invDegrees[maj] || '';
              const minRN = invDegrees[min] || '';

              const majTx = Math.cos((a0 + a1) / 2) * ((rMid + rOuter) / 2);
              const majTy = Math.sin((a0 + a1) / 2) * ((rMid + rOuter) / 2);
              const minTx = Math.cos((a0 + a1) / 2) * ((rInner + rMid) / 2);
              const minTy = Math.sin((a0 + a1) / 2) * ((rInner + rMid) / 2);

              return (
                <React.Fragment key={maj}>
                  <g
                    opacity={isMajDiatonic ? 1 : 0.35}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => onChordSelect && onChordSelect(maj.replace(' Major', ''))}
                    draggable="true"
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', maj.replace(' Major', ''))}
                  >
                    <path d={sectorPath(rMid, rOuter, a0, a1)} fill={PALETTE[maj]} stroke="currentColor" strokeWidth="1" className="text-gray-800" />
                    <text x={majTx} y={majTy + 6} textAnchor="middle" fontFamily="Readex Pro" fontWeight="800" fontSize="18" fill="#fff" className="pointer-events-none">
                      {maj.replace(' Major', '')}
                    </text>
                    {majRN && <text x={majTx} y={majTy + 28} textAnchor="middle" fontFamily="Inclusive Sans" fontWeight="600" fontSize="14" fill="#fff" opacity="0.8" className="pointer-events-none">{majRN}</text>}
                  </g>
                  <g
                    opacity={isMinDiatonic ? 1 : 0.35}
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => onChordSelect && onChordSelect(min.replace(' Minor', 'm'))}
                    draggable="true"
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', min.replace(' Minor', 'm'))}
                  >
                    <path d={sectorPath(rInner, rMid, a0, a1)} fill={PALETTE[min]} stroke="currentColor" strokeWidth="1" className="text-gray-800" />
                    <text x={minTx} y={minTy + 5} textAnchor="middle" fontFamily="Readex Pro" fontWeight="800" fontSize="16" fill="#fff" className="pointer-events-none">
                      {min.replace(' Minor', 'm')}
                    </text>
                    {minRN && <text x={minTx} y={minTy + 24} textAnchor="middle" fontFamily="Inclusive Sans" fontWeight="600" fontSize="12" fill="#fff" opacity="0.8" className="pointer-events-none">{minRN}</text>}
                  </g>
                </React.Fragment>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

const SONG_LIBRARY = [
  {
    id: 1,
    title: "Happy Birthday",
    artist: "Traditional",
    difficulty: 1,
    chords: ["C", "F", "G"],
    pattern: [
      {chord: "C", beats: 4}, {chord: "C", beats: 4}, 
      {chord: "F", beats: 4}, {chord: "C", beats: 4},
      {chord: "G", beats: 4}, {chord: "F", beats: 4}, 
      {chord: "C", beats: 4}
    ],
    bpm: 120,
    description: "Perfect first song! Uses just 3 chords."
  },
  {
    id: 2,
    title: "Twinkle Twinkle",
    artist: "Traditional", 
    difficulty: 1,
    chords: ["C", "F", "G"],
    pattern: [
      {chord: "C", beats: 4}, {chord: "C", beats: 4}, 
      {chord: "F", beats: 4}, {chord: "F", beats: 4},
      {chord: "G", beats: 4}, {chord: "G", beats: 4}, 
      {chord: "C", beats: 4}
    ],
    bpm: 100,
    description: "Great for practicing chord changes."
  },
  {
    id: 3,
    title: "Stand By Me",
    artist: "Ben E. King",
    difficulty: 2,
    chords: ["G", "Em", "C", "D"],
    pattern: [
      {chord: "G", beats: 4}, {chord: "G", beats: 4}, 
      {chord: "Em", beats: 4}, {chord: "Em", beats: 4},
      {chord: "C", beats: 4}, {chord: "D", beats: 4}, 
      {chord: "G", beats: 4}, {chord: "G", beats: 4}
    ],
    bpm: 120,
    description: "Classic progression - sounds amazing!"
  }
];

// --- Audio Context ---
let audioCtx;
const ensureAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

const noteToFreq = (note) => {
  const noteMap = { 
    "C": 16.35, "C#": 17.32, "D": 18.35, "D#": 19.45, "E": 20.60, "F": 21.83,
    "F#": 23.12, "G": 24.50, "G#": 25.96, "A": 27.50, "A#": 29.14, "B": 30.87
  };
  const octave = parseInt(note.slice(-1)) || 4;
  const noteName = note.replace(/\d/, '');
  return noteMap[noteName] * Math.pow(2, octave);
};

const playNote = (note, duration = 0.5, instrument = 'piano', delay = 0) => {
  const ctx = ensureAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  setTimeout(() => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = instrument === 'guitar' ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(noteToFreq(note), ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }, delay);
};

const playChord = (chordKey, instrument, hand = 'rightHand', style = 'block') => {
  const chordData = CHORD_DATA[instrument][chordKey];
  if (!chordData) return;
  if (instrument === 'piano') {
    const handData = chordData[hand];
    if (style === 'arpeggio') {
      handData.notes.forEach((note, i) => {
        playNote(note, 1.0, 'piano', i * 150);
      });
    } else {
      handData.notes.forEach((note) => {
        playNote(note, 1.0, 'piano');
      });
    }
  } else {
    const playableNotes = chordData.notes.filter(note => note !== "");
    if (style === 'strum') {
      playableNotes.forEach((note, i) => {
        playNote(note, 1.2, 'guitar', i * 50);
      });
    } else {
      playableNotes.forEach((note) => {
        playNote(note, 1.2, 'guitar');
      });
    }
  }
};

// --- Enhanced Components ---
const ProgressBar = ({ current, total, label, color = "blue" }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm text-gray-500">{current}/{total}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className={`progress-fill bg-gradient-to-r from-${color}-400 to-${color}-600 h-3 rounded-full`}
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

const PracticeModeComponent = ({ currentChord, onChordChange, selectedInstrument, selectedKey, userLevel, completedLessons }) => {
  const [practiceMode, setPracticeMode] = useState('chord-trainer');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [exerciseChords, setExerciseChords] = useState([]);

  // Generate exercises based on user level and progress
  const getAvailableChords = () => {
    const levelChords = {
      beginner: ['C', 'G', 'Am', 'F', 'Dm', 'Em'],
      intermediate: ['C7', 'G7', 'Am7', 'F7', 'Bm', 'F#m', 'B', 'F#'],
      advanced: ['Cmaj9', 'G13', 'Am11', 'Fmaj7', 'Dm7', 'Em7', 'Cmaj7']
    };
    return levelChords[userLevel] || levelChords.beginner;
  };

  const exercises = {
    'chord-trainer': {
      name: 'Level-Based Chord Trainer',
      description: `Practice ${userLevel} level chords`,
      generateChords: () => {
        const availableChords = getAvailableChords();
        return availableChords.slice(0, 4);
      }
    },
    'progression-practice': {
      name: 'Progression Practice', 
      description: 'Master chord progressions for your level',
      generateChords: () => {
        if (userLevel === 'beginner') {
          return ['C', 'Am', 'F', 'G']; // I-vi-IV-V
        } else if (userLevel === 'intermediate') {
          return ['Dm7', 'G7', 'Cmaj7', 'Am7']; // ii-V-I-vi
        } else {
          return ['Cmaj9', 'Am11', 'Fmaj7', 'G13']; // Advanced jazz
        }
      }
    },
    'lesson-review': {
      name: 'Lesson Review',
      description: 'Review chords from completed lessons',
      generateChords: () => {
        const lessonChords = [];
        completedLessons.forEach(lessonId => {
          const [level, id] = lessonId.split('-');
          const lesson = LEARNING_PATHWAY[level]?.lessons.find(l => l.id === id);
          if (lesson && lesson.chords) {
            lessonChords.push(...lesson.chords);
          }
        });
        return [...new Set(lessonChords)].slice(0, 6); // Remove duplicates
      }
    },
    'challenge': {
      name: 'Challenge Mode',
      description: 'Test all your knowledge',
      generateChords: () => {
        const availableChords = getAvailableChords();
        return availableChords.sort(() => Math.random() - 0.5).slice(0, 6);
      }
    }
  };

  const getKeyChords = (key, instrument) => {
    const keyMap = {
      'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
      'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em'],
      'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm'],
      'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
      'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
      'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm']
    };
    return keyMap[key] || keyMap['C'];
  };

  const startExercise = () => {
    const chords = exercises[practiceMode].generateChords();
    setExerciseChords(chords);
    setCurrentExercise(0);
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    onChordChange(chords[0]);
  };

  const nextChord = () => {
    if (currentExercise < exerciseChords.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setScore(prev => prev + 1);
      onChordChange(exerciseChords[currentExercise + 1]);
    } else {
      // Exercise complete
      setIsActive(false);
      alert(`Exercise complete! Score: ${score + 1}/${exerciseChords.length}`);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert(`Time's up! Score: ${score}/${exerciseChords.length}`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, score, exerciseChords.length]);

  return (
    <div className="space-y-4">
      {/* Level indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border">
        <div className="text-sm font-medium text-gray-700">Current Level: <span className="capitalize text-blue-600">{userLevel}</span></div>
        <div className="text-xs text-gray-600 mt-1">{completedLessons.length} lessons completed</div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(exercises).map(([key, exercise]) => {
          const isAvailable = key !== 'lesson-review' || completedLessons.length > 0;
          return (
            <button
              key={key}
              onClick={() => setPracticeMode(key)}
              disabled={!isAvailable}
              className={`p-3 rounded-lg text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                practiceMode === key 
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                  : isAvailable
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-50 text-gray-400'
              }`}
            >
              <div className="font-semibold">{exercise.name}</div>
              <div className="text-sm opacity-75">{exercise.description}</div>
              {key === 'lesson-review' && completedLessons.length === 0 && (
                <div className="text-xs text-gray-500 mt-1">Complete lessons to unlock</div>
              )}
            </button>
          );
        })}
      </div>

      {!isActive ? (
        <button
          onClick={startExercise}
          className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
        >
          Start {exercises[practiceMode].name}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="font-semibold">Current Chord: {exerciseChords[currentExercise]}</div>
              <div className="text-sm text-gray-600">
                Progress: {currentExercise + 1}/{exerciseChords.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
              <div className="text-sm text-gray-600">Score: {score}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={nextChord}
              className="flex-1 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600"
            >
              Got It! Next Chord
            </button>
            <button
              onClick={() => setIsActive(false)}
              className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600"
            >
              Stop
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Upcoming chords:</div>
            <div className="flex gap-2 justify-center flex-wrap">
              {exerciseChords.slice(currentExercise + 1).map((chord, i) => (
                <span key={i} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">
                  {chord}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MetronomeComponent = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  const playClick = (isAccent = false) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(isAccent ? 1000 : 800, ctx.currentTime);
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  };

  const startStop = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setCurrentBeat(0);
    } else {
      setIsPlaying(true);
      setCurrentBeat(1);
      playClick(true); // First beat accent
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prev => {
          const nextBeat = prev >= 4 ? 1 : prev + 1;
          playClick(nextBeat === 1);
          return nextBeat;
        });
      }, (60 / bpm) * 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prev => {
          const nextBeat = prev >= 4 ? 1 : prev + 1;
          playClick(nextBeat === 1);
          return nextBeat;
        });
      }, (60 / bpm) * 1000);
    }
  }, [bpm, isPlaying]);

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-3xl font-bold mb-2" style={{ color: isPlaying ? '#10b981' : '#6b7280' }}>
          {bpm} BPM
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4].map(beat => (
            <div key={beat} className={`w-4 h-4 rounded-full ${
              currentBeat === beat ? 'bg-red-500' : 'bg-gray-300'
            }`}></div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <input 
          type="range" 
          min="60" 
          max="200" 
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>60</span>
          <span>200</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={startStop}
          className={`flex-1 py-2 px-4 rounded font-medium ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPlaying ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={() => setBpm(120)}
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <div>Preset tempos:</div>
        <div className="flex gap-1 mt-1 flex-wrap justify-center">
          {[{name: 'Slow', bpm: 80}, {name: 'Medium', bpm: 120}, {name: 'Fast', bpm: 160}].map(preset => (
            <button key={preset.name}
              onClick={() => setBpm(preset.bpm)}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              {preset.name} ({preset.bpm})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const EnhancedGuitarDiagram = ({ chord, onPlay, onInteract, mode = 'normal', interactive = true }) => {
  const chordData = CHORD_DATA.guitar[chord];
  if (!chordData) return <div>Chord not found</div>;

  const [strumming, setStrumming] = useState(false);
  const [strumDirection, setStrumDirection] = useState('down');
  const [highlights, setHighlights] = useState([]);

  const isPlayerMirrored = mode === 'player-mirrored';
  const isLeftHanded = mode === 'left-handed';
  
  // Normal mode: vertical layout with nut at top
  // Player-mirrored: horizontal layout with strings flipped
  // Left-handed: horizontal layout with nut on left, strings reversed
  const stringPos = (stringIndex) => {
    if (mode === 'normal') {
      return `${(stringIndex / 5) * 85 + 7.5}%`; // vertical: left to right
    } else if (mode === 'left-handed') {
      return `${((5 - stringIndex) / 5) * 85 + 7.5}%`; // horizontal: bottom to top (reversed)
    } else {
      return `${(stringIndex / 5) * 85 + 7.5}%`; // horizontal: top to bottom
    }
  };
  const fretPos = (fret) => `${((fret - 0.5) / 6) * 100}%`;

  const handleStrum = (direction = 'down') => {
    setStrumming(true);
    setStrumDirection(direction);
    onPlay(direction);
    setTimeout(() => setStrumming(false), 400);
  };

  const handleFretClick = (stringIndex, fret) => {
    if (!interactive) return;
    const note = chordData.notes[stringIndex];
    if (note) {
      playNote(note, 0.8, 'guitar');
      const highlightId = Date.now() + stringIndex;
      const highlight = {
        id: highlightId,
        stringIndex,
        fret,
        style: (isPlayerMirrored || isLeftHanded) ? {
          top: stringPos(stringIndex),
          left: fretPos(fret)
        } : {
          left: stringPos(stringIndex),
          top: fretPos(fret)
        }
      };
      setHighlights(prev => [...prev, highlight]);
      setTimeout(() => {
        setHighlights(prev => prev.filter(h => h.id !== highlightId));
      }, 600);
      if (onInteract) onInteract(stringIndex, fret, note);
    }
  };

  const stringCount = 6;
  const fretCount = 5;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800" style={{ color: chordData.color }}>
          {chordData.name}
        </h3>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(chordData.difficulty)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">⭐</span>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {isLeftHanded ? 'Left-handed (nut left)' : isPlayerMirrored ? 'Player mirrored' : 'Normal'}
          </span>
          {interactive && <span className="text-xs bg-blue-100 px-2 py-1 rounded">Interactive</span>}
        </div>
      </div>
      <div className={`guitar-fretboard relative mx-auto ${(isPlayerMirrored || isLeftHanded) ? 'w-96 h-80' : 'w-80 h-96'}`}>
        {strumming && (
          <div className={`strum-line strum-animate-${strumDirection} ${(isPlayerMirrored || isLeftHanded) ? 'w-full h-1' : 'w-1 h-full'}`}
               style={(isPlayerMirrored || isLeftHanded) ? { top: '50%' } : { left: '50%' }}></div>
        )}
        {/* Nut */}
        <div className={`guitar-nut absolute z-20 ${
          isPlayerMirrored 
            ? 'w-4 h-full left-0'
            : isLeftHanded
            ? 'w-4 h-full left-0'
            : 'h-4 w-full top-0'
        }`}></div>
        {/* Frets */}
        {[1, 2, 3, 4, 5].map(fret => (
          <div key={fret} 
               className={`guitar-fret absolute z-10 ${
                 (isPlayerMirrored || isLeftHanded) ? 'w-0.5 h-full' : 'h-0.5 w-full'
               }`}
               style={(isPlayerMirrored || isLeftHanded)
                 ? { left: `${(fret / 6) * 100}%` }
                 : { top: `${(fret / 6) * 100}%` }
               }>
          </div>
        ))}
        {/* Strings */}
        {[0, 1, 2, 3, 4, 5].map(string => {
          const thickness = [4, 3.5, 3, 2.5, 2, 1.5]; // Low E to High E
          return (
            <div key={string} 
                 className="guitar-string absolute z-5"
                 style={(isPlayerMirrored || isLeftHanded) ? {
                   top: stringPos(string),
                   left: 0,
                   right: 0,
                   height: `${thickness[string]}px`
                 } : {
                   left: stringPos(string),
                   top: 0,
                   bottom: 0,
                   width: `${thickness[string]}px`
                 }}>
            </div>
          );
        })}
        {/* Interactive fret areas */}
        {interactive && (
          <div className="absolute inset-0 z-30 grid"
               style={(isPlayerMirrored || isLeftHanded) ? {
                 gridTemplateColumns: `repeat(${fretCount}, 1fr)`,
                 gridTemplateRows: `repeat(${stringCount}, 1fr)`
               } : {
                 gridTemplateColumns: `repeat(${stringCount}, 1fr)`,
                 gridTemplateRows: `repeat(${fretCount}, 1fr)`
               }}>
            {[...Array(stringCount * fretCount)].map((_, i) => {
              const stringIndex = (isPlayerMirrored || isLeftHanded) ? Math.floor(i / fretCount) : i % stringCount;
              const fret = (isPlayerMirrored || isLeftHanded) ? (i % fretCount) + 1 : Math.floor(i / stringCount) + 1;
              return (
                <div key={i} 
                     className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-30" 
                     onClick={() => handleFretClick(stringIndex, fret)}>
                </div>
              );
            })}
          </div>
        )}
        {/* Finger positions */}
        {chordData.frets.map((fret, string) => {
          if (fret <= 0) return null;
          return (
            <div key={string}
                 className="guitar-dot absolute rounded-full flex items-center justify-center text-white font-bold text-sm z-40"
                 style={(isPlayerMirrored || isLeftHanded) ? {
                   width: '32px',
                   height: '32px',
                   top: stringPos(string),
                   left: fretPos(fret),
                   transform: 'translate(-50%, -50%)',
                   backgroundColor: chordData.color
                 } : {
                   width: '32px',
                   height: '32px',
                   left: stringPos(string),
                   top: fretPos(fret),
                   transform: 'translate(-50%, -50%)',
                   backgroundColor: chordData.color
                 }}>
              {chordData.fingers[string]}
            </div>
          );
        })}
        {/* Open/Muted indicators */}
        {chordData.frets.map((fret, string) => {
          const symbol = fret === 0 ? 'O' : fret === -1 ? 'X' : '';
          if (!symbol) return null;
          return (
            <div key={string}
                 className={`absolute text-xl font-bold z-40 ${fret === 0 ? 'text-green-600' : 'text-red-600'}`}
                 style={isPlayerMirrored ? {
                   top: stringPos(string),
                   left: isLeftHanded ? '96%' : '-8%',
                   transform: 'translate(-50%, -50%)'
                 } : {
                   left: stringPos(string),
                   top: '-8%',
                   transform: 'translate(-50%, -50%)'
                 }}>
              {symbol}
            </div>
          );
        })}
        {/* Note highlights */}
        {highlights.map(highlight => (
          <div key={highlight.id}
               className="note-highlight absolute"
               style={{
                 ...highlight.style,
                 width: '40px',
                 height: '40px',
                 transform: 'translate(-50%, -50%)'
               }}>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex gap-2">
          <button 
            onClick={() => handleStrum('down')}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transform transition-transform hover:scale-105"
            aria-label="Strum down">
            🎸 Strum Down
          </button>
          <button 
            onClick={() => handleStrum('up')}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600 transform transition-transform hover:scale-105"
            aria-label="Strum up">
            🎸 Strum Up
          </button>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Notes: {chordData.notes.filter(n => n).join(' - ')}</div>
          {interactive && <div className="text-xs text-blue-600">Click frets to hear individual notes!</div>}
        </div>
      </div>
    </div>
  );
};

const EnhancedPianoDiagram = ({ chord, onPlay, hand = 'rightHand', interactive = true }) => {
  const chordData = CHORD_DATA.piano[chord];
  if (!chordData) return <div>Chord not found</div>;
  const handData = chordData[hand];
  const [activeKeys, setActiveKeys] = useState([]);
  const [playingNotes, setPlayingNotes] = useState([]);
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'];
  const blackKeys = [
    { note: 'C#', position: 0.7 }, { note: 'D#', position: 1.7 },
    { note: 'F#', position: 3.7 }, { note: 'G#', position: 4.7 }, 
    { note: 'A#', position: 5.7 }, { note: 'C#', position: 7.7 }, 
    { note: 'D#', position: 8.7 }
  ];
  const handleKeyClick = (key, octave = 4) => {
    const fullNote = key + octave;
    playNote(fullNote, 1.0, 'piano');
    setActiveKeys(prev => [...prev, fullNote]);
    setTimeout(() => {
      setActiveKeys(prev => prev.filter(k => k !== fullNote));
    }, 300);
    setPlayingNotes(prev => [...prev, fullNote]);
    setTimeout(() => {
      setPlayingNotes(prev => prev.filter(n => n !== fullNote));
    }, 1000);
  };
  const isChordNote = (note) => handData.notes.some(n => n.startsWith(note));
  const getFingerNumber = (note) => {
    const index = handData.notes.findIndex(n => n.startsWith(note));
    return index >= 0 ? handData.fingers[index] : null;
  };
  const isBlackKey = (note) => note.includes('#');
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800" style={{ color: chordData.color }}>
          {chordData.name}
        </h3>
        <p className="text-gray-600">
          {hand === 'rightHand' ? 'Right Hand' : 'Left Hand'}
        </p>
        <div className="mt-2 text-sm">
          <p className="font-semibold text-gray-700">Step-by-step:</p>
          {handData.notes.map((note, i) => {
            const noteName = note.replace(/\d/, '');
            const finger = handData.fingers[i];
            return (
              <div key={i} className="inline-block mx-2 my-1">
                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: chordData.color, color: 'white' }}>
                  Finger {finger} → {noteName}
                </span>
              </div>
            );
          })}
        </div>
        {interactive && <p className="text-xs text-blue-600 mt-2">Click the highlighted keys to practice!</p>}
      </div>
      <div className="piano-keyboard relative mx-auto max-w-4xl h-48 rounded-lg overflow-hidden">
        {/* White keys */}
        {whiteKeys.map((key, index) => {
          const octave = index >= 7 ? 5 : 4;
          const fullNote = key + octave;
          const isChord = isChordNote(key);
          const fingerNumber = isChord ? getFingerNumber(key) : null;
          const isActive = activeKeys.includes(fullNote);
          const isPlaying = playingNotes.includes(fullNote);
          return (
            <div key={`${key}-${index}`}
                 className={`piano-white-key absolute h-full cursor-pointer ${isActive || isChord ? 'active' : ''}`}
                 style={{ 
                   left: `${(index / 11) * 100}%`, 
                   width: `${100 / 11}%`,
                   backgroundColor: isPlaying ? '#dbeafe' : undefined
                 }}
                 onClick={() => interactive && handleKeyClick(key, octave)}>
              {fingerNumber && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                     style={{ backgroundColor: chordData.color }}>
                  {fingerNumber}
                </div>
              )}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">
                {key}
              </div>
            </div>
          );
        })}
        {/* Black keys */}
        {blackKeys.map(({ note, position }, index) => {
          const octave = position >= 7 ? 5 : 4;
          const fullNote = note + octave;
          const isChord = isChordNote(note);
          const fingerNumber = isChord ? getFingerNumber(note) : null;
          const isActive = activeKeys.includes(fullNote);
          const isPlaying = playingNotes.includes(fullNote);
          return (
            <div key={`${note}-${index}`}
                 className={`piano-black-key absolute cursor-pointer z-10 ${isActive || isChord ? 'active' : ''}`}
                 style={{ 
                   left: `${(position / 11) * 100}%`, 
                   width: `${80 / 11}%`,
                   height: '60%',
                   backgroundColor: isPlaying ? '#1e40af' : undefined
                 }}
                 onClick={() => interactive && handleKeyClick(note.replace('#', '#'), octave)}>
              {fingerNumber && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-xs"
                     style={{ backgroundColor: chordData.color, border: '2px solid white' }}>
                  {fingerNumber}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex gap-2">
          <button 
            onClick={() => onPlay('block', hand)}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transform transition-transform hover:scale-105"
            aria-label="Play chord">
            🎹 Play Chord
          </button>
          <button 
            onClick={() => onPlay('arpeggio', hand)}
            className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-red-600 transform transition-transform hover:scale-105"
            aria-label="Play arpeggio">
            🎹 Play Arpeggio
          </button>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">
            Notes: {handData.notes.join(' - ')}
          </div>
        </div>
      </div>
    </div>
  );
};

const SongPlayAlong = ({ song, instrument, onChordChange, hand = 'rightHand' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const intervalRef = useRef();
  const currentChord = song.pattern[currentChordIndex];
  const nextChord = song.pattern[(currentChordIndex + 1) % song.pattern.length];
  const beatsPerSecond = song.bpm / 60;
  const startPlayAlong = () => {
    setIsPlaying(true);
    setCurrentChordIndex(0);
    setProgress(0);
    onChordChange(song.pattern[0].chord);
    let startTime = Date.now();
    let currentIndex = 0;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const currentChordInfo = song.pattern[currentIndex];
      const currentDuration = (currentChordInfo.beats / beatsPerSecond) * 1000;
      const newProgress = Math.min((elapsed / currentDuration) * 100, 100);
      setProgress(newProgress);
      setTimeRemaining(Math.ceil((currentDuration - elapsed) / 1000));
      if (elapsed >= currentDuration) {
        currentIndex = (currentIndex + 1) % song.pattern.length;
        setCurrentChordIndex(currentIndex);
        onChordChange(song.pattern[currentIndex].chord);
        startTime = Date.now();
        setTimeout(() => {
          playChord(song.pattern[currentIndex].chord, instrument, hand);
        }, 100);
      }
    };
    intervalRef.current = setInterval(tick, 50);
    setTimeout(() => {
      playChord(song.pattern[0].chord, instrument, hand);
    }, 100);
  };
  const stopPlayAlong = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setProgress(0);
    setTimeRemaining(0);
  };
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">🎵 Play Along: {song.title}</h3>
        <p className="text-gray-600">{song.artist} - {song.bpm} BPM</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Current Chord</div>
          <div className="text-2xl font-bold" style={{ color: CHORD_DATA[instrument][currentChord.chord]?.color }}>
            {currentChord.chord}
          </div>
          <div className="text-sm text-gray-500">{currentChord.beats} beats</div>
          {isPlaying && (
            <div className="text-lg font-bold text-blue-600 mt-2">
              {timeRemaining}s
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Next Chord</div>
          <div className="text-xl font-bold text-gray-500">
            {nextChord.chord}
          </div>
          <div className="text-xs text-gray-400">{nextChord.beats} beats</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="playalong-progress h-full rounded-full"
               style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Chord {currentChordIndex + 1} of {song.pattern.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button 
          onClick={isPlaying ? stopPlayAlong : startPlayAlong}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}>
          {isPlaying ? '⏹️ Stop' : '▶️ Start Play Along'}
        </button>
        <button 
          onClick={() => playChord(currentChord.chord, instrument, hand)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
          🎵 Play Current Chord
        </button>
      </div>
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Song Pattern:</div>
        <div className="flex flex-wrap gap-2">
          {song.pattern.map((chordInfo, index) => (
            <span key={index} 
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    index === currentChordIndex && isPlaying
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
              {chordInfo.chord}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Learning Pathway System ---
const LEARNING_PATHWAY = {
  beginner: {
    name: 'Beginner',
    description: 'Start your musical journey',
    color: 'green',
    lessons: [
      {
        id: 'basics',
        title: 'Music Basics',
        description: 'Learn fundamental concepts',
        chords: [],
        theory: 'Understanding notes, scales, and chord construction'
      },
      {
        id: 'first-chords',
        title: 'Your First Chords',
        description: 'Master the essential beginner chords',
        chords: ['C', 'G', 'Am', 'F'],
        theory: 'Major and minor chords form the foundation of most music'
      },
      {
        id: 'chord-changes',
        title: 'Chord Transitions',
        description: 'Learn to switch between chords smoothly',
        chords: ['C', 'G', 'Am', 'F'],
        theory: 'Smooth transitions are key to playing songs fluently'
      }
    ]
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Expand your chord vocabulary',
    color: 'blue',
    lessons: [
      {
        id: 'seventh-chords',
        title: 'Seventh Chords',
        description: 'Add sophistication with 7th chords',
        chords: ['C7', 'G7', 'Am7', 'F7'],
        theory: 'Seventh chords add color and tension to progressions'
      },
      {
        id: 'barre-chords',
        title: 'Barre Chords (Guitar)',
        description: 'Unlock the full fretboard',
        chords: ['Bm', 'F#m', 'B', 'F#'],
        theory: 'Barre chords allow you to play in any key'
      },
      {
        id: 'jazz-progressions',
        title: 'Jazz Progressions',
        description: 'Explore ii-V-I and other jazz patterns',
        chords: ['Dm7', 'G7', 'Cmaj7'],
        theory: 'Jazz progressions use sophisticated harmonic movement'
      }
    ]
  },
  advanced: {
    name: 'Advanced',
    description: 'Master complex harmony',
    color: 'purple',
    lessons: [
      {
        id: 'extended-chords',
        title: 'Extended Chords',
        description: '9th, 11th, and 13th chords',
        chords: ['Cmaj9', 'G13', 'Am11'],
        theory: 'Extended chords create rich, complex harmonies'
      },
      {
        id: 'modal-harmony',
        title: 'Modal Harmony',
        description: 'Explore different musical modes',
        chords: ['Dm', 'Em', 'Fmaj7', 'G'],
        theory: 'Modes provide different emotional colors to music'
      }
    ]
  }
};

// --- Learning Components ---
const LearningPathwayComponent = ({ userLevel, onLevelChange, onLessonSelect, completedLessons }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">🎓 Learning Pathway</h3>
      
      <div className="space-y-6">
        {Object.entries(LEARNING_PATHWAY).map(([level, data]) => {
          const isUnlocked = level === 'beginner' || 
            (level === 'intermediate' && completedLessons.filter(l => l.startsWith('beginner')).length >= 2) ||
            (level === 'advanced' && completedLessons.filter(l => l.startsWith('intermediate')).length >= 2);
          
          return (
            <div key={level} className={`border-2 rounded-lg p-4 transition-all ${
              userLevel === level 
                ? `border-${data.color}-500 bg-${data.color}-50` 
                : isUnlocked 
                  ? 'border-gray-200 hover:border-gray-300 cursor-pointer'
                  : 'border-gray-100 bg-gray-50 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    isUnlocked ? `bg-${data.color}-500` : 'bg-gray-400'
                  }`}>
                    {level === 'beginner' ? '1' : level === 'intermediate' ? '2' : '3'}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{data.name}</h4>
                    <p className="text-sm text-gray-600">{data.description}</p>
                  </div>
                </div>
                {isUnlocked && (
                  <button
                    onClick={() => onLevelChange(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      userLevel === level
                        ? `bg-${data.color}-500 text-white`
                        : `bg-${data.color}-100 text-${data.color}-700 hover:bg-${data.color}-200`
                    }`}
                  >
                    {userLevel === level ? 'Current' : 'Select'}
                  </button>
                )}
              </div>
              
              {userLevel === level && (
                <div className="mt-4 space-y-3">
                  {data.lessons.map((lesson, index) => {
                    const lessonId = `${level}-${lesson.id}`;
                    const isCompleted = completedLessons.includes(lessonId);
                    const isAvailable = index === 0 || completedLessons.includes(`${level}-${data.lessons[index-1].id}`);
                    
                    return (
                      <div key={lesson.id} className={`p-3 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200'
                          : isAvailable 
                            ? 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer'
                            : 'bg-gray-50 border-gray-100 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${
                                isCompleted ? 'text-green-600' : isAvailable ? 'text-gray-700' : 'text-gray-400'
                              }`}>
                                Lesson {index + 1}: {lesson.title}
                              </span>
                              {isCompleted && <span className="text-green-500">✓</span>}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{lesson.description}</p>
                            {lesson.chords.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {lesson.chords.map(chord => (
                                  <span key={chord} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                    {chord}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {isAvailable && (
                            <button
                              onClick={() => onLessonSelect(lessonId, lesson)}
                              className={`px-3 py-1 rounded text-sm font-medium ${
                                isCompleted 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              {isCompleted ? 'Review' : 'Start'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LessonComponent = ({ lesson, lessonId, onComplete, onBack, selectedInstrument }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonProgress, setLessonProgress] = useState(0);
  
  const steps = [
    {
      type: 'theory',
      title: 'Learn the Theory',
      content: lesson.theory
    },
    ...(lesson.chords.length > 0 ? lesson.chords.map(chord => ({
      type: 'practice',
      title: `Practice: ${chord}`,
      chord: chord
    })) : []),
    {
      type: 'assessment',
      title: 'Quick Assessment',
      content: 'Test your knowledge'
    }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setLessonProgress(((currentStep + 1) / steps.length) * 100);
    } else {
      onComplete(lessonId);
    }
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Pathway
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
          <p className="text-gray-600">{lesson.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${lessonProgress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{currentStepData.title}</h3>
        
        {currentStepData.type === 'theory' && (
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-blue-800">
              <h4 className="font-semibold mb-2">💡 Theory</h4>
              <p>{currentStepData.content}</p>
            </div>
          </div>
        )}
        
        {currentStepData.type === 'practice' && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🎯 Practice Time</h4>
              <p className="text-green-700">Practice the {currentStepData.chord} chord. Take your time to get comfortable with the finger positions.</p>
            </div>
            
            {/* Chord diagram would go here */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">{currentStepData.chord}</div>
              <p className="text-gray-600">Chord diagram for {selectedInstrument}</p>
            </div>
          </div>
        )}
        
        {currentStepData.type === 'assessment' && (
          <div className="bg-yellow-50 rounded-lg p-6">
            <div className="text-yellow-800">
              <h4 className="font-semibold mb-2">📝 Quick Check</h4>
              <p>Can you play all the chords from this lesson smoothly? Practice switching between them a few times.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {lesson.chords.map(chord => (
                  <span key={chord} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded">
                    {chord}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          Previous
        </button>
        
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          {currentStep === steps.length - 1 ? 'Complete Lesson' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
function EnhancedUltimateChordApp() {
  const [studentName, setStudentName] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [currentView, setCurrentView] = useState('welcome');
  const [currentChord, setCurrentChord] = useState(null);
  const [userProgress, setUserProgress] = useState({ chords: [], songsCompleted: [], level: 1 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedKey, setSelectedKey] = useState('C Major');
  const [progression, setProgression] = useState([]);
  const [achievements, setAchievements] = useState([]);
  // Enhanced settings
  const [pianoHand, setPianoHand] = useState('rightHand');
  const [guitarMode, setGuitarMode] = useState('normal');
  const [interactiveMode, setInteractiveMode] = useState(true);
  // Learning pathway state
  const [userLevel, setUserLevel] = useState('beginner');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const startLearning = () => {
    if (studentName && selectedInstrument) {
      setCurrentView('dashboard');
    }
  };
  const markChordLearned = (chord) => {
    if (!userProgress.chords.includes(chord)) {
      const newChords = [...userProgress.chords, chord];
      setUserProgress(prev => ({
        ...prev,
        chords: newChords
      }));
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      // Check for achievements
      if (newChords.length === 1 && !achievements.includes('FIRST_CHORD')) {
        setAchievements(prev => [...prev, 'FIRST_CHORD']);
        setTimeout(() => alert('🎉 Achievement Unlocked: First Chord Learned!'), 500);
      }
      if (newChords.length === 5 && !achievements.includes('FIVE_CHORDS')) {
        setAchievements(prev => [...prev, 'FIVE_CHORDS']);
        setTimeout(() => alert('🎉 Achievement Unlocked: Chord Collector - 5 chords learned!'), 500);
      }
      if (newChords.length === 10 && !achievements.includes('TEN_CHORDS')) {
        setAchievements(prev => [...prev, 'TEN_CHORDS']);
        setTimeout(() => alert('🎉 Achievement Unlocked: Chord Master - 10 chords learned!'), 500);
      }
    }
  };
  const practiceChord = (chord) => {
    setCurrentChord(chord);
    setCurrentView('practice');
  };
  const learnSong = (song) => {
    setSelectedSong(song);
    setCurrentChord(song.pattern[0].chord);
    setCurrentView('songs');
  };
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-readex text-gray-800 mb-2">🎵 Enhanced Chord Master</h1>
            <p className="text-gray-600">Learn chords with interactive features!</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What's your name?</label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose your instrument</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedInstrument('guitar')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedInstrument === 'guitar' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="text-3xl mb-2">🎸</div>
                  <div className="font-semibold">Guitar</div>
                  <div className="text-xs text-gray-500">Interactive fretboard</div>
                </button>
                <button 
                  onClick={() => setSelectedInstrument('piano')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedInstrument === 'piano' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="text-3xl mb-2">🎹</div>
                  <div className="font-semibold">Piano</div>
                  <div className="text-xs text-gray-500">Left & right hand</div>
                </button>
              </div>
            </div>
            <button 
              onClick={startLearning}
              disabled={!studentName || !selectedInstrument}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-colors">
              Start Learning! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-2xl font-bold font-readex text-gray-800 hover:text-blue-600 transition-colors">
              🎵 Enhanced Chord Master
            </button>
            <span className="text-gray-400">|</span>
            <span className="text-lg text-gray-700">Hey {studentName}! 👋</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Instrument Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setSelectedInstrument('guitar')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  selectedInstrument === 'guitar' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">🎸</span>
                <span className="font-medium">Guitar</span>
              </button>
              <button
                onClick={() => setSelectedInstrument('piano')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  selectedInstrument === 'piano' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">🎹</span>
                <span className="font-medium">Piano</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-6">
            {['dashboard', 'learn', 'practice', 'songs'].map(view => (
              <button key={view}
                      onClick={() => {
                        setCurrentView(view);
                        if (view !== 'learn') {
                          setCurrentLesson(null);
                          setCurrentLessonId(null);
                        }
                      }}
                      className={`py-2 px-4 font-medium capitalize transition-colors ${
                        currentView === view 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}>
                {view === 'learn' ? '🎓 Learn' : view}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Learn View */}
        {currentView === 'learn' && (
          <div className="max-w-4xl mx-auto">
            {!currentLesson ? (
              <LearningPathwayComponent 
                userLevel={userLevel}
                onLevelChange={setUserLevel}
                onLessonSelect={(lessonId, lesson) => {
                  setCurrentLessonId(lessonId);
                  setCurrentLesson(lesson);
                }}
                completedLessons={completedLessons}
              />
            ) : (
              <LessonComponent 
                lesson={currentLesson}
                lessonId={currentLessonId}
                selectedInstrument={selectedInstrument}
                onComplete={(lessonId) => {
                  setCompletedLessons(prev => [...prev, lessonId]);
                  setCurrentLesson(null);
                  setCurrentLessonId(null);
                  // Achievement for completing first lesson
                  if (completedLessons.length === 0) {
                    setTimeout(() => alert('🎉 Achievement: First Lesson Complete!'), 500);
                  }
                }}
                onBack={() => {
                  setCurrentLesson(null);
                  setCurrentLessonId(null);
                }}
              />
            )}
          </div>
        )}
        
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-readex text-gray-800 mb-6">Your Learning Journey</h2>
              {/* Progress Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Progress Overview</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{userProgress.chords.length}</div>
                    <div className="text-sm text-green-700">Chords Learned</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{userProgress.songsCompleted.length}</div>
                    <div className="text-sm text-blue-700">Songs Completed</div>
                  </div>
                </div>
                <ProgressBar 
                  current={userProgress.chords.length} 
                  total={6} 
                  label="Chord Progress"
                  color="green"
                />
              </div>
              {/* Feature highlights */}
              {/* Learning Progress */}
              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-8">
                <h3 className="text-xl font-semibold mb-4">📚 Learning Progress</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{completedLessons.length}</div>
                    <div className="text-sm opacity-90">Lessons Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold capitalize">{userLevel}</div>
                    <div className="text-sm opacity-90">Current Level</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="mb-2">Next milestone:</div>
                  <div className="bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (completedLessons.length % 3) * 33.33)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Quick Start Learning */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">🚀 Quick Start</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setCurrentView('learn')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                  >
                    <div className="font-semibold text-blue-800">Continue Learning Path</div>
                    <div className="text-sm text-blue-600">Structured lessons for {userLevel} level</div>
                  </button>
                  <button
                    onClick={() => setCurrentView('practice')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                  >
                    <div className="font-semibold text-green-800">Free Practice</div>
                    <div className="text-sm text-green-600">Practice any chord or exercise</div>
                  </button>
                </div>
              </div>
            </div>
            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Chord Wheel */}
              <ChordWheel 
                activeKey={selectedKey}
                onChordSelect={(ch) => { setCurrentChord(ch); setCurrentView('practice'); }}
                onKeyChange={setSelectedKey}
              />
              {/* Progression Builder */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Progression Builder</h3>
                <div 
                  onDrop={(e) => {
                    e.preventDefault();
                    const chordName = e.dataTransfer.getData('text/plain');
                    if (chordName && progression.length < 8) {
                      setProgression([...progression, chordName]);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="min-h-[80px] p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                >
                  <h4 className="font-bold mb-2 text-center text-gray-600">Drag Chords Here or Click the Wheel</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {progression.map((chord, i) => {
                      const chordData = CHORD_DATA[selectedInstrument]?.[chord];
                      const color = chordData?.color || '#6366f1';
                      return (
                        <div key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-white font-semibold" style={{backgroundColor: color}}>
                          <span>{chord}</span>
                          <button 
                            onClick={() => {
                              const newProgression = [...progression];
                              newProgression.splice(i, 1);
                              setProgression(newProgression);
                            }}
                            className="ml-1 text-white hover:text-red-200"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {progression.length === 0 && (
                    <p className="text-center text-gray-500 text-sm mt-2">Empty - drag chords from the wheel above</p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setProgression([])}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={() => {
                      if (progression.length > 0) {
                        progression.forEach((chord, i) => {
                          setTimeout(() => playChord(chord, selectedInstrument, pianoHand), i * 800);
                        });
                      }
                    }}
                    disabled={progression.length === 0}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    Play Progression
                  </button>
                  <button 
                    onClick={() => {
                      // Load preset progression
                      const presets = {
                        'I-V-vi-IV': ['C', 'G', 'Am', 'F'],
                        'vi-IV-I-V': ['Am', 'F', 'C', 'G'],
                        'I-vi-ii-V': ['C', 'Am', 'Dm', 'G'],
                        'ii-V-I': ['Dm', 'G', 'C']
                      };
                      const presetName = prompt('Choose preset:\n1. I-V-vi-IV (Pop)\n2. vi-IV-I-V (Alternative)\n3. I-vi-ii-V (Jazz)\n4. ii-V-I (Jazz)');
                      const presetMap = {
                        '1': 'I-V-vi-IV',
                        '2': 'vi-IV-I-V', 
                        '3': 'I-vi-ii-V',
                        '4': 'ii-V-I'
                      };
                      const selectedPreset = presetMap[presetName];
                      if (selectedPreset && presets[selectedPreset]) {
                        setProgression(presets[selectedPreset]);
                      }
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    Load Preset
                  </button>
                </div>
                {/* Song Suggestions */}
                {progression.length >= 2 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🎵 Songs that use similar progressions:</h4>
                    <div className="text-blue-700 text-sm">
                      {(() => {
                        const progressionStr = progression.join('-');
                        const songs = {
                          'C-G-Am-F': ['Let It Be - The Beatles', 'Don\'t Stop Believin\' - Journey'],
                          'Am-F-C-G': ['Counting Stars - OneRepublic', 'What\'s Up - 4 Non Blondes'],
                          'C-Am-Dm-G': ['Heart and Soul - Hoagy Carmichael', 'Blue Moon - Richard Rodgers'],
                          'Dm-G-C': ['Autumn Leaves - Jazz Standard', 'Fly Me to the Moon - Frank Sinatra']
                        };
                        const matchingSongs = songs[progressionStr] || ['Try different chord combinations to discover more songs!'];
                        return matchingSongs.map((song, i) => <div key={i}>• {song}</div>);
                      })()
                      }
                    </div>
                  </div>
                )}
              </div>
              {/* Metronome */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Metronome</h3>
                <MetronomeComponent />
              </div>
              {/* Practice Mode */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">🎯 Guided Practice</h3>
                <PracticeModeComponent 
                  currentChord={currentChord}
                  onChordChange={setCurrentChord}
                  selectedInstrument={selectedInstrument}
                  selectedKey={selectedKey}
                  userLevel={userLevel}
                  completedLessons={completedLessons}
                />
              </div>
              {/* Quick Practice */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Practice</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(CHORD_DATA[selectedInstrument]).slice(0, 6).map(chord => (
                    <button key={chord}
                            onClick={() => practiceChord(chord)}
                            className={`p-3 rounded-lg font-medium transition-colors ${
                              userProgress.chords.includes(chord)
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            style={{
                              borderLeft: `4px solid ${CHORD_DATA[selectedInstrument][chord]?.color}`
                            }}>
                      {chord}
                    </button>
                  ))}
                </div>
              </div>
              {/* Popular Songs */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">🎵 Popular Songs</h3>
                <div className="space-y-3">
                  {SONG_LIBRARY.slice(0, 3).map(song => {
                    const canPlay = song.chords.every(chord => 
                      Object.keys(CHORD_DATA[selectedInstrument]).includes(chord)
                    );
                    return (
                      <button key={song.id}
                              onClick={() => canPlay && learnSong(song)}
                              disabled={!canPlay}
                              className={`w-full p-3 text-left rounded-lg transition-colors ${
                                canPlay 
                                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-800' 
                                  : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                              }`}>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-xs">{song.artist}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Practice View */}
        {currentView === 'practice' && currentChord && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-readex text-gray-800">Practice Mode</h2>
              <button 
                onClick={() => markChordLearned(currentChord)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                Mark as Learned ✓
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div>
                {selectedInstrument === 'guitar' && (
                  <>
                    <div className="flex items-center justify-end mb-3">
                      <div className="inline-flex rounded-md shadow-sm border" role="group" aria-label="Guitar orientation">
                        <button
                          className={`px-3 py-1 text-sm font-medium rounded-l-md ${guitarMode === 'normal' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('normal')}
                        >
                          Normal
                        </button>
                        <button
                          className={`px-3 py-1 text-sm font-medium border-l ${guitarMode === 'player-mirrored' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('player-mirrored')}
                        >
                          Player-mirrored
                        </button>
                        <button
                          className={`px-3 py-1 text-sm font-medium border-l rounded-r-md ${guitarMode === 'left-handed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('left-handed')}
                        >
                          Left-handed
                        </button>
                      </div>
                    </div>
                    <EnhancedGuitarDiagram 
                      chord={currentChord} 
                      onPlay={(direction) => playChord(currentChord, selectedInstrument, 'rightHand', 'strum')}
                      onInteract={(stringIndex, fret, note) => {
                        console.log(`Played string ${stringIndex}, fret ${fret}, note ${note}`);
                      }}
                      mode={guitarMode}
                      interactive={interactiveMode}
                    />
                  </>
                )}
                {selectedInstrument === 'piano' && (
                  <EnhancedPianoDiagram 
                    chord={currentChord} 
                    onPlay={(style, hand) => playChord(currentChord, selectedInstrument, hand, style)}
                    hand={pianoHand}
                    interactive={interactiveMode}
                  />
                )}
              </div>
              <div className="space-y-6">
                {/* Chord Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Chord Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Name: </span>
                      <span style={{ color: CHORD_DATA[selectedInstrument][currentChord]?.color }}>
                        {CHORD_DATA[selectedInstrument][currentChord]?.name}
                      </span>
                    </div>
                    {selectedInstrument === 'guitar' && (
                      <>
                        <div>
                          <span className="font-medium">Difficulty: </span>
                          <div className="inline-flex gap-1">
                            {[...Array(CHORD_DATA.guitar[currentChord]?.difficulty)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Frets: </span>
                          {CHORD_DATA.guitar[currentChord]?.frets.map(f => f === -1 ? 'X' : f).join(' - ')}
                        </div>
                      </>
                    )}
                    {selectedInstrument === 'piano' && (
                      <div>
                        <span className="font-medium">Notes: </span>
                        {CHORD_DATA.piano[currentChord]?.[pianoHand].notes.join(' - ')}
                      </div>
                    )}
                  </div>
                </div>
                {/* Practice Tips */}
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Practice Tips</h3>
                  <ul className="text-yellow-700 space-y-2 text-sm">
                    {(selectedInstrument === 'guitar' ? [
                      "Press strings just behind the frets, not on them",
                      "Keep your thumb on the back of the neck",
                      "Curve your fingers to avoid touching other strings",
                      "Practice switching between chords slowly at first"
                    ] : [
                      "Keep your wrists level with your hands",
                      "Curve your fingers like you're holding a small ball",
                      "Use the correct fingering - it builds muscle memory",
                      "Practice playing the chord smoothly and evenly"
                    ]).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Other Chords */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Try Other Chords</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(CHORD_DATA[selectedInstrument]).filter(c => c !== currentChord).map(chord => (
                      <button key={chord}
                              onClick={() => setCurrentChord(chord)}
                              className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              style={{
                                borderLeft: `3px solid ${CHORD_DATA[selectedInstrument][chord]?.color}`
                              }}>
                        {chord}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Songs View */}
        {currentView === 'songs' && (
          <div>
            <h2 className="text-3xl font-bold font-readex text-gray-800 mb-8">Song Library & Play Along</h2>
            {selectedSong && (
              <SongPlayAlong 
                song={selectedSong}
                instrument={selectedInstrument}
                onChordChange={setCurrentChord}
                hand={pianoHand}
              />
            )}
            {/* Current chord display if song is selected */}
            {selectedSong && currentChord && (
              <div className="mb-8">
                {selectedInstrument === 'guitar' && (
                  <>
                    <div className="flex items-center justify-end mb-3">
                      <div className="inline-flex rounded-md shadow-sm border" role="group" aria-label="Guitar orientation">
                        <button
                          className={`px-3 py-1 text-sm font-medium rounded-l-md ${guitarMode === 'normal' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('normal')}
                        >
                          Normal
                        </button>
                        <button
                          className={`px-3 py-1 text-sm font-medium border-l ${guitarMode === 'player-mirrored' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('player-mirrored')}
                        >
                          Player-mirrored
                        </button>
                        <button
                          className={`px-3 py-1 text-sm font-medium border-l rounded-r-md ${guitarMode === 'left-handed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                          onClick={() => setGuitarMode('left-handed')}
                        >
                          Left-handed
                        </button>
                      </div>
                    </div>
                    <EnhancedGuitarDiagram 
                      chord={currentChord} 
                      onPlay={(direction) => playChord(currentChord, selectedInstrument, 'rightHand', 'strum')}
                      mode={guitarMode}
                      interactive={interactiveMode}
                    />
                  </>
                )}
                {selectedInstrument === 'piano' && (
                  <EnhancedPianoDiagram 
                    chord={currentChord} 
                    onPlay={(style, hand) => playChord(currentChord, selectedInstrument, hand, style)}
                    hand={pianoHand}
                    interactive={interactiveMode}
                  />
                )}
              </div>
            )}
            {/* Song Library */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SONG_LIBRARY.map(song => {
                const availableChords = song.chords.filter(chord => 
                  Object.keys(CHORD_DATA[selectedInstrument]).includes(chord)
                );
                const canPlay = availableChords.length === song.chords.length;
                return (
                  <div key={song.id} 
                       className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                         canPlay ? 'border-green-200 hover:border-green-300' : 'border-red-200'
                       } ${selectedSong?.id === song.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{song.title}</h3>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                        <p className="text-xs text-gray-500 mt-1">{song.bpm} BPM</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(song.difficulty)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{song.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {song.chords.map(chord => (
                        <span key={chord} 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                Object.keys(CHORD_DATA[selectedInstrument]).includes(chord)
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                          {chord}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <button 
                        onClick={() => learnSong(song)}
                        disabled={!canPlay}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                          canPlay 
                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}>
                        {canPlay ? '🎵 Play Along' : 'Learn Required Chords First'}
                      </button>
                      {!canPlay && (
                        <div className="text-xs text-red-600 text-center">
                          Missing: {song.chords.filter(chord => 
                            !Object.keys(CHORD_DATA[selectedInstrument]).includes(chord)
                          ).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center celebration max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Fantastic!</h3>
            <p className="text-lg text-gray-600 mb-4">You learned a new chord!</p>
            <p className="text-sm text-gray-500">Keep practicing to master it!</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Render the Enhanced App
const container = document.getElementById('root');
createRoot(container).render(<EnhancedUltimateChordApp />);
