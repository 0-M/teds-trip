    if (this.dodging) {
      this.body.velocity.x += this.pointingRight? this.dodgeVelDec : -this.dodgeVelDec
      this.dodgeLandingNeeded = true
    } else

    if (this.cursors.flinch.isDown) {this.handleFlinchAnimation()}
