import { useState, useEffect, useRef } from 'react';

// Note frequencies for piano keys (C4 = middle C)
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

// Guitar string frequencies (standard tuning)
const GUITAR_STRING_FREQUENCIES = [
  82.41,  // Low E (6th string)
  110.00, // A (5th string)
  146.83, // D (4th string)
  196.00, // G (3rd string)
  246.94, // B (2nd string)
  329.63  // High E (1st string)
];

const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const isInitialized = useRef(false);
  
  // Initialize audio context on first user interaction
  const initAudio = () => {
    if (!isInitialized.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);
      isInitialized.current = true;
      return context;
    }
    return audioContext;
  };
  
  // Play a single note
  const playNote = (frequency: number, duration = 0.5, instrument: 'piano' | 'guitar' = 'piano') => {
    const context = audioContext || initAudio();
    if (!context) return;
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Set oscillator type based on instrument
    if (instrument === 'piano') {
      oscillator.type = 'sine';
    } else if (instrument === 'guitar') {
      oscillator.type = 'sawtooth';
    }
    
    oscillator.frequency.value = frequency;
    
    // Apply ADSR envelope
    const now = context.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01); // Attack
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);  // Decay
    gainNode.gain.setValueAtTime(0.3, now + duration - 0.1); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  };
  
  // Play a chord (multiple notes simultaneously)
  const playChord = (notes: string[], duration = 1.0, instrument: 'piano' | 'guitar' = 'piano') => {
    notes.forEach(note => {
      const frequency = NOTE_FREQUENCIES[note];
      if (frequency) {
        playNote(frequency, duration, instrument);
      }
    });
  };
  
  // Play a guitar string at a specific fret
  const playGuitarNote = (string: number, fret: number, duration = 0.5) => {
    if (string < 1 || string > 6) return;
    
    // Calculate frequency: fret frequency = string frequency * 2^(fret/12)
    const stringFreq = GUITAR_STRING_FREQUENCIES[string - 1];
    const frequency = stringFreq * Math.pow(2, fret / 12);
    
    playNote(frequency, duration, 'guitar');
  };
  
  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);
  
  return {
    initAudio,
    playNote,
    playChord,
    playGuitarNote
  };
};

export default useAudio;
