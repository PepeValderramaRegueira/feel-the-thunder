class Enemy extends GameCharacter {
  constructor(ctx, w, h, x, y, bgW, bgH, color, life, damage) {
    super(ctx, w, h, x, y, bgW, bgH, color, life);

    this.damage = damage
    this.isDead = false
  }
}
