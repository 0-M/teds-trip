import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'ted')

    // this.scale = {x: 0.25, y: 0.25}

    this.anchor.setTo(0.5)
    this.setupAnimations()

    this.airborne = false
    this.landingNeeded = false
    this.crouching = false
    this.goingUp = false

    this.walkSpeed = 1000
    this.jumpSpeed = 4000
    this.iniJumpInc = 2000
    this.jumpInc = 250

    this.cursors = game.input.keyboard.createCursorKeys()
  }

  setupAnimations () {
    this.animations.add('idle', [0, 0, 0, 0, 1, 2, 1, 0, 3, 4, 3, 0, 0, 0, 0, 0], 8, true)
    this.animations.add('walk', [16, 17, 18, 17, 16, 19, 20, 19], 16, true)
    this.animations.add('jump', [32, 33, 34, 35, 36, 37, 38, 39], 32, false)
    this.animations.add('crouch', [32, 38, 37, 48, 49, 50, 51, 52], 32, false)
    this.animations.add('stand-up', [52, 51, 50, 49, 48, 37, 38, 32], 32, false)
  }

  update () {
    if (!this.airborne) { this.body.velocity.x = 0 }

    if (this.body.touching.down) { this.airborne = false }

    if ((this.goingUp && !this.cursors.up.isDown) || this.body.velocity.y <= -this.jumpSpeed) {
      this.goingUp = false
    }
    if (this.goingUp && this.cursors.up.isDown) {
      this.body.velocity.y -= this.jumpInc
    }
    // walkSpeed = this.airborne? 1000:2000;

    if (!this.airborne && this.landingNeeded) { this.handleLandingAnimation() }

    if (!this.animating) {
      if (!this.crouching) {
        if (this.cursors.left.isDown) {
          if (this.scale.x > 0) { this.scale.x *= -1 }
          this.body.velocity.x = -this.walkSpeed
        } else if (this.cursors.right.isDown) {
          if (this.scale.x < 0) { this.scale.x *= -1 }
          this.body.velocity.x = this.walkSpeed
        }

        if (!this.airborne) {
          if (this.cursors.up.isDown) {
            this.handleJumpAnimation()
            this.body.velocity.y = -this.iniJumpInc
          } else if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.animations.play('walk')
          } else if (this.cursors.down.isDown) {
            this.handleCrouchAnimation()
          } else {
            this.animations.play('idle')
          }
        }
      } else if (!this.cursors.down.isDown) {
        this.handleStandUpAnimation()
      }
    }
  }

  handleJumpAnimation (body) {
    this.animating = true
    this.animations.play('jump')
    setTimeout(() => {
      this.animating = false
      this.airborne = true
      this.goingUp = true
      this.landingNeeded = true
      this.frame = 40
    }, 250)
  }

  handleLandingAnimation () {
    this.animating = true
    this.landingNeeded = false
    this.animations.play('jump')
    setTimeout(() => {
      this.animating = false
    }, 250)
  }

  handleCrouchAnimation () {
    this.animating = true
    this.crouching = true
    this.animations.play('crouch')
    setTimeout(() => {
      this.animating = false
      this.frame = 52
    }, 250)
  }

  handleStandUpAnimation () {
    this.crouching = false
    this.animating = true
    this.animations.play('stand-up')
    setTimeout(() => {
      this.animating = false
    }, 250)
  }
}
