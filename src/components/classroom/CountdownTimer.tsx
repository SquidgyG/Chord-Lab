import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

interface CountdownTimerProps {
  onComplete?: () => void;
}

export interface CountdownTimerHandle {
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
}

const CountdownTimer = forwardRef<CountdownTimerHandle, CountdownTimerProps>((
  { onComplete },
  ref
) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const totalRef = useRef(0);
  const intervalRef = useRef<number>();

  const clear = () => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const tick = () => {
    setSecondsLeft(prev => {
      if (prev <= 1) {
        clear();
        setIsActive(false);
        onComplete?.();
        return 0;
      }
      return prev - 1;
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      start: (seconds: number) => {
        clear();
        totalRef.current = seconds;
        setSecondsLeft(seconds);
        setIsActive(true);
        intervalRef.current = window.setInterval(tick, 1000);
      },
      pause: () => {
        clear();
        setIsActive(false);
      },
      resume: () => {
        if (!isActive && secondsLeft > 0) {
          setIsActive(true);
          intervalRef.current = window.setInterval(tick, 1000);
        }
      },
    }),
    [isActive, secondsLeft]
  );

  useEffect(() => {
    return clear;
  }, []);

  const progress = totalRef.current ? (secondsLeft / totalRef.current) * 100 : 0;
  const warning = secondsLeft <= 60;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-2 bg-gray-200">
        <div
          className={`h-full transition-all duration-1000 ${warning ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        className={`mt-2 text-4xl font-bold ${warning ? 'text-red-600' : 'text-gray-800 dark:text-gray-100'}`}
      >
        {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}
      </div>
    </div>
  );
});

export default CountdownTimer;
