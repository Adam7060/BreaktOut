export default class Brick extends Phaser.Physics.Arcade.Sprite {
  _scene: Phaser.Scene
  health: number

  constructor(scene: Phaser.Scene, x: number, y: number, health: number) {
    super(scene, x, y, 'brick')
    this._scene = scene
    this.health = health
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setImmovable()
    this.adjustBrickState()
  }

  hitBrick() {
    this.health--
    this.adjustBrickState()
  }

  adjustBrickState() {
    switch (this.health) {
      case 0:
        this.destroy()
        this.setData('destroyed', true)
        break
      case 1:
        this.setTint(0xff0000)
        break
      case 2:
        this.setTint(0xffff00)
        break
      case 3:
        this.setTint(0x0000ff)
        break
    }
  }
}
