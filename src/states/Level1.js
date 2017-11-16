import Phaser from 'phaser'
import Ted from '../sprites/Ted'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let groundHeight = 300

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.game.ted = new Ted({
      game: this.game,
      x: 32,
      y: this.game.height - (groundHeight + 64)
    })

    this.game.add.existing(this.game.ted)

    this.game.physics.arcade.enable(this.game.ted)

    this.game.ted.body.gravity.y = 6000
    this.game.ted.body.collideWorldBounds = true

    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground')
    this.createPlatform(400, this.game.world.height - 600, 'floor2', 5)
    ground.scale.setTo(30, 1)
    ground.body.immovable = true
  }

  createPlatform (x, y, type, number) {
    var plat1 = this.platforms.create(x, y, type)
    plat1.body.immovable = true
    number = number - 1
    var count = 1
    while (number > 0) {
      var plat = this.platforms.create(x + (count * plat1.width), y, type)
      plat.body.immovable = true
      count++
      number--
    }
  }

  /*  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  } */

  update () {
    this.game.physics.arcade.collide(this.game.ted, this.platforms)
  }
}
