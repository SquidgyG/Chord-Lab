import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { achievements } from '../data/achievements';
import type { Achievement } from '../data/achievements';

interface AchievementContextType {
  unlockedAchievements: Set<string>;
  unlockAchievement: (id: string) => void;
  latestAchievement: Achievement | null;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

interface AchievementProviderProps {
  children: ReactNode;
}

export const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
  });
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('unlockedAchievements', JSON.stringify(Array.from(unlockedAchievements)));
  }, [unlockedAchievements]);

  const unlockAchievement = (id: string) => {
    if (!unlockedAchievements.has(id) && achievements[id]) {
      const newUnlocked = new Set(unlockedAchievements);
      newUnlocked.add(id);
      setUnlockedAchievements(newUnlocked);
      setLatestAchievement(achievements[id]);
      setTimeout(() => setLatestAchievement(null), 5000); // Notification disappears after 5 seconds
    }
  };

  return (
    <AchievementContext.Provider value={{ unlockedAchievements, unlockAchievement, latestAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};
