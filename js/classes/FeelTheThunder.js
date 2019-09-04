class FeelTheThunder {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    // Dimensions
    this.w = w;
    this.w2 = w / 2;
    this.h = h;
    this.h2 = h / 2;

    this.framesCounter = 0;

    this.counter = 0;

    // Game engine
    this.intervalID = undefined;

    // FPS
    this.fps = 70;

    // Array for the enemies
    this.enemies = [
      new Elf(ctx, 75, 100, 300, 200, this.w, this.h, "#0FFFF0", 30, 25),
      new Troll(ctx, 100, 150, 600, 200, this.w, this.h, "#00FF00", 150, 50),
      new Elf(ctx, 75, 100, 900, 200, this.w, this.h, "#0FFFF0", 30, 25),
      new Elf(ctx, 75, 100, 300, 200, this.w, this.h, "#0FFFF0", 30, 25),
      new Troll(ctx, 100, 150, 600, 200, this.w, this.h, "#00FF00", 150, 50),
      new Elf(ctx, 75, 100, 900, 200, this.w, this.h, "#0FFFF0", 30, 25, 1)
    ];

    // Background
    this.background = new Background(ctx, this.w, this.h);

    // Ground
    this.ground = new Ground(ctx, w, h);

    // Main character of the game
    // this.thor = new Thor(ctx, 75, 100, 20, this.ground.groundY - 450 , this.w, this.h)
    this.thor = new Thor(
      ctx,
      55,
      100,
      20,
      500,
      this.w,
      this.h,
      "#FF000000",
      100
    );

    this.currentLevel = "level1";
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, w, h);
  }

  drawThorInfo() {
    this.ctx.beginPath();
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(`Power points: ${this.thor.getPowerPoints}`, 10, 50);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(`Enemies killed: ${this.thor.enemiesKilled}`, 10, 100);
    this.ctx.closePath();
  }

  start() {
    window.addEventListener("mousemove", e => {
      this.thor.mouseX = e.clientX;
      this.thor.mouseY = e.clientY;
    });

    window.addEventListener("keydown", e => {
      if (e.keyCode === this.thor.keys.attack) {
        this.thor.getStates.isAttacking = true;
        this.thorAttack();
      }

      if (e.keyCode === this.thor.keys.radio) {
        this.thorMakesRadio();
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

      this.framesCounter++;
      this.thor.framesCounter++;

      if (this.framesCounter > 1000) this.framesCounter = 0;

      this.background.draw();
      this.ground.draw();
      this.drawEnemies();
      this.drawThorInfo();
      this.thor.draw(this.framesCounter);

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

  thorAttack() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          this.thor.x + this.thor.w >= enemy.x &&
          this.thor.x <= enemy.x + enemy.w &&
          this.thor.y >= enemy.y
        ) {
          enemy.life -= this.thor.attacks.hammer;

          if (enemy.life <= 0) {
            this.thor.increasePowerPoints();
            this.thor.increaseScore();
            this.enemies.splice(idx, 1);
          }
        }
      });
    }
  }

  throwLighning() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          this.thor.mouseX >= enemy.x &&
          this.thor.mouseX <= enemy.x + enemy.w &&
          this.thor.mouseY >= enemy.y
        ) {
          enemy.life -= this.thor.attacks.throwLighning;

          if (enemy.life <= 0) {
            this.enemies.splice(idx, 1);
            this.thor.points++;
            this.thor.increasePowerPoints();
            this.thor.increaseScore();
          }
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

          if (enemy.life <= 0) {
            this.thor.increasePowerPoints();
            this.thor.increaseScore();
            this.enemies.splice(idx, 1);
          }
        }
      });
    }
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
            if (enemy.life <= 0) {
              this.thor.increasePowerPoints();
              this.thor.increaseScore();
              this.enemies.splice(idx, 1);
            }
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
