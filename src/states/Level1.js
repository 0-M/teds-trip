/* globals __DEV__ */
import Phaser from 'phaser'
import Ted from '../sprites/Ted'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('bullet', './assets/images/arrow.png')
  }

  create () {
    let groundHeight = 300
    this.fireRate = 100
    this.nextFire = 0

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.ted = new Ted({
      game: this.game,
      x: 32,
      y: this.game.height - groundHeight
    })

    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(50, 'bullet')
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('outOfBoundsKill', true)


    this.game.add.existing(this.game.ted)

    this.game.physics.arcade.enable(this.game.ted)

    this.game.ted.body.gravity.y = 30000
    this.game.ted.body.collideWorldBounds = true
  }

    render () {
    /*if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }*/

    this.game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32)
    this.game.debug.text('Inactive Bullets: ' + this.bullets.countDead() + ' / ' + this.bullets.total, 32, 64)

  }

  update () {
    if(this.spaceKey.isDown)
    {
      this.fire()
    }
    // this.game.physics.arcade.collide(this.game.ted, this.platforms)
  }

  fire() {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        console.log("Pew Pew Pew!")

        this.nextFire = this.game.time.now + this.fireRate;

        this.bullet = this.bullets.getFirstDead();

        this.bullet.reset(200, 500);

        this.game.physics.arcade.moveToXY(this.bullet, 1000,500);
    }
  }
}
