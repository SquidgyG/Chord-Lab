import type { FC } from 'react';
import GuitarDiagram from '../diagrams/GuitarDiagram';
import PianoDiagram from '../diagrams/PianoDiagram';
import { useUserProfile } from '../../contexts/UserProfileContext';

interface Chord {
  name: string;
  guitarPositions: { string: number; fret: number }[];
  guitarFingers: number[];
  pianoNotes: string[];
}

interface InstrumentPanelProps {
  chord: Chord | null;
  playGuitarNote: (string: number, fret: number) => void;
  playPianoNote: (note: string) => void;
  initAudio: () => void;
}

const InstrumentPanel: FC<InstrumentPanelProps> = ({
  chord,
  playGuitarNote,
  playPianoNote,
  initAudio,
}) => {
  const { profile } = useUserProfile();
  const selectedInstrument = profile.instrument;

  return (
    <div className="mb-6">
      {chord && (
        <div className="flex justify-center my-6" onClick={initAudio}>
          {selectedInstrument === 'guitar' ? (
            <GuitarDiagram
              chordName={chord.name}
              positions={chord.guitarPositions}
              fingers={chord.guitarFingers}
              onPlayNote={playGuitarNote}
            />
          ) : (
            <PianoDiagram
              chordName={chord.name}
              notes={chord.pianoNotes}
              onPlayNote={playPianoNote}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InstrumentPanel;
