export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('brick', 'assets/img/brick.png')
    this.load.image('paddle', 'assets/img/paddle.png')
    this.load.image('paddle-shooter', 'assets/img/paddle-shooter.png')
    this.load.image('ball', 'assets/img/ball.png')
    this.load.image('power-up', 'assets/img/power-up.png')
    this.load.image('bullet', 'assets/img/bullet.png')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
