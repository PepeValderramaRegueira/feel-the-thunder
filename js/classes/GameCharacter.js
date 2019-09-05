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
    this.speedX = 2;
    this.speedY = 0;

    // Gravity
    this.gravity = 2;
    this.gravitySpeed = 0;

    // Character's states
    this.states = {
      isLookingRight: true,
      isGoingRight: false,
      isLookingLeft: false,
      isGoingLeft: false,
      isFalling: false,
      isTouchingGround: false,
      isAttacking: false,
      isBeingHitted: false
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

    if (this.x <= 0) {
      this.speedX *= -1;
      this.states.isLookingRight = true
      this.states.isLookingLeft = false
    }
    else if (this.x >= this.bgW) {
      this.speedX *= -1
      this.states.isLookingRight = false
      this.states.isLookingLeft = true
    }

    this.x += this.speedX

    if (this.y >= this.bgH - this.h - 20) this.y = this.bgH - this.h - 20;
    
  }

  applyGravity() {
    this.speedY += this.gravity; // Always apply gravity
  }

  controller() {
    this.isTouchingGround();
    this.applyGravity();
  }
}
