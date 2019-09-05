class FeelTheThunder {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    this.PI = Math.PI;
    this.PI2 = this.PI * 2;

    // Dimensions
    this.w = w;
    this.w2 = w / 2;
    this.h = h;
    this.h2 = h / 2;

    this.hammerHitsAudio = new Audio('./audio/metal-hit-1.mov')
    this.flyingHammerAudio = new Audio('./audio/flying-hammer.wav')
    
    this.powerPointsHammer = new Image();
    this.powerPointsHammer.src = "./assets/powers/mjonlir.png";

    this.powerPointsBolt = new Image();
    this.powerPointsBolt.src = "./assets/powers/bolt.png";

    this.powerPointsThunder = new Image();
    this.powerPointsThunder.src = "./assets/powers/thunder.png";

    this.powerPointsHulk = new Image();
    this.powerPointsHulk.src = "./assets/powers/hulk.png";

    this.powerUps = [];
    this.lighnings = [];

    this.characterImg = new Image();
    this.characterImg.src = "./assets/character/thor.png";

    this.framesCounter = 0;

    this.counter = 0;

    // Game engine
    this.intervalID = undefined;

    this.feelTheThunderAttackLighnings = 30;
    this.feelTheThunderAttackSpaceBetweenLighnings =
      this.w / this.feelTheThunderAttackLighnings;

    // FPS
    this.fps = 60;

    // Array for the enemies
    this.enemies = [
      // new Elf(ctx, 75, 200, 300, 200, this.w, this.h, "#0FFFF0", 30, 25),
      // new Troll(ctx, 200, 400, 600, 200, this.w, this.h, "#00FF00", 150, 50),
      // new Elf(ctx, 75, 200, 450, 200, this.w, this.h, "#0FFFF0", 30, 25),
      // new Elf(ctx, 75, 200, 300, 200, this.w, this.h, "#0FFFF0", 30, 25),
      // new Troll(ctx, 200, 400, 900, 200, this.w, this.h, "#00FF00", 150, 50),
      // new Elf(ctx, 75, 200, 450, 200, this.w, this.h, "#0FFFF0", 30, 25, 1)
    ];

    // Background
    this.background = new Background(ctx, this.w, this.h);

    // Ground
    this.ground = new Ground(ctx, w, h);

    // Main character of the game
    // this.thor = new Thor(ctx, 75, 100, 20, this.ground.groundY - 450 , this.w, this.h)
    this.thor = new Thor(
      ctx,
      110, // 55
      200, // 100
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
    this.ctx.arc(this.w - 120, 120, 100, 0, this.PI2);
    this.ctx.fillStyle = "#AA00AAAA";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(
      this.w - 120,
      120,
      100,
      0,
      (this.PI / 180) * ((this.thor.life * 360) / 100)
    );
    this.ctx.strokeStyle = "#FFFF00";
    this.ctx.lineWidth = 8;
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.drawImage(this.characterImg, this.w - 190, 50);

    // this.ctx.beginPath();
    // this.ctx.font = "30px sans-serif";
    // this.ctx.fillStyle = "#FFFF00";
    // this.ctx.fillText(`Power points: ${this.thor.getPowerPoints}`, 10, 50);
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.font = "30px sans-serif";
    // this.ctx.fillStyle = "#FFFF00";
    // this.ctx.fillText(`Enemies killed: ${this.thor.enemiesKilled}`, 10, 100);
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.font = "30px sans-serif";
    // this.ctx.fillStyle = "#FFFF00";
    // this.ctx.fillText(`Life: ${Math.round(this.thor.life)}`, 10, 150);
    // this.ctx.closePath();
  }

  drawPowerPoints() {
    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= 2 ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsHammer, 20, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= 3 ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsBolt, 100, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= 4 ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsThunder, 180, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= 5 ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsHulk, 260, 20);
    this.ctx.restore();
  }

  detectPowerUp() {
    if (this.powerUps) {
      this.powerUps.forEach((powerUp, idx) => {
        if (
          this.thor.x >= powerUp.x &&
          this.thor.x <= powerUp.x + powerUp.w &&
          this.thor.y + this.thor.h >= powerUp.y
        ) {
          this.thor.increaseLife(powerUp.life);
          this.powerUps.splice(idx, 1);
        }
      });
    }
  }

  drawScope() {
    this.ctx.beginPath();
    this.ctx.arc(this.thor.mouseX, this.thor.mouseY, 40, 0, this.PI2);
    this.ctx.strokeStyle = "#FF0000EE";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  generateEnemys() {
    if (this.counter % 75 === 0) {
      switch (Math.floor(Math.random() * 2)) {
        case 0:
        case 1:
        case 2:
          this.enemies.push(
            new Elf(
              this.ctx,
              75,
              200,
              Math.floor(Math.random() * this.w),
              200,
              this.w,
              this.h,
              "#0FFFF0",
              30,
              25
            )
          );
          break;
        case 1:
          this.enemies.push(
            new Troll(
              this.ctx,
              200,
              400,
              Math.floor(Math.random() * this.w),
              200,
              this.w,
              this.h,
              "#00FF00",
              150,
              50
            )
          );
          break;
      }
    }
  }

  drawPowerUps() {
    if (this.powerUps) {
      this.powerUps.forEach(powerUp => {
        powerUp.draw();
      });
    }
  }

  drawGround() {
    this.ground.draw();
  }

  drawBackground() {
    this.background.draw();
  }

  generatePowerUps() {
    if (this.counter >= 5000) {
      this.powerUps.push(
        new PowerUp(
          this.ctx,
          Math.round(Math.random() * this.w),
          this.h - 130,
          100,
          124
        )
      );
      this.counter = 0;
    }
  }

  drawThor() {
    this.thor.draw(this.framesCounter);
  }

  handleKeyEvents() {
    window.addEventListener("mousemove", e => {
      this.thor.mouseX = e.clientX;
      this.thor.mouseY = e.clientY;
    });

    window.addEventListener("keydown", e => {
      if (e.keyCode === this.thor.keys.attack) {
        this.thor.states.isAttacking = true;
        if (!this.thor.states.isJumping) this.thorAttack();
      }

      if (
        e.keyCode === this.thor.keys.throwLighning &&
        this.thor.powerPoints >= 3
      ) {
        this.thor.powerPoints -= 3;
        this.throwLighning();
      }

      if (
        e.keyCode === this.thor.keys.feelTheThunder &&
        this.thor.powerPoints >= 4
      ) {
        this.thor.powerPoints -= 4;
        this.feelTheThunderAttack();
      }

      if (
        e.keyCode === this.thor.keys.releaseTheHulk &&
        this.thor.powerPoints >= 5
      ) {
        this.thor.powerPoints -= 5;
        this.feelTheThunderAttack();
      }
    });
  }

  start() {
    this.handleKeyEvents();
    this.thor.handleKeyEvents();

    this.intervalID = setInterval(() => {
      // clearInterval(this.intervalID)
      this.clearScreen();
      this.framesCounter++;
      this.thor.framesCounter++;

      this.drawBackground();
      this.drawGround();
      this.generateEnemys();
      this.drawEnemies();
      this.drawThorInfo();
      this.drawPowerPoints();
      this.drawPowerUps();
      this.detectPowerUp();
      this.generatePowerUps();
      this.drawLighnings();
      this.drawScope();
      this.drawThor();

      this.counter++;
      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  }

  thorAttack() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (
          this.thor.x + this.thor.w >= enemy.x &&
          this.thor.x <= enemy.x + enemy.w &&
          this.thor.y >= enemy.y &&
          this.thor.y + this.thor.h <= enemy.y + enemy.h
        ) {
          enemy.life -= this.thor.attacks.hammer;

          this.hammerHitsAudio.play()

          if (enemy.life <= 0) {
            this.thor.increasePowerPoints();
            this.thor.increaseScore();
            this.enemies.splice(idx, 1);
          }
        }
      });
    }
  }

  addLightning(x) {
    this.lighnings.push(new Lightning(this.ctx, x, this.h));
  }

  drawLighnings() {
    if (this.lighnings) {
      this.lighnings.forEach(lighning => {
        lighning.draw();
      });
    }
  }

  throwLighning() {
    this.addLightning(this.thor.mouseX);

    setTimeout(() => {
      this.lighnings.splice(this.lighnings.length - 1, 1);
    }, 500);

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
    for (let i = 0; i < this.feelTheThunderAttackLighnings; i++) {
      this.addLightning(this.feelTheThunderAttackSpaceBetweenLighnings * i);
    }

    setTimeout(() => {
      this.lighnings = [];
    }, 500);

    if (this.enemies.length > 0) {
      this.thor.enemiesKilled += this.enemies.length;
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
          this.thor.hammer.x <= enemy.x + enemy.w &&
          this.thor.hammer.y >= enemy.y &&
          this.thor.hammer.y + this.thor.hammer.h <= enemy.y + enemy.h
        ) {
          // Makes the hammer hits once (1)
          if (!enemy.states.isBeingHitted) {
            enemy.life -= this.thor.attacks.hammer;
            this.flyingHammerAudio.play()
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

        if (enemy.states.isLookingRight) {
          if (
            this.thor.x >= enemy.x &&
            this.thor.x <= enemy.x + enemy.w &&
            this.thor.y >= enemy.y
          ) {
            this.thor.life -= 0.2;
          }
        }

        if (enemy.states.isLookingLeft) {
          if (
            this.thor.x >= enemy.x &&
            this.thor.x <= enemy.x + enemy.w &&
            this.thor.y >= enemy.y
          ) {
            this.thor.life -= 0.2;
          }
        }

        if (this.thor.life <= 0) clearInterval(this.intervalID);

        enemy.draw(this.framesCounter);
      });
    }
  }
}
