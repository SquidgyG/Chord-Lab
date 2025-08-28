import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GenreQuiz from '../GenreQuiz';

// Mock the audio hook so no sound is played during tests
const playNoteMock = vi.fn();
vi.mock('../../../../hooks/useAudio', () => ({
  __esModule: true,
  default: () => ({
    playNote: playNoteMock,
  }),
}));

describe('GenreQuiz', () => {
  beforeEach(() => {
    playNoteMock.mockClear();
    vi.restoreAllMocks();
  });

  it('plays a clip and records a correct guess', () => {
    render(<GenreQuiz />);
    // play the first clip
    fireEvent.click(screen.getByRole('button', { name: /play clip/i }));
    expect(playNoteMock).toHaveBeenCalledWith('C4');

    // guess the correct genre
    fireEvent.click(screen.getByRole('button', { name: /rock/i }));
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });

  it('does not increment score on incorrect guess', () => {
    render(<GenreQuiz />);
    fireEvent.click(screen.getByRole('button', { name: /jazz/i }));
    expect(screen.getByTestId('score')).toHaveTextContent('0');
  });

  it('shuffles songs and plays a new clip', () => {
    // make shuffle deterministic
    vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0);
    render(<GenreQuiz />);

    fireEvent.click(screen.getByRole('button', { name: /shuffle/i }));
    fireEvent.click(screen.getByRole('button', { name: /play clip/i }));
    expect(playNoteMock).toHaveBeenCalledWith('D4');
  });

  it('reveals the current answer when requested', () => {
    render(<GenreQuiz />);
    fireEvent.click(screen.getByRole('button', { name: /reveal answer/i }));
    expect(screen.getByTestId('answer')).toHaveTextContent('Rock');
  });

  it('resets the score back to zero', () => {
    render(<GenreQuiz />);
    fireEvent.click(screen.getByRole('button', { name: /rock/i }));
    expect(screen.getByTestId('score')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: /reset score/i }));
    expect(screen.getByTestId('score')).toHaveTextContent('0');
  });
});

