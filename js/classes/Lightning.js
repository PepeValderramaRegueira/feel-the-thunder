class Lightning {
  constructor (ctx, x, h) {
    this.ctx = ctx
    this.x = x
    this.h = h
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.rect(this.x, 0, 10, this.h)
    this.ctx.fillStyle = "#00FFFF"
    this.ctx.fill()
    this.ctx.closePath()
  }
}
