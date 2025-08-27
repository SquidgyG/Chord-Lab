import React from 'react';
import QuickQuiz from './QuickQuiz';
import musicTriviaQuestions from '../../data/musicTriviaQuestions';

const MusicTriviaQuickQuiz: React.FC = () => {
  return <QuickQuiz questions={musicTriviaQuestions} numberOfQuestions={10} />;
};

export default MusicTriviaQuickQuiz;
