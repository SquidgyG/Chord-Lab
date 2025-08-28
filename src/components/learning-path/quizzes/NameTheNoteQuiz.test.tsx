import { render, screen, fireEvent } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import NameTheNoteQuiz from './NameTheNoteQuiz';

const initAudioMock = vi.fn();
const playNoteMock = vi.fn();

vi.mock('../../../hooks/useAudio', () => ({
  __esModule: true,
  default: () => ({
    initAudio: initAudioMock,
    playNote: playNoteMock,
  }),
}));

test('plays note when Play Note button is clicked', () => {
  render(<NameTheNoteQuiz />);
  expect(initAudioMock).toHaveBeenCalled();
  const playButton = screen.getByRole('button', { name: /Play Note/i });
  fireEvent.click(playButton);
  expect(playNoteMock).toHaveBeenCalledWith('E3');
});
