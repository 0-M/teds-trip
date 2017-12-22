import Phaser from 'phaser'
import Ted from '../sprites/Ted'
import RedTed from '../sprites/RedTed'

export default class extends Phaser.State {
  init () {
    //this.stage.backgroundColor = '#F442DF'
    this.background = this.game.add.tileSprite(0, 0, 10000, 3000, 'background')
  }
  preload () {
    this.load.image('bullet', './assets/images/bullet3.png')
  }

  create () {

    let groundHeight = 300
    this.fireRate = 300
    this.nextFire = 0
    this.game.world.setBounds(0, 0, this.game.width * 5, this.game.height * 2)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.game.ted = new Ted({
      game: this.game,
      x: 32,
      y: this.game.height - (groundHeight + 64)
    })

    this.soundtrack = this.game.add.audio('exist_soundtrack')
    this.soundtrack.loop = true
    // this.soundtrack.volume = 0.3
    this.soundtrack.play()

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

    this.game.camera.follow(this.game.ted)

    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground')
    this.createPlatform(400, this.game.world.height - 600, 'floor2', 3)
    this.createPlatform(2000, this.game.world.height - 1200, 'floor2', 4)

    ground.scale.setTo(30, 1)
    ground.body.immovable = true


    this.makeEnemies()
  }

  makeEnemies() {
    this.enemies = this.game.add.group()

    for (var tempIndex=2; tempIndex < 8; tempIndex++) {
      let en1 = new RedTed({
        game: this.game,
        x: tempIndex * 500,
        y: this.game.height - (364)
      })
  
      this.game.add.existing(en1)
      this.game.physics.arcade.enable(en1)
  
      en1.body.gravity.y = 6000
      en1.body.collideWorldBounds = true
  
      this.enemies.add(en1)
    }

    
  }

  resetLevel() {
    this.state.start('Level1')
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

  render () {
    /* if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    } */
    this.game.debug.spriteInfo(this.game.ted, 32, 100)
    // this.game.debug.spriteInfo(this.platforms, 32, 200)
    this.game.debug.text('Active Bullets: ' + this.bullets.countLiving() + ' / ' + this.bullets.total, 32, 32)
    this.game.debug.text('Inactive Bullets: ' + this.bullets.countDead() + ' / ' + this.bullets.total, 32, 64)
  }

  update () {
    if (this.spaceKey.isDown) {
      this.fire()
    }
    this.game.physics.arcade.collide(this.game.ted, this.platforms)
    this.game.physics.arcade.collide(this.enemies, this.platforms)
    if (this.game.physics.arcade.collide(this.game.ted, this.enemies)) {
      this.resetLevel()
    }
    this.enemies.forEach(element => {
      if (this.game.physics.arcade.collide(this.bullets, element)) {
        element.destroy()
      }
    })


  }

  fire () {
    if(this.game.ted.facingRight == 1)
    {
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        console.log('Pew Pew Pew Right!')

        this.nextFire = this.game.time.now + this.fireRate

        this.bullet = this.bullets.getFirstDead()

        this.bullet.scale.setTo(0.5, 0.5)

        this.bullet.reset(this.game.ted.x + 40, this.game.ted.y)
                this.game.physics.arcade.moveToXY(this.bullet, this.game.ted.x + 1000, this.game.ted.y, 400)
      }
    }
    else
    {
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        console.log('Pew Pew Pew Left!')

        this.nextFire = this.game.time.now + this.fireRate

        this.bullet = this.bullets.getFirstDead()

        this.bullet.scale.setTo(0.5, 0.5)

        this.bullet.reset(this.game.ted.x + 40, this.game.ted.y)
                this.game.physics.arcade.moveToXY(this.bullet, this.game.ted.x - 1000, this.game.ted.y, 400)
      }
    }
  }
}
