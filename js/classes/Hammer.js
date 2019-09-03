class Hammer {
  constructor(ctx, x, y, bgW) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.bgW = bgW
    this.w = 100
    this.h = 10
    this.speedX = 40
    console.log(this.x)
  }

  throw(direction) {

    // console.log(this.y, this.x, this.w, this.h)
    this.ctx.beginPath()

    if (this.x <= this.bgW) {
      this.x += this.speedX
    }

    if (this.x >= this.bgW) this.speedX *= -1

    this.x += this.speedX

    if (direction === "right") {
      this.ctx.rect(this.x, this.y, this.w, this.h)
    } else {
      this.ctx.rect(--this.x, this.y, this.w, this.h)
    }

    this.ctx.fillStyle = "#0000FF";
    this.ctx.fill()
    this.ctx.closePath()
  }
}
