import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PracticeMode from './PracticeMode'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { AchievementProvider } from '../../contexts/AchievementContext'
import { UserProfileProvider } from '../../contexts/UserProfileContext'

vi.mock('../../hooks/useMetronome', () => ({
  default: () => [
    { isPlaying: false, bpm: 120, beat: 0, beatsPerMeasure: 4 },
    { start: vi.fn(), stop: vi.fn(), setBpm: vi.fn(), setBeatsPerMeasure: vi.fn() },
  ],
}));

describe('PracticeMode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithProviders = (initialEntries: string[]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          <AchievementProvider>
            <UserProfileProvider>
              <Routes>
                <Route path="/practice" element={<PracticeMode />} />
              </Routes>
            </UserProfileProvider>
          </AchievementProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('should display the default chord when no URL params are provided', () => {
    renderWithProviders(['/practice'])
    expect(screen.getByTestId('current-chord-name')).toHaveTextContent('C')
  })

  it('should display the chord from the URL parameter', () => {
    renderWithProviders(['/practice?chord=G'])
    expect(screen.getByTestId('current-chord-name')).toHaveTextContent('G')
  })

  it('uses the instrument from the user profile', () => {
    localStorage.setItem('userProfile', JSON.stringify({
      name: 'Tester',
      instrument: 'piano',
      confidenceLevel: 'beginner',
      onboardingComplete: true,
    }));
    renderWithProviders(['/practice']);
    expect(screen.getByRole('img', { name: /chord chart/i })).toBeInTheDocument();
  });

  it('should display diatonic chords when a key is provided in the URL', () => {
    renderWithProviders(['/practice?key=G'])
    expect(screen.getByText('Key: G major')).toBeInTheDocument()
    // Diatonic chords in G major: G, C, D
    const diatonicChordsContainer = screen.getByTestId('diatonic-chords')
    expect(within(diatonicChordsContainer).getByRole('button', { name: 'G' })).toBeInTheDocument()
    expect(within(diatonicChordsContainer).getByRole('button', { name: 'C' })).toBeInTheDocument()
    expect(within(diatonicChordsContainer).getByRole('button', { name: 'D' })).toBeInTheDocument()
  })
})
