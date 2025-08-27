import { FC, useEffect, useState } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';
import { achievements } from '../../data/achievements';

const PracticeSummary: FC = () => {
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);
  const [chordsPlayed, setChordsPlayed] = useState(0);
  const { unlockedAchievements } = useAchievements();

  useEffect(() => {
    const stored = localStorage.getItem('practiceStats');
    if (stored) {
      const stats = JSON.parse(stored) as {
        totalPracticeTime?: number;
        chordsPlayed?: number;
      };
      setTotalPracticeTime(stats.totalPracticeTime ?? 0);
      setChordsPlayed(stats.chordsPlayed ?? 0);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const recentIds = Array.from(unlockedAchievements).slice(-3).reverse();
  const recent = recentIds.map((id) => achievements[id]).filter(Boolean);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Practice Summary</h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Total Time:</span>{' '}
          {formatTime(totalPracticeTime)}
        </div>
        <div>
          <span className="font-semibold">Chords Played:</span> {chordsPlayed}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Recent Achievements</h3>
        {recent.length > 0 ? (
          <ul className="space-y-2">
            {recent.map((ach) => (
              <li key={ach.id} className="flex items-center space-x-2">
                <span className="text-xl">{ach.icon}</span>
                <span>{ach.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No achievements yet.</p>
        )}
      </div>
    </div>
  );
};

export default PracticeSummary;

