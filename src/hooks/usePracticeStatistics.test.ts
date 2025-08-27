import { renderHook, act } from '@testing-library/react';
import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import usePracticeStatistics from './usePracticeStatistics';
import { AchievementProvider } from '../contexts/AchievementContext';

// Mock the AchievementContext
vi.mock('../contexts/AchievementContext', async () => {
  const original = await vi.importActual('../contexts/AchievementContext');
  return {
    ...original,
    useAchievements: () => ({
      unlockAchievement: vi.fn(),
    }),
  };
});

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('should initialize with default values', () => {
  const { result } = renderHook(() => usePracticeStatistics(), {
    wrapper: AchievementProvider,
  });

  expect(result.current.totalPracticeTime).toBe(0);
  expect(result.current.chordsPlayed).toBe(0);
  expect(result.current.currentStreak).toBe(0);
  expect(result.current.bestChallengeTime).toBeNull();
});

test('should load stats from localStorage', () => {
  localStorage.setItem(
    'practiceStats',
    JSON.stringify({
      totalPracticeTime: 10000,
      chordsPlayed: 50,
      bestChallengeTime: 12345,
    })
  );

  const { result } = renderHook(() => usePracticeStatistics(), {
    wrapper: AchievementProvider,
  });

  expect(result.current.totalPracticeTime).toBe(10000);
  expect(result.current.chordsPlayed).toBe(50);
  expect(result.current.bestChallengeTime).toBe(12345);
});

test('should increment chords played and streak', () => {
  const { result } = renderHook(() => usePracticeStatistics(), {
    wrapper: AchievementProvider,
  });

  act(() => {
    result.current.incrementChordsPlayed();
  });

  expect(result.current.chordsPlayed).toBe(1);
  expect(result.current.currentStreak).toBe(1);
});

test('should reset streak', () => {
  const { result } = renderHook(() => usePracticeStatistics(), {
    wrapper: AchievementProvider,
  });

  act(() => {
    result.current.incrementChordsPlayed();
  });

  expect(result.current.currentStreak).toBe(1);

  act(() => {
    result.current.resetStreak();
  });

  expect(result.current.currentStreak).toBe(0);
});

test('should handle challenge mode', () => {
  const { result } = renderHook(() => usePracticeStatistics(), {
    wrapper: AchievementProvider,
  });

  act(() => {
    result.current.startChallenge();
  });

  expect(result.current.isChallengeActive).toBe(true);

  act(() => {
    vi.advanceTimersByTime(5000);
  });

  expect(result.current.challengeTime).toBeGreaterThanOrEqual(5000);

  act(() => {
    result.current.stopChallenge();
  });

  expect(result.current.isChallengeActive).toBe(false);
  expect(result.current.bestChallengeTime).not.toBeNull();
  expect(result.current.bestChallengeTime).toBe(result.current.challengeTime);
});
