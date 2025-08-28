import { useMemo } from 'react';
import shuffle from '../../../utils/shuffle';

const GENRES = ['Blues', 'Classical', 'Country', 'Jazz', 'Rock'];

export default function GenreQuiz() {
  const options = useMemo(() => shuffle(GENRES), []);

  return (
    <div>
      {options.map((genre) => (
        <div key={genre}>{genre}</div>
      ))}
    </div>
  );
}
