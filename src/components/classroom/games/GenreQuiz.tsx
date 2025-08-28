import React, { useRef, useState } from 'react';
import { genres, Genre } from '../../../data/genres';

const GenreQuiz: React.FC = () => {
  const [songs, setSongs] = useState<Genre[]>(genres);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGuess = (genre: string) => {
    if (revealed) return;
    setRevealed(true);
    if (songs[current].name === genre) {
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

  const playClip = () => {
    audioRef.current?.play();
  };

  const currentSong = songs[current];

  return (
    <div>
      <p data-testid="score">Score: {score}</p>
      <button onClick={playClip}>Play Clip</button>
      <audio ref={audioRef} data-testid="audio">
        {currentSong.sources.map((s) => (
          <source data-testid="audio-source" key={s.type} src={s.src} type={s.type} />
        ))}
      </audio>
      <div>
        {songs.map((g) => (
          <button key={g.name} onClick={() => handleGuess(g.name)} disabled={revealed}>
            {g.name}
          </button>
        ))}
      </div>
      <button onClick={() => setRevealed(true)}>Reveal Answer</button>
      {revealed && <p data-testid="answer">{currentSong.name}</p>}
      <button onClick={shuffleSongs}>Shuffle</button>
      <button onClick={resetScore}>Reset Score</button>
    </div>
  );
};

export default GenreQuiz;
