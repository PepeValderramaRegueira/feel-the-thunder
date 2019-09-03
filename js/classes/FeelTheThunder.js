class FeelTheThunder {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    // Dimensions
    this.w = w;
    this.w2 = w / 2;
    this.h = h;
    this.h2 = h / 2;

    this.counter = 0;

    // Game engine
    this.intervalID = undefined;

    // FPS
    this.fps = 60;

    // Array for the enemies
    this.enemies = [
      new Elf(ctx, 75, 100, 300, 200, this.w, this.h, "#0FFFF0", 30),
      new Troll(ctx, 100, 150, 600, 200, this.w, this.h, "#00FF00", 150),
      new Elf(ctx, 75, 100, 900, 200, this.w, this.h, "#0FFFF0", 30)
    ];

    // Background
    this.background = new Background(ctx, this.w, this.h);

    // Ground
    this.ground = new Ground(ctx, w, h);

    // Main character of the game
    // this.thor = new Thor(ctx, 75, 100, 20, this.ground.groundY - 450 , this.w, this.h)
    this.thor = new Thor(ctx, 75, 100, 20, 500, this.w, this.h, "#FF0000", 100);

    this.currentLevel = "level1";
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, w, h);
  }

  thorAttack() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          this.thor.x + this.thor.w >= enemy.x &&
          this.thor.x <= enemy.x + enemy.w &&
          this.thor.y >= enemy.y
        ) {
          enemy.life -= this.thor.attacks.hammer;

          if (enemy.life <= 0) this.enemies.splice(idx, 1);
        }
      });
    }
  }

  throwLighning() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        console.log(enemy.x, this.thor.mouseX);

        if (
          this.thor.mouseX >= enemy.x &&
          this.thor.mouseX <= enemy.x + enemy.w &&
          this.thor.mouseY >= enemy.y
        ) {
          enemy.life -= this.thor.attacks.throwLighning;

          if (enemy.life <= 0) this.enemies.splice(idx, 1);
        }
      });
    }
  }

  feelTheThunderAttack() {
    if (this.enemies.length > 0) {
      this.enemies = [];
    }
  }

  thorMakesRadio() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          // enemy.x > this.thor.x - this.thor.radiusAttack - this.thor.w / 2 &&
          // enemy.x < this.thor.x + this.thor.radiusAttack + this.thor.w / 2
          (enemy.x > this.thor.x - this.thor.radiusAttack - this.thor.w / 2 &&
            enemy.x < this.thor.x + this.thor.w) ||
          (enemy.x < this.thor.x + this.thor.radiusAttack + this.thor.w / 2 &&
            enemy.x > this.thor.x + this.thor.w)
        ) {
          enemy.life -= this.thor.attacks.radio;

          if (enemy.life <= 0) this.enemies.splice(idx, 1);
        }
      });
    }
  }

  start() {
    window.addEventListener("mousemove", e => {
      this.thor.mouseX = e.clientX;
      this.thor.mouseY = e.clientY;
    });

    window.addEventListener("keydown", e => {
      if (e.keyCode === this.thor.keys.attack) {
        this.thor.states.isAttacking = true;
        this.thorAttack();
      }

      if (e.keyCode === this.thor.keys.radio) {
        this.thorMakesRadio();
        console.log(window);
      }

      if (e.keyCode === this.thor.keys.feelTheThunder) {
        this.feelTheThunderAttack();
      }

      if (e.keyCode === this.thor.keys.throwLighning) {
        this.throwLighning();
      }
    });

    this.thor.handleKeyEvents();

    this.intervalID = setInterval(() => {
      this.clearScreen();
      this.background.draw();
      this.ground.draw();
      this.drawEnemies();
      this.thor.draw();

      this.counter++;

      if (this.counter % 2000 === 0) {
        this.enemies.push(
          new Enemy(
            this.ctx,
            75,
            100,
            Math.floor(Math.random() * this.w),
            0,
            this.w,
            this.h,
            "#00FF00",
            30
          )
        );
      }

      if (this.counter >= 2000) this.counter = 0;
    }, 1000 / this.fps);
  }

  drawEnemies() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          this.thor.hammer &&
          this.thor.hammer.x >= enemy.x &&
          this.thor.hammer.x <= enemy.x + enemy.w
        ) {

          // Makes the hammer hits once (1)
          if (!enemy.states.isBeingHitted) {
            enemy.life -= this.thor.attacks.hammer;
            if (enemy.life <= 0) this.enemies.splice(idx, 1);
          }

          // Makes the hammer hits once (2)
          enemy.states.isBeingHitted = true;
        } else {
          // Makes the hammers hits once (3)
          enemy.states.isBeingHitted = false;
        }

        enemy.draw();
      });
    }
  }
}
