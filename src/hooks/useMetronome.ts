import { useState, useEffect, useRef } from 'react';

type MetronomeState = {
  isPlaying: boolean;
  bpm: number;
  beat: number;
  beatsPerMeasure: number;
};

type MetronomeControls = {
  start: () => void;
  stop: () => void;
  setBpm: (bpm: number) => void;
  setBeatsPerMeasure: (beats: number) => void;
};

const useMetronome = (initialBpm = 120, initialBeatsPerMeasure = 4): [MetronomeState, MetronomeControls] => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('metronome:bpm');
      const parsed = raw ? parseInt(raw, 10) : NaN;
      return Number.isFinite(parsed) ? parsed : initialBpm;
    } catch {
      return initialBpm;
    }
  });
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('metronome:beatsPerMeasure');
      const parsed = raw ? parseInt(raw, 10) : NaN;
      return Number.isFinite(parsed) ? parsed : initialBeatsPerMeasure;
    } catch {
      return initialBeatsPerMeasure;
    }
  });
  const [beat, setBeat] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Initialize audio context
  type AudioContextCtor = { new(): AudioContext };
  function getAudioContextCtor(): AudioContextCtor | null {
    const w = window as unknown as Window & { webkitAudioContext?: AudioContextCtor };
    return (window.AudioContext as unknown as AudioContextCtor) || w.webkitAudioContext || null;
  }

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      const Ctor = getAudioContextCtor();
      if (!Ctor) return null;
      audioContextRef.current = new Ctor();
    }
    return audioContextRef.current;
  };
  
  // Play metronome click sound
  const playClick = (isAccent: boolean) => {
    const context = initAudioContext();
    if (!context) return;
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Higher pitch for accent beat, lower for regular beats
    oscillator.frequency.value = isAccent ? 880 : 440;
    
    // Short click sound
    gainNode.gain.setValueAtTime(0.5, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.05);
  };
  
  // Start the metronome
  const start = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setBeat(0);
    
    const interval = (60 / bpm) * 1000; // Convert BPM to milliseconds
    
    intervalRef.current = window.setInterval(() => {
      setBeat(prevBeat => {
        const newBeat = (prevBeat + 1) % beatsPerMeasure;
        playClick(newBeat === 0); // Accent on first beat
        return newBeat;
      });
    }, interval) as unknown as number;
  };
  
  // Stop the metronome
  const stop = () => {
    if (!isPlaying) return;
    
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setBeat(0);
  };
  
  // Update BPM and restart if playing
  const updateBpm = (newBpm: number) => {
    setBpm(newBpm);
    try {
      localStorage.setItem('metronome:bpm', String(newBpm));
    } catch {
      // ignore persistence errors
      void 0;
    }
    if (isPlaying) {
      stop();
      start();
    }
  };
  
  // Update beats per measure
  const updateBeatsPerMeasure = (newBeats: number) => {
    setBeatsPerMeasure(newBeats);
    try {
      localStorage.setItem('metronome:beatsPerMeasure', String(newBeats));
    } catch {
      // ignore persistence errors
      void 0;
    }
    if (isPlaying) {
      setBeat(0); // Reset beat count
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  return [
    { isPlaying, bpm, beat, beatsPerMeasure },
    { start, stop, setBpm: updateBpm, setBeatsPerMeasure: updateBeatsPerMeasure }
  ];
};

export default useMetronome;
