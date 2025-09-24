import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Leaderboard = () => {
  const navigate = useNavigate()
  const [ecoPoints] = useState(150)

  // Dummy leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'EcoWarrior99', ecoPoints: 1250},
    { rank: 2, name: 'GreenThumb', ecoPoints: 980},
    { rank: 3, name: 'TreePlanter', ecoPoints: 850},
    { rank: 4, name: 'EcoHero', ecoPoints: 720},
    { rank: 5, name: 'NatureLover', ecoPoints: 650},
    { rank: 6, name: 'You', ecoPoints: 150},
    { rank: 7, name: 'EcoNewbie', ecoPoints: 120},
    { rank: 8, name: 'GreenStart', ecoPoints: 80},
  ]

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-purple-400 to-purple-600 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-20">
        <button
          onClick={() => navigate('/')}
          className="font-8bit bg-yellow-300 border-4 border-black text-black px-4 py-2 rounded-none drop-shadow-[0_4px_0_#000] active:translate-y-[2px] active:drop-shadow-[0_2px_0_#000]"
        >
          ← Back
        </button>
        
        <div className="bg-yellow-300 border-4 border-black px-4 py-2 rounded-none drop-shadow-[0_4px_0_#000]">
          <div className="font-8bit text-black text-sm">
            🌱 {ecoPoints} Eco Points
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="font-8bit text-white text-3xl mb-8 text-center drop-shadow-[0_4px_0_#000]">
          LEADERBOARD
        </h1>

        {/* Stats */}
        <div className="mb-6 bg-white border-4 border-black rounded-none drop-shadow-[0_8px_0_#000] p-4">
          <h3 className="font-8bit text-black text-lg mb-3 text-center">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-100 border-2 border-black p-3 rounded-none">
              <div className="font-8bit text-green-600 text-sm">Quests Completed</div>
              <div className="font-8bit text-black text-lg">3</div>
            </div>
            <div className="bg-blue-100 border-2 border-black p-3 rounded-none">
              <div className="font-8bit text-blue-600 text-sm">Current Rank</div>
              <div className="font-8bit text-black text-lg">#6</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border-4 border-black rounded-none drop-shadow-[0_8px_0_#000] overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-300 border-b-4 border-black p-4">
            <div className="flex justify-between items-center font-8bit text-black text-sm">
              <div className="flex-1 text-center">Rank</div>
              <div className="flex-2 text-center">Player</div>
              <div className="flex-1 text-center">Eco Points</div>
            </div>
          </div>

          {/* Leaderboard Entries */}
          <div className="divide-y-2 divide-black">
            {leaderboardData.map((player, index) => (
              <div
                key={player.name}
                className={`p-4 flex justify-between items-center font-8bit text-sm ${
                  player.name === 'You' 
                    ? 'bg-green-100 border-2 border-green-400' 
                    : index < 3 
                      ? 'bg-yellow-50' 
                      : 'bg-white'
                }`}
              >
                <div className="flex-1 text-center">
                  {player.rank <= 3 ? (
                    <span className="text-lg">
                      {player.rank === 1 ? '#1' : player.rank === 2 ? '#2' : '#3'}
                    </span>
                  ) : (
                    <span className="text-black">#{player.rank}</span>
                  )}
                </div>
                
                <div className="flex-2 text-center flex items-center justify-center gap-2">
                  <span className={`${
                    player.name === 'You' ? 'text-green-600 font-bold' : 'text-black'
                  }`}>
                    {player.name}
                  </span>
                </div>
                
                <div className="flex-1 text-center">
                  <span className={`${
                    player.name === 'You' ? 'text-green-600 font-bold' : 'text-black'
                  }`}>
                    {player.ecoPoints}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
