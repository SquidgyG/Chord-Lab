import React, { useMemo, useRef, useState } from 'react';
import genreClips, { GenreClip } from '../../../data/genres';

const GENRES = ['Rock', 'Jazz', 'Classical'];

const GenreQuiz: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const initialSongs: GenreClip[] = useMemo(() => genreClips, []);

  const [songs, setSongs] = useState(initialSongs);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const playClip = () => {
    void audioRef.current?.play();
  };

  const handleGuess = (genre: string) => {
    if (revealed) return;
    setRevealed(true);
    if (songs[current].genre === genre) {
      setScore((s) => s + 1);
    }
  };

  const shuffleSongs = () => {
    const array = [...songs];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setSongs(array);
    setCurrent(0);
    setRevealed(false);
  };

  const resetScore = () => {
    setScore(0);
    setRevealed(false);
  };

  return (
    <div>
      <audio ref={audioRef} key={songs[current].genre}>
        {songs[current].sources.map((s, idx) => (
          <source
            key={s.type}
            data-testid={idx === 0 ? 'audio-source' : undefined}
            src={s.src}
            type={s.type}
          />
        ))}
      </audio>
      <p data-testid="score">Score: {score}</p>
      <button onClick={playClip}>Play Clip</button>
      <div>
        {GENRES.map((g) => (
          <button key={g} onClick={() => handleGuess(g)} disabled={revealed}>
            {g}
          </button>
        ))}
      </div>
      <button onClick={() => setRevealed(true)}>Reveal Answer</button>
      {revealed && <p data-testid="answer">{songs[current].genre}</p>}
      <button onClick={shuffleSongs}>Shuffle</button>
      <button onClick={resetScore}>Reset Score</button>
    </div>
  );
};

export default GenreQuiz;
