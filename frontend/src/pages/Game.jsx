import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeBG from '../assets/BGImg.png'

const Game = () => {
  const navigate = useNavigate()
  const [ecoPoints] = useState(150) // Dummy eco points

  return (
    <div className="min-h-dvh w-full bg-black flex flex-col relative overflow-hidden">
      {/* Image Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${HomeBG})` }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Eco Points Display */}
        <div className="absolute top-4 right-4 bg-yellow-300 border-4 border-black px-4 py-2 rounded-none drop-shadow-[0_4px_0_#000]">
          <div className="font-8bit text-black text-sm">
            🌱 {ecoPoints} Eco Points
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-start pt-16">
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <h1 className="font-8bit uppercase tracking-widest text-white drop-shadow-[0_4px_0_#000] text-4xl sm:text-5xl md:text-6xl">
              GROOTED
            </h1>
            
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigate('/play')}
                className="select-none font-8bit uppercase tracking-widest bg-yellow-300 border-4 border-black text-black px-10 py-3 rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000] hover:bg-yellow-200 transition"
              >
                Play
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/irl-quests')}
                className="select-none font-8bit uppercase tracking-widest bg-green-300 border-4 border-black text-black px-10 py-3 rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000] hover:bg-green-200 transition"
              >
                View IRL Quests
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/leaderboard')}
                className="select-none font-8bit uppercase tracking-widest bg-purple-300 border-4 border-black text-black px-10 py-3 rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000] hover:bg-purple-200 transition"
              >
                Show Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
