(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  var Game = RunOrDie.Game = function (options) {
    this.enemies = [];
    this.bullets = [];
    this.ships = [];
    this.tokens = [];

    this.addEnemies();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ENEMIES = 25;
  Game.ENEMY_SPEED = 2.7;

  Game.prototype.placeEnemy = function () {
    // for (var i = 0; i < 1000; i++) {
      this.add(new RunOrDie.Enemy({game: this}));
    // }
  };

  Game.prototype.placeToken = function () {
    this.add(new RunOrDie.Token({game: this}));
  };

  Game.prototype.addEnemies = function () {
    for (var i = 0; i < Game.NUM_ENEMIES; i++) {
      var pos = this.randomPosition;
      if (RunOrDie.Util.dist < 100) {
        i -= 1;
      } else {
        this.add(new RunOrDie.Enemy({game: this}));
      }
    }
  };

  Game.prototype.addShip = function () {
    var ship = new RunOrDie.Ship({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      game: this
    });

    this.ships.push(ship);
    return ship;
  };

  Game.prototype.directionToShip = function (object) {
    // finds vector to ship and normalizes
    var shipPos = this.ships[0].pos;
    var objectPos = object.pos;

    var magnitude = Math.sqrt(Math.pow(shipPos[0] - objectPos[0], 2) + Math.pow(shipPos[1] - objectPos[1], 2));
    return [(shipPos[0] - objectPos[0]) / magnitude, (shipPos[1] - objectPos[1]) / magnitude];
  };

  Game.prototype.add = function (object) {
    if (object instanceof RunOrDie.Enemy) {
      this.enemies.push(object);
    } else if (object instanceof RunOrDie.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof RunOrDie.Ship) {
      this.ships.push(object);
    } else if (object instanceof RunOrDie.Token) {
      this.tokens.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  // draws board
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.enemies, this.bullets, this.tokens);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.moveObjects = function () {
    var game = this;
    this.allObjects().forEach(function (object) {
      if (object.constructor == RunOrDie.Enemy){
        var vel = game.directionToShip(object);
        object.vel = vel;
      } else if (object.constructor == RunOrDie.Ship) {
        object.vel[0] *= 0.953;
        object.vel[1] *= 0.953;
      }

      object.move();
    });
  };


  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) { return; }
        if (obj1.isCollidedWith(obj2)) {
          if (game.isShipAndEnemy(obj1, obj2)) {
            game.gameView.endGame();
          } else if (game.isShipAndToken(obj1, obj2)) {
            console.log("Token Baby");
          }
        }
      });
    });
  };

  Game.prototype.acceptGameView = function(gameView) {
    this.gameView = gameView;
  };

  Game.prototype.isShipAndToken = function (obj1, obj2) {
    var answer = true;
    if (obj1.constructor != RunOrDie.Ship || obj1.constructor != RunOrDie.Token) {
      answer = false;
    } else if (obj2.constructor != RunOrDie.Ship || obj2.constructor != RunOrDie.Token) {
      answer = false;
    }

    return answer;
  };

  Game.prototype.isShipAndEnemy = function (obj1, obj2) {
    var answer = true;
    if (obj1.constructor != RunOrDie.Ship || obj1.constructor == RunOrDie.Enemy) {
      answer = false;
    } else if (obj1.constructor != RunOrDie.Ship || obj2.constructor != RunOrDie.Enemy) {
      answer = false;
    }

    return answer;
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 30) || (pos[1] < 30) ||
      (pos[0] > Game.DIM_X - 30) || (pos[1] > Game.DIM_Y - 30);
  };


  Game.prototype.scale = function (pos) {
    return [
      scaleX(pos[0]), scaleY(pos[1])
    ];

    function scaleX(num) {
      if (num > Game.DIM_X || num < 0 ) {
        return true;
      }
      return false;
    }

    function scaleY(num) {
      if (num > Game.DIM_Y || num < 0 ) {
        return true;
      }
      return false;
    }
  };

  Game.prototype.unstick = function (pos) {
    if (pos[0] >= Game.DIM_X){
      pos[0] = Game.DIM_X - 1;
    } else if (pos[0] <= 0) {
      pos[0] = 1;
    }

    if (pos[1] >= Game.DIM_Y){
      pos[1] = Game.DIM_Y -1;
    } else if (pos[1] <= 0) {
      pos[1] = 1;
    }
  };

})();
