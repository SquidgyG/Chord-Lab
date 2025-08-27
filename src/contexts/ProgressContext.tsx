/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { LevelId } from '../data/levels'

export type ProgressState = {
  levelId: LevelId
  completedEvidence: Set<string>
  achievements: string[]
  teacherUnlock: boolean
}

export type ProgressContextValue = ProgressState & {
  setLevelId: (id: LevelId) => void
  toggleEvidence: (evidenceId: string) => void
  addAchievement: (id: string) => void
  removeAchievement: (id: string) => void
  setTeacherUnlock: (v: boolean) => void
  toggleTeacherUnlock: () => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem('progress.state')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        levelId: parsed.levelId ?? 'L1',
        completedEvidence: new Set<string>(Array.isArray(parsed.completedEvidence) ? parsed.completedEvidence : []),
        achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
        teacherUnlock: !!parsed.teacherUnlock,
      }
    }
  } catch {
    // ignore localStorage read errors
    void 0
  }
  return { levelId: 'L1', completedEvidence: new Set(), achievements: [], teacherUnlock: false }
}

function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(
      'progress.state',
      JSON.stringify({
        levelId: state.levelId,
        completedEvidence: Array.from(state.completedEvidence),
        achievements: state.achievements,
        teacherUnlock: state.teacherUnlock,
      })
    )
  } catch {
    // ignore localStorage write errors
    void 0
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [levelId, setLevelId] = useState<LevelId>(() => loadProgress().levelId)
  const [completedEvidence, setCompletedEvidence] = useState<Set<string>>(() => loadProgress().completedEvidence)
  const [achievements, setAchievements] = useState<string[]>(() => loadProgress().achievements)
  const [teacherUnlock, setTeacherUnlock] = useState<boolean>(() => loadProgress().teacherUnlock)

  useEffect(() => {
    saveProgress({ levelId, completedEvidence, achievements, teacherUnlock })
  }, [levelId, completedEvidence, achievements, teacherUnlock])

  const value = useMemo<ProgressContextValue>(() => ({
    levelId,
    completedEvidence,
    achievements,
    teacherUnlock,
    setLevelId,
    toggleEvidence: (id: string) => setCompletedEvidence(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    }),
    addAchievement: (id: string) => setAchievements(prev => prev.includes(id) ? prev : [...prev, id]),
    removeAchievement: (id: string) => setAchievements(prev => prev.filter(a => a !== id)),
    setTeacherUnlock,
    toggleTeacherUnlock: () => setTeacherUnlock(v => !v),
    resetProgress: () => {
      setLevelId('L1')
      setCompletedEvidence(new Set())
      setAchievements([])
      setTeacherUnlock(false)
    },
  }), [levelId, completedEvidence, achievements, teacherUnlock])

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
