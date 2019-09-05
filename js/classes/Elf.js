class Elf extends Enemy {
  constructor(ctx, w, h, x, y, bgW, bgH, color, life, damage) {
    super(ctx, w, h, x, y, bgW, bgH, color, life, damage);

    this.golem = new Image();
    this.golem.src = "./assets/enemies/golem-walk.png";
    this.golem.frames = 6;
    this.golem.frameIndex = 0;
  }

  animateGameCharacter(framesCounter) {
    if (framesCounter % 6 === 0) {
      this.golem.frameIndex += 1;

      if (this.golem.frameIndex > this.golem.frames - 1)
        this.golem.frameIndex = 0;
    }
  }

  draw(framesCounter) {
    super.draw()
    
    if (this.states.isLookingRight) this.golem.src = "./assets/enemies/golem-walk-reverse.png";
    else this.golem.src = "./assets/enemies/golem-walk.png";

    this.ctx.drawImage(
      this.golem,
      this.golem.frameIndex * Math.floor(this.golem.width / this.golem.frames),
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
