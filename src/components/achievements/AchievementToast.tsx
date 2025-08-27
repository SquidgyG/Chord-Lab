import React from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

export const AchievementToast: React.FC = () => {
  const { latestAchievement } = useAchievements();

  if (!latestAchievement) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
      <div className="flex items-center">
        <div className="text-3xl mr-4">{latestAchievement.icon}</div>
        <div>
          <div className="font-bold">{latestAchievement.name}</div>
          <div>{latestAchievement.description}</div>
        </div>
      </div>
    </div>
  );
};
