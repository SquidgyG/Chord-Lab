import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import type { CountdownTimerHandle } from './CountdownTimer';

const QuickQuiz: React.FC = () => {
  const timerRef = useRef<CountdownTimerHandle>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    timerRef.current?.start(600);
  }, []);

  const revealAnswer = () => {
    setRevealed(true);
    timerRef.current?.pause();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <CountdownTimer ref={timerRef} onComplete={() => setRevealed(true)} />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Drop the V of D minor
        </h3>
        {revealed ? (
          <p className="text-green-600 font-semibold">Answer: A or A7</p>
        ) : (
          <button
            onClick={revealAnswer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reveal Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickQuiz;
