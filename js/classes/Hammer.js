class Hammer {
  constructor(ctx, x, y, bgW) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.bgW = bgW;
    this.w = 100;
    this.h = 10;
    this.speedX = 30;
    console.log(this.x);
  }

  throw(direction) {
    // console.log(this.y, this.x, this.w, this.h)
    this.ctx.beginPath();

    if (direction === "right") {
      if (this.x <= this.bgW) {
        this.x += this.speedX;
      }

      if (this.x >= this.bgW) this.speedX *= -1;

      this.x += this.speedX;

    } else {
      if (this.x >= 0) {
        this.x -= this.speedX
      }

      if (this.x <= 0) this.speedX *= -1
      
      this.x -= this.speedX
    }

    this.ctx.rect(this.x, this.y, this.w, this.h);

    this.ctx.fillStyle = "#0000FF";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
