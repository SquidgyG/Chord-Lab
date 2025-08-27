import type { FC } from 'react';

interface ChallengeModeProps {
  isChallengeActive: boolean;
  startChallenge: () => void;
  stopChallenge: () => void;
  challengeTime: number;
  bestChallengeTime: number | null;
}

const ChallengeMode: FC<ChallengeModeProps> = ({
  isChallengeActive,
  startChallenge,
  stopChallenge,
  challengeTime,
  bestChallengeTime,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded my-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">🏆 Challenge Mode</h4>
          <p className="text-yellow-700 dark:text-yellow-400">
            Play through the progression as fast as you can!
          </p>
        </div>
        {!isChallengeActive ? (
          <button
            onClick={startChallenge}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Start Challenge
          </button>
        ) : (
          <button
            onClick={stopChallenge}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Stop Challenge
          </button>
        )}
      </div>
      {isChallengeActive && (
        <div className="text-center my-4">
          <div className="text-4xl font-bold text-yellow-800 dark:text-yellow-300">
            {formatTime(challengeTime)}
          </div>
        </div>
      )}
      {bestChallengeTime !== null && (
        <div className="text-sm text-yellow-700 dark:text-yellow-400 mt-2">
          Best Time: {formatTime(bestChallengeTime)}
        </div>
      )}
    </div>
  );
};

export default ChallengeMode;
