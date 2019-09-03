class Ground {
  constructor(ctx, bgW, bgH) {
    this.ctx = ctx

    // Background's dimensions
    this.bgW = bgW
    this.bgH = bgH

    // Ground dimensions
    this.w = bgW
    this.h = 20
    this.groundY = bgH - this.h
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.rect(0, this.groundY, w, this.h)
    this.ctx.fillStyle = "#343434"
    this.ctx.fill()
    this.ctx.closePath()
  }
}
