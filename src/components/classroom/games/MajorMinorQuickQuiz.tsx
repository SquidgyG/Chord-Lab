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

// Precompute mapped questions so the array reference remains stable
// and avoids unnecessary work during component renders.
const questionItems = chordQualityQuestions.map(
  ({ chord, quality }) => `${chord} is ${quality}`,
);

export default function MajorMinorQuickQuiz() {
  return (
    <ul>
      {questionItems.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
}
