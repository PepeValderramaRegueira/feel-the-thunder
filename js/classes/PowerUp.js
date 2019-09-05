class PowerUp {

  constructor(ctx, x, y, w, h) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.life = 25
    this.img = new Image()
    this.img.src = './assets/beer.png'
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y)
  }
  
}
