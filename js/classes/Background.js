class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.background = new Image()
    // this.background.src = './assets/background.png'
    this.background.onload = () => {
      // this.ctx.drawImage(this.background, this.w, this.h);
    }
  }

  draw() {
    this.ctx.beginPath();
    // this.ctx.rect(0, 0, w, h);
    // this.ctx.fillStyle = "#F8F8F8";
    this.ctx.drawImage(this.background, 0, 0);
    this.ctx.closePath();
  }
}
