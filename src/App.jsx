import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Game from './pages/Game'
import Play from './pages/Play'
import IRLQuests from './pages/IRLQuests'
import Leaderboard from './pages/Leaderboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/play" element={<Play />} />
        <Route path="/irl-quests" element={<IRLQuests />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

export default App
