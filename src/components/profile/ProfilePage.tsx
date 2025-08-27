import React from 'react';
import { useAchievements } from '../../contexts/AchievementContext';
import { achievements } from '../../data/achievements';

export const ProfilePage: React.FC = () => {
  const { unlockedAchievements } = useAchievements();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Your Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(achievements).map((achievement) => {
          const isUnlocked = unlockedAchievements.has(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`p-6 rounded-lg shadow-md flex items-center ${
                isUnlocked ? 'bg-white' : 'bg-gray-100 opacity-60'
              }`}
            >
              <div className="text-5xl mr-6">{achievement.icon}</div>
              <div>
                <h2 className="text-xl font-bold">{achievement.name}</h2>
                <p className="text-gray-600">{achievement.description}</p>
                {!isUnlocked && <p className="text-sm font-bold text-gray-400 mt-2">Locked</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
