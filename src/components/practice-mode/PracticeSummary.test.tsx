/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { render, screen } from '@testing-library/react';
import PracticeSummary from './PracticeSummary';
import { AchievementProvider } from '../../contexts/AchievementContext';

beforeEach(() => {
  localStorage.clear();
});

describe('PracticeSummary', () => {
  it('displays stats and recent achievements from localStorage', () => {
    localStorage.setItem(
      'practiceStats',
      JSON.stringify({ totalPracticeTime: 60000, chordsPlayed: 5 })
    );
    localStorage.setItem(
      'unlockedAchievements',
      JSON.stringify(['FIRST_CHORD'])
    );

    render(
      <AchievementProvider>
        <PracticeSummary />
      </AchievementProvider>
    );

    expect(screen.getByText('Total Time:').parentElement).toHaveTextContent(
      '1m 00s'
    );
    expect(screen.getByText('Chords Played:').parentElement).toHaveTextContent(
      '5'
    );
    expect(screen.getByText('First Chord!')).toBeInTheDocument();
  });
});

