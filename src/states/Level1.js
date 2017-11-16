/* globals __DEV__ */
import Phaser from 'phaser'
import Ted from '../sprites/Ted'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('bullet', './assets/images/bullet3.png')
  }

  create () {
    let groundHeight = 300
    this.fireRate = 300
    this.nextFire = 0

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.ted = new Ted({
      game: this.game,
      x: 32,
       y: this.game.height - (groundHeight + 64)
    })

    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(20, 'bullet')
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('outOfBoundsKill', true)


    this.game.add.existing(this.game.ted)

    this.game.physics.arcade.enable(this.game.ted)

    this.game.ted.body.gravity.y = 6000
    this.game.ted.body.collideWorldBounds = true

    this.platforms = this.game.add.group()
	  this.platforms.enableBody = true
	  var ground = this.platforms.create(0, this.game.world.height - 64, 'ground')
	  this.createPlatform(400, this.game.world.height - 600)
	  ground.scale.setTo(30, 1)
	  ground.body.immovable = true
  }

  createPlatform (x, y) {
	    var plat1 = this.platforms.create(x, y, 'ground')
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
      plat1.scale.setTo(1, 0.25)
      plat1.body.immovable = true
}
    render () {
    /*if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }*/
    this.game.debug.spriteInfo(this.game.ted, 32, 100)
    this.game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32)
    this.game.debug.text('Inactive Bullets: ' + this.bullets.countDead() + ' / ' + this.bullets.total, 32, 64)

  }

  update () {
    if(this.spaceKey.isDown)
    {
      this.fire()
    }
     this.game.physics.arcade.collide(this.game.ted, this.platforms)
  }

  fire() {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        console.log("Pew Pew Pew!")

        this.nextFire = this.game.time.now + this.fireRate;

        this.bullet = this.bullets.getFirstDead();

        this.bullet.scale.setTo(0.5,0.5)

        this.bullet.reset(this.game.ted.x + 40, this.game.ted.y);

        this.game.physics.arcade.moveToXY(this.bullet, this.game.ted.x + 1000,this.game.ted.y,400);
    }
  }
}
