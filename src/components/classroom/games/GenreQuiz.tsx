import { useState } from 'react';

interface Score {
  correct: number;
  attempted: number;
}

export default function GenreQuiz() {
  const [score, setScore] = useState<Score>({ correct: 0, attempted: 0 });

  const handleAnswer = (isCorrect: boolean) => {
    setScore((prev: Score) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1,
    }));
  };

  return (
    <div>
      {score.correct}/{score.attempted}
      <button onClick={() => handleAnswer(true)} style={{ display: 'none' }} />
    </div>
  );
}

