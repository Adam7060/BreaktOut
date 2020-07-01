export default class Ball extends Phaser.Physics.Arcade.Sprite {
  mainScene: Phaser.Scene

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ball')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.mainScene = scene
    this.setCollideWorldBounds(true).setBounce(1)
    this.init()
  }

  init() {
    this.mainScene.input.on('pointerup', (pointer: any) => {
      if (this.getData('paused')) {
        this.setVelocity(-75, -350)
        this.setData('paused', false)
      }
    })
  }
}
