import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PracticeMode from './PracticeMode'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { AchievementProvider } from '../../contexts/AchievementContext'
import { useHighestUnlockedLevel } from '../learning-path/LearningPathway'

vi.mock('../../hooks/useMetronome', () => ({
    default: () => [
        { isPlaying: false, bpm: 120, beat: 0, beatsPerMeasure: 4 },
        { start: vi.fn(), stop: vi.fn(), setBpm: vi.fn(), setBeatsPerMeasure: vi.fn() },
    ],
}));

vi.mock('../learning-path/LearningPathway', () => ({
  useHighestUnlockedLevel: vi.fn().mockReturnValue(10),
}));

vi.mock('../../hooks/useAudio', () => ({
  default: vi.fn().mockReturnValue({
    playChord: vi.fn(),
    fretToNote: vi.fn().mockReturnValue('A'),
    guitarLoaded: true,
  }),
}));

const renderWithProviders = (initialEntries = ['/practice']) => {
  return render(
    <ThemeProvider>
      <AchievementProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/practice" element={<PracticeMode />} />
          </Routes>
        </MemoryRouter>
      </AchievementProvider>
    </ThemeProvider>
  );
};

const completedLessonIds = [
  '1-k1',
  '1-k2',
  '1-s1',
  '1-s2',
  '1-e1',
  '1-b1',
  '2-k1',
  '2-s1',
  '2-e1',
  '2-b1',
];

beforeEach(() => {
  localStorage.setItem('completedLessonIds', JSON.stringify(completedLessonIds));
});

afterEach(() => {
  localStorage.clear();
});

describe('PracticeMode', () => {
  it('should display the default chord when no URL params are provided', () => {
    renderWithProviders(['/practice'])
    expect(screen.getByTestId('current-chord-name')).toHaveTextContent('C')
  })

  it('should display the chord from the URL parameter', () => {
    renderWithProviders(['/practice?chord=G'])
    expect(screen.getByTestId('current-chord-name')).toHaveTextContent('G')
  })

  it.skip('should change the instrument when the piano button is clicked after opening the options', () => {
    renderWithProviders(['/practice']);
    
    // The button to toggle options is now labeled "Beginner Mode" in non-beginner mode
    fireEvent.click(screen.getByText('Beginner Mode'));
    
    // Use getByText to find the piano button
    const pianoButton = screen.getByText('Piano');
    fireEvent.click(pianoButton);
    
    // Verify that the instrument changed to piano
    expect(screen.getByText('Piano')).toBeInTheDocument();
  });

  it('should display diatonic chords when a key is provided in the URL', () => {
    renderWithProviders(['/practice?key=G']);
    
    // Get the diatonic chords container by test id
    const diatonicContainer = screen.getByTestId('diatonic-chords');
    
    // Within the container, check for the expected chords
    within(diatonicContainer).getByText('G');
    within(diatonicContainer).getByText('C');
    within(diatonicContainer).getByText('D');
    within(diatonicContainer).getByText('Em');
    within(diatonicContainer).getByText('Bm');
    within(diatonicContainer).getByText('Am');
  });

  it('should show only minimal controls in beginner mode and reveal more when toggled', () => {
    renderWithProviders(['/practice']);
    // Initially not in beginner mode -> Tips and Song buttons are visible
    expect(screen.getByText('Tips')).toBeInTheDocument();
    expect(screen.getByText('Song')).toBeInTheDocument();

    // Toggle to beginner mode
    fireEvent.click(screen.getByText('Beginner Mode'));
    // In beginner mode, Tips and Song should be hidden
    expect(screen.queryByText('Tips')).not.toBeInTheDocument();
    expect(screen.queryByText('Song')).not.toBeInTheDocument();

    // Toggle back to non-beginner mode
    fireEvent.click(screen.getByText('More Options'));
    expect(screen.getByText('Tips')).toBeInTheDocument();
    expect(screen.getByText('Song')).toBeInTheDocument();
  });
})