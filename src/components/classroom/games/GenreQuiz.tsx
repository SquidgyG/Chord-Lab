import React, { useMemo } from 'react';
import shuffle from '../../../utils/shuffle';

const genres = [
  'Rock',
  'Jazz',
  'Classical',
  'Blues',
  'Pop',
];

const GenreQuiz: React.FC = () => {
  const shuffledGenres = useMemo(() => shuffle(genres), []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Guess the Genre
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        {shuffledGenres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreQuiz;
