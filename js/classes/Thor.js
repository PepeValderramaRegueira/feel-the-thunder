class Thor extends GameCharacter {
  constructor(ctx, w, h, x, y, bgW, bgH, color) {
    super(ctx, w, h, x, y, bgW, bgH, color);

    this.points = 0;
    this.powerPoints = 0;
    this.jumpHeight = 30;
    this.hammer = undefined

    this.attacks = {
      // Attacks that Thor can perform
      hummer: 25,
      throwHammer: 25,
      throwLighning: 50,
      feelTheThunder: 500
    };

    this.states = {
      isLookingRight: true,
      isGoingRight: false,
      isLookingLeft: false,
      isGoingLeft: false,
      isJumping: false,
      isAttacking: false,
      isThrowingHammer: false,
      isMoving: false,
      isOverPlatform: false
    };

    this.keys = {
      right: 68,
      left: 65,
      jump: 32,
      attack: 81,
      throwHummer: 49,
      throwLighning: 50,
      feelTheThunder: 51
    };

    // Image
    // this.gameCharacter = new Image();
    // this.gameCharacter.src = "./assets/thor-sprites.png";
    // this.gameCharacter.onload = () => {
    // this.ctx.drawImage(this.gameCharacter, this.x, this.y);
    // this.ctx.drawImage(this.gameCharacter, 10, 100, 75, 100, 50, 75, 75, 100);
    // };
  }

  draw() {
    this.controller();

    if (this.y >= this.bgH - this.h - 20) this.y = this.bgH - this.h - 20;

    this.ctx.beginPath();
    // this.ctx.drawImage(this.gameCharacter, this.x, this.y);
    // this.ctx.drawImage(this.gameCharacter, 10, 100, 75, 100, 50, 75, 75, 100);
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }

  handleKeyEvents() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === this.keys.right) {
        this.states.isMoving = true;
        this.states.isGoingRight = true;
      }

      if (e.keyCode === this.keys.left) {
        this.states.isMoving = true;
        this.states.isGoingLeft = true;
      }

      if (e.keyCode === this.keys.jump && !this.states.isJumping) {
        this.states.isJumping = true;
        this.states.isTouchingGround = false;

        setTimeout(() => {
          this.states.isJumping = false;
          this.states.isTouchingGround = true;
        }, 500);
      }

      if (e.keyCode === this.keys.throwHummer && !this.states.isThrowingHammer) {
        this.states.isThrowingHammer = true;
        this.hammer = new Hammer(this.ctx, this.x, this.bgH - 20 - (this.h / 2), this.bgW)
      }
    });

    window.addEventListener("keyup", e => {
      if (e.keyCode === this.keys.right) {
        this.states.isMoving = false;
        this.states.isGoingRight = false;
      }

      if (e.keyCode === this.keys.left) {
        this.states.isMoving = false;
        this.states.isGoingLeft = false;
      }
    });
  }

  isMovingRight() {
    if (this.states.isGoingRight) {
      // Check the right limits
      if (this.x >= this.bgW - this.w) {
        this.x = this.bgW - this.w;
      } else {
        this.x += this.speedX;
      }
    }

    // Limitate the speed so Thor can't run faster than 10
    if (this.speedX >= 10) {
      this.speedX = 10;
    } else {
      this.speedX += 0.5;
    }
  }

  isMovingLeft() {
    if (this.states.isGoingLeft) {
      // Check the left limits
      if (this.x <= 0) {
        this.x = 0;
      } else {
        this.x -= this.speedX;
      }
    }
  }

  isTouchingGround() {
    if (this.y >= this.bgH - this.h - 20) {
      this.gravitySpeed = 0;
      this.speedY = 0;
    } else {
      this.y += this.speedY;
    }
  }

  isMoving() {
    // If Thor is not moving, reset the X speed
    if (!this.states.isMoving) {
      this.speedX = 0;
    }
  }

  draw() {
    super.draw()

    if (this.states.isLookingRight && this.states.isThrowingHammer) {
      if (this.states.isLookingRight) this.hammer.throw("right")
    } else if (this.states.isLookingLeft && this.states.isThrowingHammer) {
      this.hammer.throw("left", this.hammerSpeed)
    }

    if (this.states.isThrowingHammer) {

      console.log(this.states.isThrowingHammer)
      if (this.states.isLookingRight) {
        if (this.hammer.x <= this.x) this.states.isThrowingHammer = false
      }
    }
  }

  isJumping() {
    if (this.states.isJumping) {
      this.y -= this.jumpHeight;
    } else {
      this.states.isJumping = false;
    }
  }

  controller() {
    this.isJumping();
    this.isMoving();
    this.isMovingRight();
    this.isMovingLeft();
    this.isTouchingGround();
    this.applyGravity();
  }
}
