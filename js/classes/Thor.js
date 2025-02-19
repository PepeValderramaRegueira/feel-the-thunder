class Thor extends GameCharacter {
  constructor(ctx, w, h, x, y, bgW, bgH, color, life) {
    super(ctx, w, h, x, y, bgW, bgH, color, life);

    this.framesCounter = 0;

    this.powerPointsThrowHammer = 15;
    this.powerPointsThrowLightning = 10;
    this.powerPointsFeelTheThunder = 20;

    this.enemiesKilled = 0;
    this.powerPoints = 0;
    this.jumpHeight = 40;
    this.hammer = undefined;
    this.radiusAttack = 200;
    this.mouseX = undefined;
    this.mouseY = undefined;

    // Attacks that Thor can perform
    this.attacks = {
      hammer: 15, // No power points required
      throwLighning: 100, // 10 power points required
      throwHammer: 60, // 15 power points required
      feelTheThunder: 500 // 20 power points required
    };

    // Different states for Thor
    this.states = {
      isLookingRight: true,
      isGoingRight: false,
      isLookingLeft: false,
      isGoingLeft: false,
      isJumping: false,
      isAttacking: false,
      isThrowingHammer: false,
      isMoving: false,
      isOverPlatform: false,
      isTouchingGround: true,
      isDead: false
    };

    this.keys = {
      right: 39,
      left: 37,
      jump: 32,
      attack: 81,
      throwLighning: 49,
      throwHummer: 50,
      feelTheThunder: 51,
      releaseTheHulk: 52
    };

    // Sprite config
    this.srcX = 0;
    this.srcY = 0;
    this.sheetWidth = 550;
    this.sheetHeight = 2000;
    this.frameCount = 6;
    this.cols = 5;
    this.rows = 10;
    this.singleSpriteWidth = this.sheetWidth / this.cols;
    this.singleSpriteHeight = this.sheetHeight / this.rows;
    this.currentFrame = 0;

    // Image
    this.gameCharacter = new Image();
    // this.gameCharacter.src = "./assets/sprites-good-big.png";
    this.gameCharacter.src = "./assets/thor-not-moving.png";
    this.gameCharacter.frames = 5;
    this.gameCharacter.frameIndex = 0;

    this.gameCharacter.onload = () => {
      // this.ctx.drawImage(this.gameCharacter, this.x, this.y);
      // this.ctx.drawImage(this.gameCharacter, 10, 100, 75, 100, 50, 75, 75, 100);
    };
  }

  get getStates() {
    return this.states;
  }
  get getPowerPoints() {
    return this.powerPoints;
  }

  increaseLife(life) {
    this.life += life

    if (this.life >= 100) this.life = 100
  }

  updateFrame(srcYPosition) {
    this.currentFrame = ++this.currentFrame % this.cols;
    this.srcX = this.currentFrame * this.singleSpriteWidth;
    this.srcY = 3;
  }

  drawImage(srcYPosition) {
    this.updateFrame(srcYPosition);
    this.ctx.drawImage(
      this.gameCharacter,
      this.srcX,
      this.srcY,
      this.singleSpriteWidth,
      this.singleSpriteHeight,
      this.x,
      this.y,
      this.singleSpriteWidth,
      this.singleSpriteHeight
    );
  }

  increasePowerPoints() {
    this.powerPoints < this.powerPointsFeelTheThunder ? this.powerPoints++ : null;
  }

  increaseScore() {
    this.enemiesKilled++;
  }

  draw(framesCounter) {
    // let srcYPosition = 0
    this.controller();

    if (this.y >= this.bgH - this.h - 20) this.y = this.bgH - this.h - 20;

    if (!this.states.isMoving && !this.states.isJumping) {
      this.gameCharacter.frames = 1;
      if (this.states.isLookingRight) this.gameCharacter.src = "./assets/thor-not-moving.png";
      else this.gameCharacter.src = "./assets/thor-not-moving-reverse.png";
    } else if (this.states.isGoingRight && this.states.isTouchingGround) {
      this.gameCharacter.frames = 5;
      this.gameCharacter.src = "./assets/thor-walking.png";
    } else if (!this.states.isTouchingGround && this.states.isLookingRight) {
      this.gameCharacter.frames = 1;
      this.gameCharacter.src = "./assets/thor-jumping.png";
    } else if (!this.states.isTouchingGround && this.states.isLookingLeft) {
      this.gameCharacter.frames = 1;
      this.gameCharacter.src = "./assets/thor-jumping-reverse.png";
    } else if (this.states.isGoingLeft && this.isTouchingGround) {
      this.gameCharacter.frames = 5;
      this.gameCharacter.src = "./assets/thor-walking-reverse.png";
    }

    if (this.states.isAttacking) {
      this.gameCharacter.frames = 2;
      if (this.states.isLookingRight)
        this.gameCharacter.src = "./assets/thor-attacking.png";
      else
        this.gameCharacter.src = "./assets/thor-attacking-reverse.png";
    }

    if (this.states.isThrowingHammer && this.states.isLookingRight) {
      this.gameCharacter.frames = 1;
      this.gameCharacter.src = "./assets/thor-waiting-hammer.png";
    } else if (this.states.isThrowingHammer && this.states.isLookingLeft) {
      this.gameCharacter.frames = 1;
      this.gameCharacter.src = "./assets/thor-waiting-hammer-reverse.png";
    }

    // this.drawImage(srcYPosition);

    this.ctx.drawImage(
      this.gameCharacter,
      this.gameCharacter.frameIndex *
        Math.floor(this.gameCharacter.width / this.gameCharacter.frames),
      0,
      Math.floor(this.gameCharacter.width / this.gameCharacter.frames),
      this.gameCharacter.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateGameCharacter(framesCounter);

    if (this.states.isLookingRight && this.states.isThrowingHammer) {
      if (this.states.isLookingRight)
        this.hammer.throw("right", this.framesCounter);
    } else if (this.states.isLookingLeft && this.states.isThrowingHammer) {
      this.hammer.throw("left", this.framesCounter);
    }

    if (this.states.isThrowingHammer) {
      if (this.states.isLookingRight) {
        if (this.hammer.x <= this.x) this.states.isThrowingHammer = false;
      }

      if (this.states.isLookingLeft) {
        if (this.hammer.x >= this.x) this.states.isThrowingHammer = false;
      }
    }
  }

  handleKeyEvents() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === this.keys.right && !this.states.isThrowingHammer) {
        this.states.isMoving = false;
        this.states.isGoingLeft = false;
        this.states.isLookingLeft = false;

        this.states.isMoving = true;
        this.states.isGoingRight = true;
        this.states.isLookingRight = true;
      }

      if (e.keyCode === this.keys.left && !this.states.isThrowingHammer) {
        this.states.isMoving = false;
        this.states.isGoingRight = false;
        this.states.isLookingRight = false;

        this.states.isMoving = true;
        this.states.isGoingLeft = true;
        this.states.isLookingLeft = true;
      }

      if (
        e.keyCode === this.keys.jump &&
        !this.states.isJumping &&
        !this.states.isThrowingHammer
      ) {
        this.states.isJumping = true;
        this.states.isTouchingGround = false;

        setTimeout(() => {
          this.states.isJumping = false;
          this.states.isTouchingGround = true;
        }, 600);
      }

      if (e.keyCode === this.keys.attack) {
        this.states.isAttacking = true;
        // this.attack();
      }

      if (
        e.keyCode === this.keys.throwHummer &&
        !this.states.isThrowingHammer &&
        this.powerPoints >= this.powerPointsThrowHammer
      ) {
        this.states.isThrowingHammer = true;
        this.powerPoints -= this.powerPointsThrowHammer;
        this.hammer = new Hammer(
          this.ctx,
          this.x,
          this.bgH - 80 - this.h / 2,
          this.bgW
        );
      } else {
        if (e.keyCode === this.keys.throwHummer) {
          this.hammer.speedX *= -1;
        }
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

      if (e.keyCode === this.keys.attack) {
        this.states.isAttacking = false;
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

  animateGameCharacter(framesCounter) {
    if (framesCounter % 10 === 0) {
      this.gameCharacter.frameIndex += 1;

      if (this.gameCharacter.frameIndex > this.gameCharacter.frames - 1)
        this.gameCharacter.frameIndex = 0;
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
    super.isTouchingGround();
    super.applyGravity();
  }
}
