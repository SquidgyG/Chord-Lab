import { render, screen, fireEvent } from '@testing-library/react';
import GenreQuiz from '../GenreQuiz';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock audio playback
beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve());
  vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  vi.spyOn(window.HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});

describe('GenreQuiz', () => {
  it('updates score based on guesses', () => {
    render(<GenreQuiz />);

    // initial audio played
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

    // correct guess
    fireEvent.click(screen.getByRole('button', { name: 'Rock' }));
    expect(screen.getByText(/Score:\s*1\s*\/\s*1/)).toBeInTheDocument();

    // incorrect guess
    fireEvent.click(screen.getByRole('button', { name: 'Jazz' }));
    expect(screen.getByText(/Score:\s*1\s*\/\s*2/)).toBeInTheDocument();
  });

  it('shuffles clips, reveals answers, and resets score', () => {
    render(<GenreQuiz />);

    fireEvent.click(screen.getByRole('button', { name: /reveal answer/i }));
    expect(screen.getByRole('status')).toHaveTextContent('Rock');

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole('button', { name: /reveal answer/i }));
    expect(screen.getByRole('status')).toHaveTextContent('Jazz');

    // make an incorrect guess then reset
    fireEvent.click(screen.getByRole('button', { name: 'Rock' }));
    expect(screen.getByText(/Score:\s*0\s*\/\s*1/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText(/Score:\s*0\s*\/\s*0/)).toBeInTheDocument();
  });
});
