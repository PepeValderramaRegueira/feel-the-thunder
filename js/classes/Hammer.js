class Hammer {
  constructor(ctx, x, y, bgW) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.bgW = bgW;
    this.w = 80;
    this.h = 60;
    this.speedX = 15;
    this.img = new Image();
    this.img.src = "./assets/hammer.png";
    this.img.frames = 3;
    this.img.frameIndex = 0;
  }

  throw(direction, framesCounter) {
    // console.log(this.y, this.x, this.w, this.h)
    this.ctx.beginPath();

    if (direction === "right") {
      if (this.x <= this.bgW) {
        this.x += this.speedX;
      }

      if (this.x >= this.bgW) {
        this.speedX *= -1;
      }

      this.x += this.speedX;
    } else {
      if (this.x >= 0) {
        this.x -= this.speedX;
      }

      if (this.x <= 0) this.speedX *= -1;

      this.x -= this.speedX;
    }

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateHammer(framesCounter);

    // this.ctx.rect(this.x, this.y, this.w, this.h);

    // this.ctx.fillStyle = "#0000FF";
    // this.ctx.fill();
    // this.ctx.closePath();
  }

  animateHammer(framesCounter) {
    if (framesCounter % 6 === 0) {
      this.img.frameIndex += 1;

      if (this.img.frameIndex > this.img.frames - 1)
        this.img.frameIndex = 0;
    }
  }
}
