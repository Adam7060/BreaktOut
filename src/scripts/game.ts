import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

// interface GameConfig extends Phaser.Types.Core.GameConfig {
//   width: number
//   scale: {
//     parent: string
//     mode: number
//     autoCenter: number
//     width: number
//     height: number
//   }
// }

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#808080',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
  },
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
