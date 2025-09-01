import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';

interface Team {
  name: string
  score: number
}

interface ScoreboardContextValue {
  teams: Team[]
  addTeam: (name: string) => void
  incrementScore: (name: string, amount?: number) => void
  resetScores: () => void
}

const ScoreboardContext = createContext<ScoreboardContextValue | undefined>(undefined)

export const ScoreboardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([])

  const addTeam = (name: string) => {
    setTeams(prev => {
      if (prev.some(t => t.name === name)) return prev
      return [...prev, { name, score: 0 }]
    })
  }

  const incrementScore = (name: string, amount: number = 1) => {
    setTeams(prev => prev.map(t => (t.name === name ? { ...t, score: t.score + amount } : t)))
  }

  const resetScores = () => {
    setTeams(prev => prev.map(t => ({ ...t, score: 0 })))
  }

  return (
    <ScoreboardContext.Provider value={{ teams, addTeam, incrementScore, resetScores }}>
      {children}
    </ScoreboardContext.Provider>
  )
}

export const useScoreboard = () => {
  const context = useContext(ScoreboardContext)
  if (!context) throw new Error('useScoreboard must be used within a ScoreboardProvider')
  return context
}

export const Scoreboard: FC = () => {
  const { teams, resetScores } = useScoreboard()

  if (teams.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Scoreboard</h3>
        <button
          onClick={resetScores}
          className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      <ul>
        {teams.map(team => (
          <li key={team.name} className="flex justify-between py-1 text-gray-900 dark:text-gray-100">
            <span>{team.name}</span>
            <span>{team.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Scoreboard
