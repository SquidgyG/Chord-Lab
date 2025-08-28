import { render, screen, fireEvent } from '@testing-library/react';
import GenreQuiz from '../GenreQuiz';
import { vi } from 'vitest';
import genreClips from '../../../../data/genres';

describe('GenreQuiz', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('allows guessing and updates score', () => {
    render(<GenreQuiz />);
    const rockButton = screen.getByRole('button', { name: /Rock/i });
    fireEvent.click(rockButton);
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });

  it('shuffles songs', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const playSpy = vi.fn();
    Object.defineProperty(global.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: playSpy,
    });

    render(<GenreQuiz />);
    const playButton = screen.getByRole('button', { name: /Play Clip/i });
    fireEvent.click(playButton);
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('audio-source')).toHaveAttribute(
      'src',
      genreClips[0].sources[0].src,
    );

    const shuffleButton = screen.getByRole('button', { name: /Shuffle/i });
    fireEvent.click(shuffleButton);
    const newSource = screen.getByTestId('audio-source');
    expect(newSource).toHaveAttribute('src', genreClips[1].sources[0].src);
    fireEvent.click(playButton);
    expect(playSpy).toHaveBeenCalledTimes(2);
  });

  it('reveals the answer when requested', () => {
    render(<GenreQuiz />);
    const revealButton = screen.getByRole('button', { name: /Reveal Answer/i });
    fireEvent.click(revealButton);
    expect(screen.getByTestId('answer')).toHaveTextContent('Rock');
  });

  it('resets score', () => {
    render(<GenreQuiz />);
    const rockButton = screen.getByRole('button', { name: /Rock/i });
    fireEvent.click(rockButton);
    expect(screen.getByTestId('score')).toHaveTextContent('1');
    const resetButton = screen.getByRole('button', { name: /Reset Score/i });
    fireEvent.click(resetButton);
    expect(screen.getByTestId('score')).toHaveTextContent('0');
  });
});
