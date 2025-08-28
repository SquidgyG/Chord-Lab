import { useEffect, useRef } from 'react';

export interface QuickQuizQuestion<T extends string> {
  /** Source URL for the audio clip to play */
  clipSrc: string;
  /** Correct answer for the clip */
  answer: T;
}

export interface QuickQuizProps<T extends string> {
  /** Source URL for the audio clip to play */
  clipSrc?: string;
  /** Possible answer options */
  options: T[];
}

/**
 * QuickQuiz provides a simple audio-based quiz player.
 * It maintains a reference to the current HTMLAudioElement so that
 * any previously playing audio can be paused and reset before a new
 * clip is loaded. The audio element is cleaned up when the component
 * unmounts.
 */
export default function QuickQuiz<T extends string>({
  clipSrc,
  options,
}: QuickQuizProps<T>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!clipSrc) return;

    // Lazily create the audio element if needed
    audioRef.current ??= new Audio();

    const audio = audioRef.current;

    // Pause and reset any previous playback before loading a new source
    audio.pause();
    audio.currentTime = 0;
    audio.src = clipSrc;

    void audio.play();
  }, [clipSrc]);

  useEffect(() => {
    // Cleanup the audio element when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      {options.map((option) => (
        <button key={option}>{option}</button>
      ))}
    </div>
  );
}

export function MajorMinorQuickQuiz(
  props: Omit<QuickQuizProps<'Major' | 'Minor'>, 'options'>,
) {
  return (
    <QuickQuiz<'Major' | 'Minor'> {...props} options={["Major", "Minor"]} />
  );
}
