import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ChordWheel from './ChordWheel';

import { ThemeProvider } from '../contexts/ThemeContext'

describe('ChordWheel', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <ThemeProvider>{ui}</ThemeProvider>
      </MemoryRouter>
    )
  }

  it('should render the chord wheel with the default key of C', () => {
    renderWithProviders(<ChordWheel />)

    expect(screen.getByText('Chord Wheel')).toBeInTheDocument()
    expect(screen.getByText('C major')).toBeInTheDocument()
  })

  it('should highlight the correct diatonic chords for the key of C', () => {
    renderWithProviders(<ChordWheel />)

    // Diatonic chords in C major: C, F, G
    const diatonicMajors = ['C', 'F', 'G']
    diatonicMajors.forEach(chord => {
      const sector = screen.getByTestId(`sector-${chord}`)
      const path = sector.querySelector('path:first-of-type')
      expect(path).toHaveAttribute('filter', 'url(#glow)')
    })
  })

  it('should change the key and update the diatonic chords', () => {
    renderWithProviders(<ChordWheel />)

    const keySelector = screen.getByLabelText('Key')
    fireEvent.change(keySelector, { target: { value: 'G' } })

    expect(screen.getByText('G major')).toBeInTheDocument()

    // Diatonic chords in G major: G, C, D
    const diatonicMajors = ['G', 'C', 'D']
    diatonicMajors.forEach(chord => {
      const sector = screen.getByTestId(`sector-${chord}`)
      const path = sector.querySelector('path:first-of-type')
      expect(path).toHaveAttribute('filter', 'url(#glow)')
    })
  })
})
