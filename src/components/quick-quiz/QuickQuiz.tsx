import React, { useEffect, useState } from 'react';

export interface QuickQuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number; // index in answers
}

interface QuickQuizProps {
  questions: QuickQuizQuestion[];
  numberOfQuestions?: number;
}

const QuickQuiz: React.FC<QuickQuizProps> = ({ questions, numberOfQuestions = 10 }) => {
  const [quizQuestions, setQuizQuestions] = useState<QuickQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfQuestions);
    setQuizQuestions(shuffled);
  }, [questions, numberOfQuestions]);

  const currentQuestion = quizQuestions[currentIndex];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      const next = currentIndex + 1;
      if (next < quizQuestions.length) {
        setCurrentIndex(next);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (!currentQuestion) {
    return <div />;
  }

  if (finished) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold mb-4">Quiz Complete!</p>
        <p className="text-lg">Score: {score} / {quizQuestions.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-6 text-center">{currentQuestion.question}</h3>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {currentQuestion.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
            className={`py-4 px-6 rounded-lg text-lg font-medium transition-colors ${
              selected === null
                ? 'bg-blue-100 hover:bg-blue-200'
                : i === currentQuestion.correctAnswer
                ? 'bg-green-500 text-white'
                : selected === i
                ? 'bg-red-500 text-white'
                : 'bg-blue-100 opacity-50'
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        {currentIndex + 1} / {quizQuestions.length}
      </p>
    </div>
  );
};

export default QuickQuiz;
