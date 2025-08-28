import { describe, it, expect, vi } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('shuffles array without mutating original', () => {
    const arr = [1, 2, 3];
    const spy = vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0);
    const result = shuffle(arr);
    expect(result).toEqual([2, 3, 1]);
    expect(arr).toEqual([1, 2, 3]);
    spy.mockRestore();
  });
});

