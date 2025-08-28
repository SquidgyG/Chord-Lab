import React from 'react'
import { Scoreboard, useScoreboard } from '../Scoreboard'

const ExampleGame: React.FC = () => {
  const { teams, incrementScore } = useScoreboard()

  if (teams.length === 0) {
    return <p className="text-gray-700 dark:text-gray-300">Add teams to start scoring.</p>
  }

  return (
    <div className="space-y-4">
      <Scoreboard />
      <div className="space-y-2">
        <h4 className="font-bold text-gray-800 dark:text-gray-100">Example Game</h4>
        {teams.map(team => (
          <button
            key={team.name}
            onClick={() => incrementScore(team.name)}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {team.name} +1
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExampleGame

