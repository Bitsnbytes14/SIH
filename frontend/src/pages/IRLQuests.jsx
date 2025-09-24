import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const IRLQuests = () => {
  const navigate = useNavigate()
  const [questStatus, setQuestStatus] = useState('available') // 'available', 'accepted', 'completed'
  const [ecoPoints] = useState(150)

  const handleAcceptQuest = () => {
    setQuestStatus('accepted')
  }

  const handleSubmitProof = () => {
    // In a real app, this would add eco points
  }

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-green-400 to-green-600 flex flex-col">
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
          IRL QUESTS
        </h1>

        {/* Quest Card */}
        <div className="bg-white border-4 border-black rounded-none drop-shadow-[0_8px_0_#000] p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🌳</div>
            <div>
              <h2 className="font-8bit text-black text-xl">Plant a Tree</h2>
              <p className="font-8bit text-gray-600 text-sm">
                Help the environment by planting a tree in your community
              </p>
            </div>
          </div>

          <div className="bg-green-100 border-2 border-black p-4 mb-4">
            <h3 className="font-8bit text-black text-sm mb-2">Quest Details:</h3>
            <ul className="font-8bit text-black text-xs space-y-1">
              <li>• Find a suitable location for planting</li>
              <li>• Plant a native tree species</li>
              <li>• Take a photo as proof</li>
              <li>• Submit your proof to earn rewards</li>
            </ul>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-200 border-2 border-black px-3 py-2 rounded-none">
              <div className="font-8bit text-black text-sm">
                Reward: +50 Eco Points
              </div>
            </div>
            
            <div className={`font-8bit text-sm px-3 py-2 rounded-none border-2 border-black ${
              questStatus === 'available' ? 'bg-gray-200 text-gray-600' :
              questStatus === 'accepted' ? 'bg-blue-200 text-blue-800' :
              'bg-green-200 text-green-800'
            }`}>
              Status: {questStatus === 'available' ? 'Available' : 
                     questStatus === 'accepted' ? 'In Progress' : 'Completed'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {questStatus === 'available' && (
              <button
                onClick={handleAcceptQuest}
                className="font-8bit bg-green-300 border-4 border-black text-black px-6 py-3 rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000] hover:bg-green-200 transition"
              >
                Accept Quest
              </button>
            )}

            {questStatus === 'accepted' && (
              <button
                onClick={handleSubmitProof}
                className="font-8bit bg-blue-300 border-4 border-black text-black px-6 py-3 rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000] hover:bg-blue-200 transition"
              >
                Submit Proof
              </button>
            )}

            {questStatus === 'completed' && (
              <div className="text-center">
                <div className="font-8bit text-green-600 text-lg mb-2">
                  ✅ Quest Completed!
                </div>
                <div className="font-8bit text-green-600 text-sm">
                  Proof Submitted Successfully!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IRLQuests
