import React, { useState } from 'react';

interface TheoryQuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TheoryQuiz: React.FC<TheoryQuizProps> = ({ question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        {question}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-colors ${
              selectedAnswer === null
                ? 'bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900'
                : selectedAnswer === option && isCorrect
                ? 'bg-green-500 text-white'
                : selectedAnswer === option && !isCorrect
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 opacity-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-4 text-center">
          <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Not quite, try again!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TheoryQuiz;
