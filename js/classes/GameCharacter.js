class GameCharacter {
  constructor(ctx, w, h, x, y, bgW, bgH, color, life) {
    this.ctx = ctx;

    // Dimensions
    this.w = w;
    this.h = h;
    this.bgW = bgW;
    this.bgH = bgH;
    this.color = color
    this.life = life

    // Positioning
    this.x = x;
    this.y = y;

    // Movement
    this.speedX = 10;
    this.speedY = 0;

    // Gravity
    this.gravity = 2;
    this.gravitySpeed = 0;

    // Character's states
    this.states = {
      isLookingRight: false,
      isGoingRight: false,
      isLookingLeft: false,
      isGoingLeft: false,
      isFalling: false,
      isTouchingGround: false,
      isAttacking: false
    };
  }

  isTouchingGround() {
    if (this.y >= this.bgH - this.h - 20) {
      this.gravitySpeed = 0;
      this.speedY = 0;
    } else {
      this.y += this.speedY;
    }
  }

  draw() {
    this.controller()
    // if (this.y >= this.bgH - this.h - 20) this.y = this.bgH - this.h - 20;
    if (this.y >= this.bgH - this.h - 20) this.y = this.bgH - this.h - 20;
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.w, this.h)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
  }

  applyGravity() {
    this.speedY += this.gravity; // Always apply gravity
  }

  controller() {
    this.isTouchingGround();
    this.applyGravity();
  }
}
