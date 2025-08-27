import React from 'react';

interface ChordCardProps {
  chordName: string;
}

const ChordCard: React.FC<ChordCardProps> = ({ chordName }) => {
  return (
    <div className="w-32 h-40 bg-blue-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
      {chordName}
    </div>
  );
};

export default ChordCard;
