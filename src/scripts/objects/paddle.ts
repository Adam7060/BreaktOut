export default class Paddle extends Phaser.Physics.Arcade.Sprite {
  mainScene: Phaser.Scene
  blinkTween: Phaser.Tweens.Tween

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'paddle')
    this.mainScene = scene
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setImmovable()
    this.setData('isShooting', false)
    this.setData('isWider', false)
    this.init()
  }

  init() {
    // move paddle with pad.
    this.mainScene.input.on('pointermove', (pointer: { x: number }) => {
      this.x = Phaser.Math.Clamp(
        pointer.x,
        this.displayWidth / 2,
        +this.mainScene.game.config.width - this.displayWidth / 2
      )
    })

    // check if shooting is activated
    this.mainScene.input.on('pointerup', (pointer) => {
      if (this.getData('shootingActive')) {
        this.shoot()
      }
    })
  }

  enableShooting() {
    this.setData('shootingActive', true)
  }

  disableShooting() {
    this.setData('shootingActive', false)
    this.setTexture('paddle')
  }

  shoot() {
    const bullet1 = this.mainScene.physics.add
      .sprite(this.x - this.width / 2, this.y - this.height / 2, 'bullet')
      .setVelocity(0, -500)
    const bullet2 = this.mainScene.physics.add
      .sprite(this.x + this.width / 2, this.y - this.height / 2, 'bullet')
      .setVelocity(0, -500)
    //@ts-ignore
    this.mainScene.bulletHitBrick(bullet1)
    //@ts-ignore
    this.mainScene.bulletHitBrick(bullet2)
  }

  widen() {
    if (!this.getData('isWider')) {
      this.displayWidth = this.width * 1.5
      this.setData('isWider', true)
      this.blinkTween = this.mainScene.tweens.add({
        targets: this,
        alpha: 0,
        repeat: 10,
        ease: 'Linear',
        duration: 300,
        delay: 7000,
        yoyo: true,
        onComplete: () => {
          this.displayWidth = this.width
          this.setData('isWider', false)
        },
      })
    } else {
      this.blinkTween.stop()
      this.alpha = 1
      this.displayWidth = this.width * 1.5
      this.blinkTween = this.mainScene.tweens.add({
        targets: this,
        alpha: 0,
        repeat: 10,
        ease: 'Linear',
        duration: 300,
        delay: 7000,
        yoyo: true,
        onComplete: () => {
          this.displayWidth = this.width
          this.setData('isWider', false)
        },
      })
    }
  }
}
