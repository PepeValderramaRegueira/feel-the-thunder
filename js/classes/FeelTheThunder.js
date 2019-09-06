class FeelTheThunder {
  constructor(ctx, w, h) {
    this.ctx = ctx;

    this.PI = Math.PI;
    this.PI2 = this.PI * 2;

    this.generateEnemysFrequency = 300

    this.gameStarted = false;

    // Dimensions
    this.w = w;
    this.w2 = w / 2;
    this.h = h;
    this.h2 = h / 2;

    // this.hammerHitsAudio = new Audio('./audio/metal-hit-1.mov')
    // this.flyingHammerAudio = new Audio('./audio/flying-hammer.wav')

    this.powerPointsHammer = new Image();
    this.powerPointsHammer.src = "./assets/powers/mjonlir.png";

    this.soundtrack = new Audio();
    this.soundtrack.src = "./audio/inmigrant-song-8-bits.mp3";

    this.powerPointsBolt = new Image();
    this.powerPointsBolt.src = "./assets/powers/bolt.png";

    this.powerPointsThunder = new Image();
    this.powerPointsThunder.src = "./assets/powers/thunder.png";

    this.powerPointsHulk = new Image();
    this.powerPointsHulk.src = "./assets/powers/hulk.png";

    this.deadEnemiesImage = new Image()
    this.deadEnemiesImage.src = './assets/skull.png'

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
    this.enemies = [];

    // Background
    this.background = new Background(ctx, this.w, this.h);

    // Ground
    this.ground = new Ground(ctx, w, h);

    // Main character of the game
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

  startScreen() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this.start();
      }
    });
  }

  checkDifficulty() {
    if (this.thor.enemiesKilled <= 5) this.generateEnemysFrequency = 225

    if (this.thor.enemiesKilled <= 15) this.generateEnemysFrequency = 175

    if (this.thor.enemiesKilled <= 20) this.generateEnemysFrequency = 125

    if (this.thor.enemiesKilled >= 30) this.generateEnemysFrequency = 60

    if (this.thor.enemiesKilled >= 100) this.generateEnemysFrequency = 50s
  }

  checkBonusRestoreThorLife() {
    if (this.thor.enemiesKilled % 40 === 0) this.thor.life = 100
  }

  start() {
    document.querySelector('.intro').classList.add('intro--out')
    this.soundtrack.play();
    this.soundtrack.loop = true;
    this.handleKeyEvents();
    this.thor.handleKeyEvents();
    this.thor.states.isDead = false;

    this.intervalID = setInterval(() => {
      // clearInterval(this.intervalID)
      this.clearScreen();

      if (this.thor.states.isDead) {
        clearInterval(this.intervalID);
        this.restartScreen();
      }

      this.framesCounter++;
      this.thor.framesCounter++;

      this.checkDifficulty()
      this.checkBonusRestoreThorLife()

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
      this.drawDeadEnemies()

      if (this.counter % 50 === 0) this.checkEnemiesLife()

      this.counter++;
      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  }

  restartScreen() {
    this.clearScreen();
    alert("Press the button to restart the game");
    window.location.reload();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  drawThorInfo() {
    this.ctx.beginPath();
    this.ctx.arc(this.w - 120, 120, 100, 0, this.PI2);
    this.ctx.fillStyle = "#FF00FF88";
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
  }

  drawPowerPoints() {
    console.log(this.thor.powerPoints)
    

    // ---------------------------------------------

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= this.thor.powerPointsThrowLightning ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsBolt, 20, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(20, 100, 60, 60);
    this.ctx.fillStyle = "#003333DD";
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.font = "300 30px sans-serif";
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fillText("1", 40, 140);
    this.ctx.closePath();

    // ---------------------------------------------

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= this.thor.powerPointsThrowHammer ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsHammer, 100, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(100, 100, 60, 60);
    this.ctx.fillStyle = "#003333DD";
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.font = "300 30px sans-serif";
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fillText("2", 120, 140);
    this.ctx.closePath();

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= this.thor.powerPointsFeelTheThunder ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsThunder, 180, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(180, 100, 60, 60);
    this.ctx.fillStyle = "#003333DD";
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.font = "300 30px sans-serif";
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fillText("3", 200, 140);
    this.ctx.closePath();

    // ---------------------------------------------

    this.ctx.save();
    this.ctx.globalAlpha = this.thor.powerPoints >= 5 ? 1 : 0.5;
    this.ctx.drawImage(this.powerPointsHulk, 260, 20);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(260, 100, 60, 60);
    this.ctx.fillStyle = "#003333DD";
    this.ctx.strokeStyle = "#00FFFF";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.beginPath();
    this.ctx.font = "300 30px sans-serif";
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fillText("4", 280, 140);
    this.ctx.closePath();
  }

  drawDeadEnemies() {
    this.ctx.drawImage(this.deadEnemiesImage, this.w - 80, 280);
    this.ctx.beginPath()
    this.ctx.font = "600 30px sans-serif"
    this.ctx.fillStyle = "#000000"
    this.ctx.fillText(this.thor.enemiesKilled, this.w - 120, 320)
    this.ctx.closePath()
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
    if (this.counter % this.generateEnemysFrequency === 0) {
      let enemyXSpanPosition = Math.round(Math.random() * 2)

      switch (enemyXSpanPosition) {
        case 0: enemyXSpanPosition = 5; break;
        case 1: enemyXSpanPosition = this.w - 5; break
      }

      this.enemies.push(
        new Elf(
          this.ctx,
          75,
          200,
          enemyXSpanPosition,
          this.h - 200,
          this.w,
          this.h,
          "#0FFFF0",
          100,
          25
        )
      );

    //   switch (Math.floor(Math.random() * 2)) {
    //     case 0:
    //     case 1:
    //     case 2:
    //       this.enemies.push(
    //         new Elf(
    //           this.ctx,
    //           75,
    //           200,
    //           Math.floor(Math.random() * this.w),
    //           200,
    //           this.w,
    //           this.h,
    //           "#0FFFF0",
    //           100,
    //           25
    //         )
    //       );
    //       break;
    //     case 1:
    //       this.enemies.push(
    //         new Troll(
    //           this.ctx,
    //           200,
    //           400,
    //           Math.floor(Math.random() * this.w),
    //           200,
    //           this.w,
    //           this.h,
    //           "#00FF00",
    //           150,
    //           50
    //         )
    //       );
    //       break;
    //   }
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
    if (this.counter >= 3000) {
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
        this.thor.powerPoints >= this.thor.powerPointsThrowLightning
      ) {
        this.thor.powerPoints -= this.thor.powerPointsThrowLightning;
        this.throwLighning();
      }

      if (
        e.keyCode === this.thor.keys.feelTheThunder &&
        this.thor.powerPoints >= this.thor.powerPointsFeelTheThunder
      ) {
        this.thor.powerPoints -= this.thor.powerPointsFeelTheThunder;
        this.feelTheThunderAttack();
      }

      if (
        e.keyCode === this.thor.keys.releaseTheHulk &&
        this.thor.powerPoints >= 5
      ) {
        this.thor.powerPoints -= 5;
        // this.feelTheThunderAttack();
      }
    });
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

          // this.hammerHitsAudio.play()

          if (enemy.life <= 0 && !enemy.isDead) {
            this.thor.increasePowerPoints();
            this.thor.increaseScore();
            enemy.isDead = true
            // this.enemies.splice(idx, 1);
          }
        }
      });
    }
  }

  checkEnemiesLife() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        if (enemy.isDead) {
          this.enemies.splice(idx, 1)
        }
      })
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

          if (enemy.life <= 0 && !enemy.isDead) {
            // this.enemies.splice(idx, 1);
            enemy.isDead = true
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
      this.enemies.forEach(enemy => enemy.isDead = true)
    }
  }

  drawEnemies() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, idx) => {
        let enemyDied = false;

        if (
          this.thor.hammer &&
          this.thor.hammer.x >= enemy.x &&
          this.thor.hammer.x <= enemy.x + enemy.w &&
          this.thor.hammer.y >= enemy.y &&
          this.thor.hammer.y + this.thor.hammer.h <= enemy.y + enemy.h
        ) {
          // Makes the hammer hits once (1)
          if (!enemy.states.isBeingHitted) {
            enemy.life -= this.thor.attacks.throwHammer;
            // this.flyingHammerAudio.play()
            if (enemy.life <= 0) {
              this.thor.increasePowerPoints();
              this.thor.increaseScore();
              // this.enemies.splice(idx, 1);
              enemy.isDead = true
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
            this.thor.life -= 0.1;
          }
        }

        if (enemy.states.isLookingLeft) {
          if (
            this.thor.x >= enemy.x &&
            this.thor.x <= enemy.x + enemy.w &&
            this.thor.y >= enemy.y
          ) {
            this.thor.life -= 0.1;
          }
        }

        if (this.thor.life <= 0) {
          this.thor.states.isDead = true;
          // clearInterval(this.intervalID);
          return;
        }

        if (!enemyDied) enemy.draw(this.framesCounter);
        else
          setTimeout(() => {
            enemy.draw(this.framesCounter);
          }, 1000);
      });
    }
  }
}
