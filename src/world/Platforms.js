import Phaser from 'phaser'

export default class extends Phaser.Group {

  
  init () {
    this.enableBody = true;
    var ground = platforms.create(0, game.world.height-64, 'ground');
    ground.scale.setTo(30, 1);
    ground.body.immovable = true;
  }

}