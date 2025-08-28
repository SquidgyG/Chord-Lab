import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Scoreboard, useScoreboard } from './Scoreboard'

const TeacherGamesDashboard: React.FC = () => {
  const { addTeam } = useScoreboard()
  const [teamName, setTeamName] = useState('')

  const handleAddTeam = () => {
    const name = teamName.trim()
    if (!name) return
    addTeam(name)
    setTeamName('')
  }

  return (
    <div className="space-y-4">
      <Scoreboard />
      <div className="flex gap-2">
        <input
          type="text"
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
          placeholder="Add team"
          className="flex-grow px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          onClick={handleAddTeam}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Team
        </button>
      </div>
      <Link
        to="example"
        className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Play Example Game
      </Link>
      <Outlet />
    </div>
  )
}

export default TeacherGamesDashboard

