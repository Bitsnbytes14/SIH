import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Phaser from 'phaser'

const GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' })
  },
  preload: function () {
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png')
    this.load.image('raccoon', 'https://labs.phaser.io/assets/sprites/phaser-dude.png')
  },
  create: function () {
    const width = this.scale.width
    const height = this.scale.height

    const platforms = this.physics.add.staticGroup()
    // Raise the ground so the player stands higher
    const groundY = height - 60
    platforms.create(width / 2, groundY, 'ground').setScale(2, 1).refreshBody()

    this.player = this.physics.add.sprite(100, groundY - 50, 'raccoon')
    this.player.setCollideWorldBounds(true)
    this.player.body.setSize(this.player.width * 0.6, this.player.height)
    this.player.setBounce(0.1)

    this.physics.add.collider(this.player, platforms)

    this.cursors = this.input.keyboard.createCursorKeys()
  },
  update: function () {
    const speed = 160
    const jumpVelocity = -330
    const left = this.leftPressed || this.cursors.left.isDown
    const right = this.rightPressed || this.cursors.right.isDown
    const up = this.jumpPressed || this.cursors.up.isDown

    if (left) {
      this.player.setVelocityX(-speed)
      this.player.setFlipX(true)
    } else if (right) {
      this.player.setVelocityX(speed)
      this.player.setFlipX(false)
    } else {
      this.player.setVelocityX(0)
    }

    if ((up) && this.player.body.blocked.down) {
      this.player.setVelocityY(jumpVelocity)
    }
  }
})

const Play = () => {
  const navigate = useNavigate()
  const gameRef = useRef(null)
  const phaserRef = useRef(null)

  useEffect(() => {
    if (phaserRef.current) return

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: window.innerWidth,
      height: Math.round(window.innerHeight * 0.8),
      backgroundColor: '#87CEEB',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 600 }, debug: false }
      },
      scene: [GameScene]
    }

    phaserRef.current = new Phaser.Game(config)

    const resize = () => {
      phaserRef.current.scale.resize(window.innerWidth, Math.round(window.innerHeight * 0.8))
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      phaserRef.current?.destroy(true)
      phaserRef.current = null
    }
  }, [])

  // Touch UI hooks into scene flags
  useEffect(() => {
    const setFlag = (name, value) => {
      const scene = phaserRef.current?.scene?.keys?.GameScene
      if (scene) scene[name] = value
    }
    const onLeftStart = () => setFlag('leftPressed', true)
    const onLeftEnd = () => setFlag('leftPressed', false)
    const onRightStart = () => setFlag('rightPressed', true)
    const onRightEnd = () => setFlag('rightPressed', false)
    const onJumpStart = () => setFlag('jumpPressed', true)
    const onJumpEnd = () => setFlag('jumpPressed', false)

    const left = document.getElementById('btn-left')
    const right = document.getElementById('btn-right')
    const jump = document.getElementById('btn-jump')
    if (left && right && jump) {
      const on = (el, ev, fn) => { el.addEventListener(ev, fn); el.addEventListener('touch' + ev.slice(5), fn, { passive: true }) }
      const off = (el, ev, fn) => { el.removeEventListener(ev, fn); el.removeEventListener('touch' + ev.slice(5), fn) }

      on(left, 'pointerdown', onLeftStart)
      on(left, 'pointerup', onLeftEnd)
      on(right, 'pointerdown', onRightStart)
      on(right, 'pointerup', onRightEnd)
      on(jump, 'pointerdown', onJumpStart)
      on(jump, 'pointerup', onJumpEnd)

      return () => {
        off(left, 'pointerdown', onLeftStart)
        off(left, 'pointerup', onLeftEnd)
        off(right, 'pointerdown', onRightStart)
        off(right, 'pointerup', onRightEnd)
        off(jump, 'pointerdown', onJumpStart)
        off(jump, 'pointerup', onJumpEnd)
      }
    }
  }, [])

  return (
    <div className="min-h-dvh w-full bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="font-8bit bg-yellow-300 border-4 border-black text-black px-4 py-2 rounded-none drop-shadow-[0_4px_0_#000] active:translate-y-[2px] active:drop-shadow-[0_2px_0_#000]"
        >
          ← Back
        </button>
      </div>
      
      <div ref={gameRef} className="w-full" />
      <div className="h-[20dvh] w-full flex items-center justify-between px-6 select-none">
        <div className="flex items-center gap-3">
          <button id="btn-left" className="font-8bit w-16 h-16 bg-yellow-300 border-4 border-black text-black rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000]">◀</button>
          <button id="btn-right" className="font-8bit w-16 h-16 bg-yellow-300 border-4 border-black text-black rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000]">▶</button>
        </div>
        <button id="btn-jump" className="font-8bit w-20 h-20 bg-yellow-300 border-4 border-black text-black rounded-none drop-shadow-[0_6px_0_#000] active:translate-y-[4px] active:drop-shadow-[0_2px_0_#000]">Jump</button>
      </div>
    </div>
  )
}

export default Play


