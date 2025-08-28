import { useState, useEffect, useRef } from 'react';
import Soundfont, { type Player } from 'soundfont-player';

// Guitar string base notes (standard tuning)
const GUITAR_STRING_NOTES = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const guitarInstrument = useRef<Player | null>(null);
  const isInitialized = useRef(false);
  const [guitarLoaded, setGuitarLoaded] = useState(false);

  const NOTE_FREQUENCIES: Record<string, number> = {
    'C3': 130.81,
    'C#3': 138.59,
    'D3': 146.83,
    'D#3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'F#3': 185.00,
    'G3': 196.00,
    'G#3': 207.65,
    'A3': 220.00,
    'A#3': 233.08,
    'B3': 246.94,
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392.00,
    'G#4': 415.30,
    'A4': 440.00,
    'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25,
    'C#5': 554.37,
    'D5': 587.33,
    'D#5': 622.25,
    'E5': 659.25,
    'F5': 698.46,
    'F#5': 739.99,
    'G5': 783.99,
    'G#5': 830.61,
    'A5': 880.00,
    'A#5': 932.33,
    'B5': 987.77,
    'C6': 1046.50
  };

  // Initialize audio context on first user interaction
  const initAudio = () => {
    if (!isInitialized.current) {
      const AudioContext = window.AudioContext ?? window.webkitAudioContext
      if (AudioContext) {
        const context = new AudioContext()
        setAudioContext(context)
        isInitialized.current = true;
        // Load guitar soundfont
        void Soundfont.instrument(context, 'acoustic_guitar_steel')
          .then(instrument => {
            guitarInstrument.current = instrument;
            setGuitarLoaded(true);
          })
          .catch(console.error);
        return context
      }
    }
    return audioContext
  }

  // Play a single piano note
  const playNote = (
    note: string,
    duration = 0.5
  ) => {
    const context = audioContext ?? initAudio()
    if (!context) return

    const frequency = NOTE_FREQUENCIES[note];
    if (!frequency) return;

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency

    // Apply ADSR envelope
    const now = context.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01) // Attack
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1) // Decay
    gainNode.gain.setValueAtTime(0.3, now + duration - 0.1) // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration) // Release

    oscillator.start(now)
    oscillator.stop(now + duration)
  }

  // Play a chord
  const playChord = (notes: string[], duration = 1.0, instrument: 'piano' | 'guitar' = 'piano') => {
    if (instrument === 'piano') {
      notes.forEach(note => {
        playNote(note, duration)
      })
    } else {
      const context = audioContext ?? initAudio();
      if (!guitarLoaded) {
        console.warn('Guitar sounds not loaded yet');
        return;
      }
      const now = context?.currentTime ?? 0;
      notes.forEach(note => {
        guitarInstrument.current?.play(note, now, { duration });
      });
    }
  }

  // All notes on a chromatic scale
  const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const fretToNote = (string: number, fret: number): string => {
    const openStringNote = GUITAR_STRING_NOTES[string - 1];
    const noteName = openStringNote.slice(0, -1);
    const octave = parseInt(openStringNote.slice(-1), 10);

    const openNoteIndex = CHROMATIC_SCALE.indexOf(noteName);
    const newNoteIndex = (openNoteIndex + fret) % 12;
    const octaveOffset = Math.floor((openNoteIndex + fret) / 12);

    const newNoteName = CHROMATIC_SCALE[newNoteIndex];
    const newOctave = octave + octaveOffset;

    return `${newNoteName}${newOctave}`;
  }


  // Play a guitar string at a specific fret
  const playGuitarNote = (string: number, fret: number, duration = 0.5) => {
    if (string < 1 || string > 6) return
    initAudio();
    if (!guitarLoaded) {
      console.warn('Guitar sounds not loaded yet');
      return;
    }
    const note = fretToNote(string, fret);
    guitarInstrument.current?.play(note, undefined, { duration });
  }

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        void audioContext.close()
      }
    }
  }, [audioContext])

  return {
    initAudio,
    playNote,
    playChord,
    playGuitarNote,
    fretToNote,
    guitarLoaded,
  };
};

export default useAudio;