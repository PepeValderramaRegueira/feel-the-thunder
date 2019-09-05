class Lightning {
  constructor(ctx, x, h) {
    this.ctx = ctx;
    this.x = x;
    this.h = h;
    this.img = new Image();
    this.img.src = "./assets/lighning.png";
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.drawImage(this.img, this.x, 0, 10, this.h);
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
