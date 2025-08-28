import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useMetronome from './useMetronome'

describe('useMetronome', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMetronome())
    const [state] = result.current

    expect(state.isPlaying).toBe(false)
    expect(state.bpm).toBe(120)
    expect(state.beatsPerMeasure).toBe(4)
    expect(state.beat).toBe(0)
  })

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useMetronome(100, 3))
    const [state] = result.current

    expect(state.bpm).toBe(100)
    expect(state.beatsPerMeasure).toBe(3)
  })

  it('should start and stop the metronome', () => {
    const { result } = renderHook(() => useMetronome())

    expect(result.current[0].isPlaying).toBe(false)

    act(() => {
      result.current[1].start()
    })

    expect(result.current[0].isPlaying).toBe(true)

    act(() => {
      result.current[1].stop()
    })

    expect(result.current[0].isPlaying).toBe(false)
  })

  it('should change BPM', () => {
    const { result } = renderHook(() => useMetronome())

    act(() => {
      result.current[1].setBpm(140)
    })

    expect(result.current[0].bpm).toBe(140)
  })

  it('should change beats per measure', () => {
    const { result } = renderHook(() => useMetronome())

    act(() => {
      result.current[1].setBeatsPerMeasure(3)
    })

    expect(result.current[0].beatsPerMeasure).toBe(3)
  })

  it('restarts interval when BPM changes while playing', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    const { result } = renderHook(() => useMetronome())

    act(() => {
      result.current[1].start()
    })

    act(() => {
      result.current[1].setBpm(150)
    })

    expect(result.current[0].beat).toBe(0)
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
  })

  it('calls playClick with accent beats', () => {
    const frequencies: number[] = []

    class Oscillator {
      frequency = { value: 0 }
      connect = vi.fn()
      start = vi.fn(() => {
        frequencies.push(this.frequency.value)
      })
      stop = vi.fn()
    }

    class GainNode {
      connect = vi.fn()
      gain = {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      }
    }

    class Ctx {
      currentTime = 0
      destination = {}
      createOscillator = vi.fn(() => new Oscillator())
      createGain = vi.fn(() => new GainNode())
      close = vi.fn()
    }

    ;(window as any).AudioContext = vi.fn(() => new Ctx())

    const { result } = renderHook(() => useMetronome())

    act(() => {
      result.current[1].start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(frequencies[0]).toBe(440)
    expect(frequencies[1]).toBe(440)
    expect(frequencies[2]).toBe(440)
    expect(frequencies[3]).toBe(880)
    delete (window as any).AudioContext
  })
})
