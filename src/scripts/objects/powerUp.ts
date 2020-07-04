export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
  private _scene: Phaser.Scene

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'power-up')
    this._scene = scene
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setOrigin(0)
    this.setVelocity(0, 75)
    this.generatePowerUp()
  }

  generatePowerUp() {
    // @ts-ignore
    const paddle = this._scene.paddle
    switch (Math.random() * 3) {
      case 0:
        this._scene.physics.add.collider(this, paddle, this.extraLife, undefined, this._scene)
        break
      case 1:
        this._scene.physics.add.collider(this, paddle, this.widenPaddle, undefined, this._scene)
        break
      case 2:
        this._scene.physics.add.collider(this, paddle, this.extraBall, undefined, this._scene)
        break
      case 3:
        this._scene.physics.add.collider(this, paddle, this.shooting, undefined, this._scene)
        break
    }
  }

  extraLife(powerUp, _) {
    powerUp.destroy()
    // context is passed from the collider (this belongs to the main game scene)
    //@ts-ignore
    this.incrementLives()
  }

  extraBall(powerUp, _) {
    powerUp.destroy()
    //@ts-ignore
    this.spawnBall()
  }

  shooting(powerUp, paddle) {
    powerUp.destroy()
    if (!paddle.getData('shootingActive')) {
      paddle.enableShooting()
      paddle.setTexture('paddle-shooter')
      //@ts-ignore
      const timer = this.time.delayedCall(3000, paddle.disableShooting, [paddle], paddle)
      paddle.setData('timer', timer)
    } else {
      const timer = paddle.getData('timer')
      timer.destroy()
      //@ts-ignore
      const newTimer = this.time.delayedCall(3000, paddle.disableShooting, [paddle], paddle)
      paddle.setData('timer', newTimer)
    }
  }

  widenPaddle(powerUp, paddle) {
    powerUp.destroy()
    paddle.widen()
  }
}
