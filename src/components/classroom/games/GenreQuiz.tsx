import React, { useState } from 'react';

export interface Score {
  correct: number;
  attempted: number;
}

export default function GenreQuiz() {
  const [score, setScore] = useState<Score>({ correct: 0, attempted: 0 });

  const handleAnswer = (isCorrect: boolean) => {
    setScore((prevScore: Score) => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      attempted: prevScore.attempted + 1,
    }));
  };

  return (
    <div>
      <p>
        Score: {score.correct} / {score.attempted}
      </p>
      <button onClick={() => handleAnswer(true)}>Correct</button>
      <button onClick={() => handleAnswer(false)}>Incorrect</button>
    </div>
  );
}
