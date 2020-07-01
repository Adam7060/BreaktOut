export default class LivesText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, lives: number) {
    super(scene, x, y, '❤ x ' + lives.toString(), { color: 'black', fontSize: '58px' })
    scene.add.existing(this)
    this.setOrigin(0)
  }

  changeText(lives) {
    this.setText('❤ x ' + lives.toString())
  }
}
