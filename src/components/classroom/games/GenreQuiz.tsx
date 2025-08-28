import { useEffect, useState } from 'react';
import QuickQuiz from './QuickQuiz';

interface Clip {
  genre: string;
  src: string;
}

const CLIPS: Clip[] = [
  { genre: 'Rock', src: 'rock.mp3' },
  { genre: 'Jazz', src: 'jazz.mp3' },
  { genre: 'Classical', src: 'classical.mp3' },
];

function shuffleOptions(genres: string[]): string[] {
  const arr = [...genres];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GenreQuiz() {
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const current = CLIPS[index];

  useEffect(() => {
    setOptions(shuffleOptions(CLIPS.map((c) => c.genre)));
    setRevealed(false);
  }, [index]);

  const handleGuess = (guess: string) => {
    setScore((s) => ({
      correct: s.correct + (guess === current.genre ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => setIndex((i) => (i + 1) % CLIPS.length);
  const reset = () => setScore({ correct: 0, total: 0 });

  return (
    <div>
      <div>Score: {score.correct} / {score.total}</div>
      <QuickQuiz clipSrc={current.src} />
      <div>
        {options.map((g) => (
          <button key={g} onClick={() => handleGuess(g)}>
            {g}
          </button>
        ))}
      </div>
      {revealed && <div role="status">Answer: {current.genre}</div>}
      <button onClick={() => setRevealed(true)}>Reveal Answer</button>
      <button onClick={next}>Next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
