import { useEffect, useRef } from 'react';

export interface QuickQuizProps {
  /** Source URL for the audio clip to play */
  clipSrc?: string;
}

/**
 * QuickQuiz provides a simple audio-based quiz player.
 * It maintains a reference to the current HTMLAudioElement so that
 * any previously playing audio can be paused and reset before a new
 * clip is loaded. The audio element is cleaned up when the component
 * unmounts.
 */
export default function QuickQuiz({ clipSrc }: QuickQuizProps) {
  // Keep a persistent audio element for the current clip
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (!clipSrc) return;

    const audio = audioRef.current;

    // Pause and reset any previous playback before loading a new source
    audio.pause();
    audio.currentTime = 0;
    audio.src = clipSrc;

    void audio.play();
  }, [clipSrc]);

  useEffect(() => {
    // Cleanup the audio element when the component unmounts
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = '';
      audio.load();
    };
  }, []);

  return <div />;
}
