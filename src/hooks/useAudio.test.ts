import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock soundfont-player before importing hook
vi.mock('soundfont-player', () => ({
  default: { instrument: vi.fn() },
}))
import Soundfont from 'soundfont-player'
import useAudio from './useAudio'
const instrumentSpy = (Soundfont as any).instrument as ReturnType<typeof vi.fn>

class MockOscillator {
  start = vi.fn()
  stop = vi.fn()
  connect = vi.fn()
  frequency = { value: 0 }
}

class MockGainNode {
  connect = vi.fn()
  gain = {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  }
}

class MockAudioContext {
  currentTime = 0
  destination = {}
  createOscillator = vi.fn(() => new MockOscillator())
  createGain = vi.fn(() => new MockGainNode())
  close = vi.fn()
}

describe('useAudio', () => {
  let mockContext: MockAudioContext
  let mockInstrument: { play: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    mockContext = new MockAudioContext()
    mockInstrument = { play: vi.fn() }
    ;(window as any).AudioContext = vi.fn(() => mockContext)
    instrumentSpy.mockReset()
    instrumentSpy.mockResolvedValue(mockInstrument)
  })

  it('plays a single note using the Web Audio API', () => {
    const { result } = renderHook(() => useAudio())

    act(() => {
      result.current.playNote('C4')
    })

    expect(mockContext.createOscillator).toHaveBeenCalledTimes(1)
    const osc = mockContext.createOscillator.mock.results[0].value as MockOscillator
    expect(osc.frequency.value).toBeCloseTo(261.63)
    expect(osc.start).toHaveBeenCalled()
    expect(osc.stop).toHaveBeenCalled()
  })

  it('plays a chord on the piano by triggering multiple oscillators', async () => {
    const { result } = renderHook(() => useAudio())

    await act(async () => {
      result.current.initAudio()
      await Promise.resolve()
    })

    act(() => {
      result.current.playChord(['C4', 'E4', 'G4'])
    })

    expect(mockContext.createOscillator).toHaveBeenCalledTimes(3)
  })

  it('plays a chord on the guitar using the loaded soundfont', async () => {
    const { result } = renderHook(() => useAudio())

    await act(async () => {
      result.current.initAudio()
      await Promise.resolve() // wait for instrument to load
    })

    act(() => {
      result.current.playChord(['C4', 'E4'], 1, 'guitar')
    })

    expect(mockInstrument.play).toHaveBeenCalledTimes(2)
    expect(mockInstrument.play).toHaveBeenCalledWith('C4', 0, { duration: 1 })
  })

  it('plays a specific guitar string and fret', async () => {
    const { result } = renderHook(() => useAudio())

    await act(async () => {
      result.current.initAudio()
      await Promise.resolve()
    })

    act(() => {
      result.current.playGuitarNote(1, 3)
    })

    expect(mockInstrument.play).toHaveBeenCalledWith('G2', undefined, { duration: 0.5 })
  })
})

