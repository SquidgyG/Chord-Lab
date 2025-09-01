import React from 'react';
import PianoDiagram from '../diagrams/PianoDiagram';

interface PianoChordDiagramProps {
  notes: string[];
  chordName: string;
}

const PianoChordDiagram: React.FC<PianoChordDiagramProps> = ({ notes, chordName }) => {
  return <PianoDiagram chordName={chordName} notes={notes} />;
};

export default PianoChordDiagram;

