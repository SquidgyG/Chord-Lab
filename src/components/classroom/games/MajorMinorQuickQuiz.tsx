import { useMemo } from 'react';

export interface ChordQualityQuestion {
  chord: string;
  quality: 'major' | 'minor';
}

// Simple list of chord quality questions.
// In the real application this might be fetched or computed elsewhere.
const chordQualityQuestions: ChordQualityQuestion[] = [
  { chord: 'C', quality: 'major' },
  { chord: 'Am', quality: 'minor' },
];

export default function MajorMinorQuickQuiz() {
  // Memoize the mapped questions so the array reference remains stable
  // between renders and avoids unnecessary re-renders downstream.
  const questionItems = useMemo(
    () => chordQualityQuestions.map(({ chord, quality }) => `${chord} is ${quality}`),
    [chordQualityQuestions],
  );

  return (
    <ul>
      {questionItems.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
}
