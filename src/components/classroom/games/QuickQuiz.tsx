import React, { useState } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const questionBank: Question[] = [
  {
    id: 1,
    question: 'What is the relative minor of C major?',
    options: ['A minor', 'E minor', 'D minor', 'G minor'],
    correctAnswer: 'A minor',
  },
  {
    id: 2,
    question: 'How many sharps are in the key of E major?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correctAnswer: 'Four',
  },
  {
    id: 3,
    question: 'Which note is the fifth of the G major scale?',
    options: ['C', 'D', 'E', 'B'],
    correctAnswer: 'D',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QuickQuiz: React.FC = () => {
  const [shuffledQuestions] = useState<Question[]>(() => shuffleArray(questionBank));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);
  };

  const nextQuestion = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % shuffledQuestions.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        {currentQuestion.question}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={selected !== null}
            className={`p-4 rounded-lg text-left transition-colors ${
              selected === null
                ? 'bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900'
                : selected === option && isCorrect
                ? 'bg-green-500 text-white'
                : selected === option && !isCorrect
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 opacity-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 text-center">
          <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Try Again!'}
          </p>
          <button
            onClick={nextQuestion}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickQuiz;

