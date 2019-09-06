class Elf extends Enemy {
  constructor(ctx, w, h, x, y, bgW, bgH, color, life, damage) {
    super(ctx, w, h, x, y, bgW, bgH, color, life, damage);

    this.golem = new Image();
    this.golem.src = "./assets/enemies/golem-walk.png";
    this.golem.frames = 6;
    this.golem.frameIndex = 0;

    this.enemyDies = new Image()
    this.enemyDies.src = './assets/blue-explosion.png'
  }

  animateGameCharacter(framesCounter) {
    if (framesCounter % 6 === 0) {
      this.golem.frameIndex += 1;

      if (this.golem.frameIndex > this.golem.frames - 1)
        this.golem.frameIndex = 0;
    }
  }

  draw(framesCounter) {
    if (this.isDead) {
      this.ctx.save()
      // this.ctx.moveTo(this.x + this.w / 2, this.y + this.h / 2)
      // this.ctx.translate(this.x + this.w / 2, this.y + 20)
      // this.ctx.rotate(Math.PI / 180 * Math.random() * 360)
      // this.ctx.moveTo(this.x, this.y)
      this.ctx.drawImage(this.enemyDies, this.x, this.y)
      this.ctx.restore()
    } else {
      super.draw();
      if (this.states.isLookingRight)
        this.golem.src = "./assets/enemies/golem-walk-reverse.png";
      else this.golem.src = "./assets/enemies/golem-walk.png";

      this.ctx.drawImage(
        this.golem,
        this.golem.frameIndex *
          Math.floor(this.golem.width / this.golem.frames),
        0,
        Math.floor(this.golem.width / this.golem.frames),
        this.golem.height,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animateGameCharacter(framesCounter);
    }
  }
}
