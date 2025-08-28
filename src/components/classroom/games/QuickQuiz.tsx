import { useCallback, useEffect, useRef } from 'react';

export interface QuickQuizProps {
  /** Question data which may include an audio clip to play */
  question?: { audio?: string };
}

/**
 * QuickQuiz provides a simple audio-based quiz player.
 * It maintains a reference to the current HTMLAudioElement so that
 * any previously playing audio can be paused and reset before a new
 * clip is loaded. The audio element is cleaned up when the component
 * unmounts.
 */
export default function QuickQuiz({ question }: QuickQuizProps) {
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