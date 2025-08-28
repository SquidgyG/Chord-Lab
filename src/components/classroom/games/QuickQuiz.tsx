import { useCallback, useEffect, useRef, useState } from 'react';

export interface QuickQuizQuestion {
  audio?: string;
}

export interface QuickQuizProps {
  /**
   * Full list of questions for the quiz. The array will be shuffled once on
   * component mount so that question order remains stable for the duration of
   * the session.
   */
  questions: QuickQuizQuestion[];

  /**
   * Index of the question to play. Defaults to the first question in the
   * shuffled list.
   */
  currentIndex?: number;
}

/**
 * QuickQuiz provides a simple audio-based quiz player.
 * It maintains a reference to the current HTMLAudioElement so that
 * any previously playing audio can be paused and reset before a new
 * clip is loaded. The audio element is cleaned up when the component
 * unmounts.
 */
export default function QuickQuiz({ questions, currentIndex = 0 }: QuickQuizProps) {
  // Shuffle questions once when the component mounts. Using useState with an
  // initializer guarantees the shuffle runs only on the first render for this
  // session.
  const [shuffledQuestions] = useState(() => {
    const array = [...questions];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  });

  const question = shuffledQuestions[currentIndex];

  // Lazily create a persistent audio element using useRef
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    const clipSrc = question?.audio;
    if (!clipSrc) return;

    // Initialize the audio element if it doesn't exist
    audioRef.current ??= new Audio();
    const audio = audioRef.current;

    // Pause and reset any previous playback before loading a new source
    audio.pause();
    audio.currentTime = 0;
    audio.src = clipSrc;

    void audio.play();
  }, [question?.audio]);

  useEffect(() => {
    playAudio();
  }, [playAudio]);

  useEffect(() => {
    // Cleanup the audio element when the component unmounts
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.load();
      }
    };
  }, []);

  return <div />;
}