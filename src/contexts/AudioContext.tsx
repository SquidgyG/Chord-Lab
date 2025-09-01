import { createContext, useContext } from 'react';

interface AudioContextType {
  playChord: (chord: string) => void;
}

const AudioContext = createContext<AudioContextType>({
  playChord: () => {}
});

export const useAudio = () => useContext(AudioContext);

export default AudioContext;
