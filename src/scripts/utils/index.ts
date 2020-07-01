import Brick from '../objects/brick'

export function dropPowerUp() {
  // Here we can add the probability logic for dropping a powerup
  return Math.random() * 100 < 21
}

export function generateBricks(scene, patternName) {
  const bricks: Brick[] = []
  const [width, height] = [scene.game.config.width, scene.game.config.height]

  const brickWidth = scene.textures.get('brick').getSourceImage().width
  const brickHeight = scene.textures.get('brick').getSourceImage().height
  let rows: number, columns: number, total: number

  switch (patternName) {
    case 'standard':
      // Rows and columns are adjustable
      rows = 6
      columns = 10
      total = columns * rows
      for (let i = 0; i < total; i++) {
        const health: number = 3 - Math.floor((((3 * i) / rows) % (columns * 3)) / columns)
        const [x, y] = [
          (+scene.game.config.width - (columns - 1) * brickWidth) / 2 + (i % columns) * brickWidth,
          130 + Math.floor(i / columns) * brickHeight,
        ]
        const brick = new Brick(scene, x, y, health)
        bricks.push(brick)
      }
      return bricks

    case 'mixed':
      // total is adjustable
      total = 45
      for (let i = 0; i < total; i++) {
        const health = Math.round(0.5 + Math.random() * 2.4)
        const [x, y] = [
          (+scene.game.config.width - 800) / 2 + (i % 9) * brickWidth,
          130 + Math.floor(i / 9) * brickHeight,
        ]
        const brick = new Brick(scene, x, y, health)
        bricks.push(brick)
      }
      return bricks

    case 'scattered':
      // total is adjustable
      total = 45
      for (let i = 0; i < total; i++) {
        const health = Math.round(0.5 + Math.random() * 2.4)
        const [x, y] = [
          (+scene.game.config.width - 900) / 2 + (i % 9) * (brickWidth + 15),
          110 + Math.floor(i / 9) * (brickHeight + 15),
        ]
        const brick = new Brick(scene, x, y, health)
        bricks.push(brick)
      }
      return bricks

    default:
      // Standard is default test pattern
      bricks.push(new Brick(scene, 100, 100, 1), new Brick(scene, 300, 100, 1), new Brick(scene, 500, 100, 3))
      return bricks
  }
}
