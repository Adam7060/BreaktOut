import Ball from '../objects/ball'
import Paddle from '../objects/paddle'
import Brick from '../objects/brick'
import PowerUp from '../objects/powerUp'
import LivesText from '../objects/livesText'
import { Scene } from 'phaser'
import { dropPowerUp, generateBricks } from '../utils'
import { gameConfig } from './config'

export default class MainScene extends Scene {
  level: number = 0
  lives: number
  balls: Ball[]
  bricks: Brick[]
  paddle: Paddle
  powerUps: PowerUp[]
  livesText: LivesText

  constructor() {
    super({ key: 'MainScene' })
    this.lives = 3
  }

  create() {
    this.powerUps = []
    this.balls = []
    // Enable screen bounds except bottom
    this.physics.world.setBoundsCollision(true, true, true, false)
    this.livesText = new LivesText(this, +this.game.config.width - 250, 20, this.lives)

    const ball = new Ball(this, +this.game.config.width / 2, +this.game.config.height / 2).setData('paused', true)
    this.balls.push(ball)
    this.paddle = new Paddle(this, +this.game.config.width / 2, +this.game.config.height - 75)
    this.physics.add.collider(ball, this.paddle, this.hitPaddle, undefined, this)

    // create bricks
    this.bricks = generateBricks(this, 'standard')
    this.bricks.map((brick) => {
      this.physics.add.collider(ball, brick, this.hitBrick, undefined, this)
    })
  }

  spawnBall() {
    const newBall = new Ball(this, +this.game.config.width / 2, +this.game.config.height / 2).setVelocity(-75, -350)
    this.physics.add.collider(newBall, this.paddle, this.hitPaddle, undefined, this)
    this.bricks.map((brick) => {
      this.physics.add.collider(newBall, brick, this.hitBrick, undefined, this)
    })
    this.balls.push(newBall)
  }

  incrementLives() {
    this.lives++
    this.livesText.changeText(this.lives)
  }

  decrementLives() {
    this.lives--
    this.livesText.changeText(this.lives)
  }

  bulletHitBrick(bullet) {
    for (let i = 0; i < this.bricks.length; i++) {
      this.physics.add.collider(bullet, this.bricks[i], this.hitBrick, () => bullet.destroy(), this)
    }
  }

  hitBrick(_, brick) {
    brick.hitBrick()
    const brickDestroyed = brick.health === 0
    if (brickDestroyed) {
      if (dropPowerUp()) {
        this.powerUps.push(new PowerUp(this, brick.x, brick.y))
      }
    }
  }

  hitPaddle(ball, paddle) {
    // Change ball velocity direction based on collision location
    if (ball.x < paddle.x) {
      ball.setVelocityX(-10 * ((paddle.x - ball.x) / 2))
    } else if (ball.x > paddle.x) {
      ball.setVelocityX(10 * ((ball.x - paddle.x) / 2))
    } else {
      ball.setVelocityX(2 + Math.random() * 8)
    }
  }

  destroyBricks() {
    // destroy all bricks before redeclaring empty array to avoid memory leaks
    this.bricks.map((brick) => (!brick.getData('destroyed') ? brick.destroy() : null))
    this.bricks = []
  }

  destroyBalls() {
    // destroy all bricks balls redeclaring empty array to avoid memory leaks
    this.balls.map((ball) => ball.destroy())
    this.balls = []
  }

  nextLevel() {
    const patternName: string = gameConfig[this.level].patternName
    this.destroyBalls()
    const ball = new Ball(this, +this.game.config.width / 2, +this.game.config.height / 2).setData('paused', true)
    this.physics.add.collider(ball, this.paddle, this.hitPaddle, undefined, this)
    this.balls.push(ball)

    this.destroyBricks()
    this.bricks = generateBricks(this, patternName)
    this.bricks.map((brick) => {
      this.physics.add.collider(ball, brick, this.hitBrick, undefined, this)
    })
    this.powerUps.map((powerUp) => powerUp.destroy())
    this.powerUps = []
  }

  resetGame() {
    this.destroyBalls()
    const ball = new Ball(this, +this.game.config.width / 2, +this.game.config.height / 2).setData('paused', true)
    this.physics.add.collider(ball, this.paddle, this.hitPaddle, undefined, this)
    this.balls.push(ball)

    this.bricks.map((brick) => {
      this.physics.add.collider(ball, brick, this.hitBrick, undefined, this)
    })

    this.powerUps.map((powerUp) => powerUp.destroy())
    this.powerUps = []
  }

  endGame(isVictorious: boolean) {
    // isVictorious ? (text = 'GOOD JOB!') : (text = 'GAME OVER!')
    const text: string = isVictorious ? 'GOOD JOB!' : 'GAME OVER!'
    const message = this.add
      .text(+this.game.config.width / 2, +this.game.config.height / 2, text, {
        fontSize: '78px',
      })
      .setOrigin(0.5)
    if (isVictorious) {
      this.level++
      if (this.level > gameConfig.length - 1) {
        this.scene.pause()
      } else {
        message.destroy()
        this.nextLevel()
      }
    }
  }

  update() {
    // Remove ball from game
    this.balls.filter((ball, index) => {
      if (ball.y > this.game.config.height) {
        this.balls = this.balls.filter((b, i) => i !== index)
        ball.destroy()
        return false
      }
    })

    if (!this.balls.length) {
      this.decrementLives()
      this.lives > 0 ? this.resetGame() : this.endGame(false)
    }

    if (!this.bricks.filter((brick) => !brick.getData('destroyed')).length) {
      this.endGame(true)
    }
  }
}
