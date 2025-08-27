import React, { useState } from 'react'

interface Team {
  name: string
  score: number
}

const games = [
  'Rhythm Dictation',
  'Chord Quality Quiz',
  'Genre Quiz',
]

const TeacherGamesDashboard: React.FC = () => {
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [newTeam, setNewTeam] = useState('')

  const addTeam = () => {
    const name = newTeam.trim()
    if (!name) return
    setTeams([...teams, { name, score: 0 }])
    setNewTeam('')
  }

  const adjustScore = (index: number, delta: number) => {
    setTeams(teams.map((team, i) => (i === index ? { ...team, score: team.score + delta } : team)))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Games Dashboard</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map(game => (
          <button
            key={game}
            className="w-full py-6 text-2xl font-semibold rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {game}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowScoreboard(v => !v)}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      >
        {showScoreboard ? 'Hide Scoreboard' : 'Show Scoreboard'}
      </button>

      {showScoreboard && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Scoreboard</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTeam}
              onChange={e => setNewTeam(e.target.value)}
              placeholder="Team name"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              onClick={addTeam}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Team
            </button>
          </div>
          <ul className="space-y-2">
            {teams.map((team, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
              >
                <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {team.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustScore(index, -1)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 w-12 text-center">
                    {team.score}
                  </span>
                  <button
                    onClick={() => adjustScore(index, 1)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TeacherGamesDashboard

