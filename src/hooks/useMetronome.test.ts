import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useMetronome from './useMetronome'

describe('useMetronome', () => {
  beforeEach(() => {
    vi.useFakeTimers()
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
})
