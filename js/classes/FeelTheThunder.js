class FeelTheThunder {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    // Dimensions
    this.w = w;
    this.w2 = w / 2;
    this.h = h;
    this.h2 = h / 2;

    // Game engine
    this.intervalID = undefined;

    // FPS
    this.fps = 60;

    // Array for the enemies
    this.enemies = [
      new Enemy(ctx, 75, 100, 300, 200, this.w, this.h, "#00FF00"),
      new Enemy(ctx, 75, 100, 600, 200, this.w, this.h, "#00FF00"),
      new Enemy(ctx, 75, 100, 900, 200, this.w, this.h, "#00FF00"),
    ];

    // Background
    this.background = new Background(ctx, this.w, this.h);

    // Ground
    this.ground = new Ground(ctx, w, h);

    // Main character of the game
    // this.thor = new Thor(ctx, 75, 100, 20, this.ground.groundY - 450 , this.w, this.h)
    this.thor = new Thor(ctx, 75, 100, 20, 500, this.w, this.h, "#FF0000");

    this.currentLevel = "level1";
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, w, h);
  }

  start() {
    this.thor.handleKeyEvents();

    this.intervalID = setInterval(() => {
      this.clearScreen();
      this.background.draw();
      this.ground.draw();
      this.drawEnemies()
      this.thor.draw();
    }, 1000 / this.fps);
  }

  drawEnemies() {
    this.enemies.forEach((enemy, idx) => {
      enemy.draw();
    });
  }
}
