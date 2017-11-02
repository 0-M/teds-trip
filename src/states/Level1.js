/* globals __DEV__ */
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
      y: this.game.height - groundHeight
    })

    this.game.add.existing(this.game.ted)

    this.game.physics.arcade.enable(this.game.ted)

    this.game.ted.body.gravity.y = 30000
    this.game.ted.body.collideWorldBounds = true
  }

  /*  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  } */

  update () {
    // this.game.physics.arcade.collide(this.game.ted, this.platforms)
  }
}
