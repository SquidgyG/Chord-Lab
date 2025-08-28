import { render, screen, fireEvent } from '@testing-library/react';
import GenreQuiz from '../GenreQuiz';
import { vi } from 'vitest';

describe('GenreQuiz', () => {
  it('renders audio sources as data URIs', () => {
    render(<GenreQuiz />);
    const sources = screen.getAllByTestId('audio-source');
    expect(sources).toHaveLength(3);
    sources.forEach((s) => {
      expect(s.getAttribute('src')).toMatch(/^data:audio\//);
    });
  });

  it('allows guessing and updates score', () => {
    render(<GenreQuiz />);
    const bluesButton = screen.getByRole('button', { name: /Blues/i });
    fireEvent.click(bluesButton);
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });

  it('shuffles songs', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<GenreQuiz />);
    const revealButton = screen.getByRole('button', { name: /Reveal Answer/i });
    fireEvent.click(revealButton);
    expect(screen.getByTestId('answer')).toHaveTextContent('Blues');

    const shuffleButton = screen.getByRole('button', { name: /Shuffle/i });
    fireEvent.click(shuffleButton);
    fireEvent.click(revealButton);
    expect(screen.getByTestId('answer')).toHaveTextContent('Rock');
  });

  it('reveals the answer when requested', () => {
    render(<GenreQuiz />);
    const revealButton = screen.getByRole('button', { name: /Reveal Answer/i });
    fireEvent.click(revealButton);
    expect(screen.getByTestId('answer')).toBeInTheDocument();
  });

  it('resets score', () => {
    render(<GenreQuiz />);
    const bluesButton = screen.getByRole('button', { name: /Blues/i });
    fireEvent.click(bluesButton);
    expect(screen.getByTestId('score')).toHaveTextContent('1');
    const resetButton = screen.getByRole('button', { name: /Reset Score/i });
    fireEvent.click(resetButton);
    expect(screen.getByTestId('score')).toHaveTextContent('0');
  });
});
