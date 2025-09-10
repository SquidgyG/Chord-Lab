import React, { createContext, useContext, useState } from 'react';

interface ChordWheelContextType {
  selectedChords: string[];
  setSelectedChords: (chords: string[]) => void;
  activeChord: string | null;
  setActiveChord: (chord: string | null) => void;
}

const ChordWheelContext = createContext<ChordWheelContextType>({
  selectedChords: [],
  setSelectedChords: () => {},
  activeChord: null,
  setActiveChord: () => {}
});

export const useChordWheel = () => useContext(ChordWheelContext);

export const ChordWheelProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedChords, setSelectedChords] = useState<string[]>([]);
  const [activeChord, setActiveChord] = useState<string | null>(null);

  return (
    <ChordWheelContext.Provider 
      value={{ selectedChords, setSelectedChords, activeChord, setActiveChord }}
    >
      {children}
    </ChordWheelContext.Provider>
  );
};
