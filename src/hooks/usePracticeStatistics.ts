import { useState, useEffect, useCallback, useRef } from 'react';
import { useAchievements } from '../contexts/AchievementContext';

const usePracticeStatistics = () => {
  const { unlockAchievement } = useAchievements();
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);
  const [chordsPlayed, setChordsPlayed] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestChallengeTime, setBestChallengeTime] = useState<number | null>(null);

  const [isChallengeActive, setIsChallengeActive] = useState(false);
  const [challengeTime, setChallengeTime] = useState(0);
  const challengeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const practiceTimeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const storedStats = localStorage.getItem('practiceStats');
    if (storedStats) {
      const stats = JSON.parse(storedStats);
      setTotalPracticeTime(stats.totalPracticeTime || 0);
      setChordsPlayed(stats.chordsPlayed || 0);
      setBestChallengeTime(stats.bestChallengeTime || null);
    }
  }, []);

  const saveStats = useCallback(() => {
    const stats = {
      totalPracticeTime,
      chordsPlayed,
      bestChallengeTime,
    };
    localStorage.setItem('practiceStats', JSON.stringify(stats));
  }, [totalPracticeTime, chordsPlayed, bestChallengeTime]);

  useEffect(() => {
    saveStats();
  }, [saveStats]);

  useEffect(() => {
    if (totalPracticeTime >= 300000) {
      unlockAchievement('DEDICATED_LEARNER');
    }
  }, [totalPracticeTime, unlockAchievement]);

  const startPracticeSession = useCallback(() => {
    if (practiceTimeIntervalRef.current) {
      clearInterval(practiceTimeIntervalRef.current);
    }
    practiceTimeIntervalRef.current = setInterval(() => {
      setTotalPracticeTime(prevTime => prevTime + 1000);
    }, 1000);
  }, []);

  const stopPracticeSession = useCallback(() => {
    if (practiceTimeIntervalRef.current) {
      clearInterval(practiceTimeIntervalRef.current);
      practiceTimeIntervalRef.current = null;
    }
  }, []);

  const incrementChordsPlayed = useCallback(() => {
    setChordsPlayed(prev => prev + 1);
    setCurrentStreak(prev => prev + 1);
    if (chordsPlayed + 1 >= 100) {
      unlockAchievement('CHORD_MASTER');
    }
    if (currentStreak + 1 >= 50) {
      unlockAchievement('STREAK_MASTER');
    }
  }, [chordsPlayed, currentStreak, unlockAchievement]);

  const resetStreak = useCallback(() => {
    setCurrentStreak(0);
  }, []);

  const startChallenge = useCallback(() => {
    setIsChallengeActive(true);
    setChallengeTime(0);
    if (challengeIntervalRef.current) {
      clearInterval(challengeIntervalRef.current);
    }
    const startTime = Date.now();
    challengeIntervalRef.current = setInterval(() => {
      setChallengeTime(Date.now() - startTime);
    }, 10);
    startPracticeSession();
  }, [startPracticeSession]);

  const stopChallenge = useCallback(() => {
    setIsChallengeActive(false);
    if (challengeIntervalRef.current) {
      clearInterval(challengeIntervalRef.current);
      challengeIntervalRef.current = null;
    }
    if (bestChallengeTime === null || challengeTime < bestChallengeTime) {
      setBestChallengeTime(challengeTime);
      unlockAchievement('SPEED_DEMON');
    }
    stopPracticeSession();
  }, [bestChallengeTime, challengeTime, stopPracticeSession, unlockAchievement]);

  useEffect(() => {
    return () => {
      if (challengeIntervalRef.current) {
        clearInterval(challengeIntervalRef.current);
      }
      if (practiceTimeIntervalRef.current) {
        clearInterval(practiceTimeIntervalRef.current);
      }
    };
  }, []);

  return {
    totalPracticeTime,
    chordsPlayed,
    currentStreak,
    bestChallengeTime,
    isChallengeActive,
    challengeTime,
    startPracticeSession,
    stopPracticeSession,
    incrementChordsPlayed,
    resetStreak,
    startChallenge,
    stopChallenge,
  };
};

export default usePracticeStatistics;
