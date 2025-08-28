import { useCallback, useEffect, useRef } from 'react';

// Generic question interface used by QuickQuiz. The answer is a string literal
// type so the component can enforce type safety for the options presented to
// the user.
export interface QuickQuizQuestion<T extends string> {
  audio?: string;
  answer: T;
}

// Props for the QuickQuiz component. The generic parameter allows individual
// quizzes to constrain the allowed answer options (e.g. 'Major' | 'Minor').
export interface QuickQuizProps<T extends string> {
  /** Question data which may include an audio clip to play */
  question?: QuickQuizQuestion<T>;
  /** Possible answers to present to the user */
  options: T[];
}

/**
 * QuickQuiz provides a simple audio-based quiz player.
 * It maintains a reference to the current HTMLAudioElement so that
 * any previously playing audio can be paused and reset before a new
 * clip is loaded. The audio element is cleaned up when the component
 * unmounts.
 */
// The function itself is generic so consumers can provide their specific answer
// types. Unused props are prefixed with an underscore to satisfy linting rules.
export default function QuickQuiz<T extends string>({
  question,
  options: _options,
}: QuickQuizProps<T>) {
  // Lazily create a persistent audio element using useRef
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    const clipSrc = question?.audio;
    if (!clipSrc) return;

    // Initialize the audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
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