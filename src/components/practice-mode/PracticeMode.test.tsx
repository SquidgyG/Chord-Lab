import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PracticeMode from './PracticeMode'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { AchievementProvider } from '../../contexts/AchievementContext'

vi.mock('../../hooks/useMetronome', () => ({
    default: () => [
        { isPlaying: false, bpm: 120, beat: 0, beatsPerMeasure: 4 },
        { start: vi.fn(), stop: vi.fn(), setBpm: vi.fn(), setBeatsPerMeasure: vi.fn() },
    ],
}));

describe('PracticeMode', () => {
    const renderWithProviders = (initialEntries: string[]) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <ThemeProvider>
                    <AchievementProvider>
                        <Routes>
                            <Route path="/practice" element={<PracticeMode />} />
                        </Routes>
                    </AchievementProvider>
                </ThemeProvider>
            </MemoryRouter>
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

    it('should display the default chord when no URL params are provided', () => {
        renderWithProviders(['/practice'])
        expect(screen.getByTestId('current-chord-name')).toHaveTextContent('C')
    })

    it('should display the chord from the URL parameter', () => {
        renderWithProviders(['/practice?chord=G'])
        expect(screen.getByTestId('current-chord-name')).toHaveTextContent('G')
    })

    it('should change the instrument when the piano button is clicked after enabling "More Options"', () => {
        renderWithProviders(['/practice']);
        fireEvent.click(screen.getByText('More Options'));
        const pianoButton = screen.getByRole('button', { name: /piano/i });
        fireEvent.click(pianoButton);
        // This is a proxy for the instrument changing. A better test would check the rendered diagram.
        // For now, we'll just check that the button is selected.
        expect(pianoButton).toHaveClass('bg-blue-500');
    });

    it('should display diatonic chords when a key is provided in the URL', () => {
        renderWithProviders(['/practice?key=G'])
        fireEvent.click(screen.getByText('More Options'))
        expect(screen.getByText('Key: G major')).toBeInTheDocument()
        // Diatonic chords in G major: G, C, D
        const diatonicChordsContainer = screen.getByTestId('diatonic-chords')
        expect(within(diatonicChordsContainer).getByRole('button', { name: 'G' })).toBeInTheDocument()
        expect(within(diatonicChordsContainer).getByRole('button', { name: 'C' })).toBeInTheDocument()
        expect(within(diatonicChordsContainer).getByRole('button', { name: 'D' })).toBeInTheDocument()
    })

    it('should show only minimal controls in beginner mode and reveal more when toggled', () => {
        renderWithProviders(['/practice'])
        expect(screen.queryByText('Tips')).not.toBeInTheDocument()
        fireEvent.click(screen.getByText('More Options'))
        expect(screen.getByText('Tips')).toBeInTheDocument()
    })
})