(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (options) {
    this.enemies = [];
    this.bullets = [];
    this.ships = [];

    this.addEnemies();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ENEMIES = 25;
  Game.ENEMY_SPEED = 2.7;


  Game.prototype.addEnemies = function () {
    for (var i = 0; i < Game.NUM_ENEMIES; i++) {
      this.add(new Asteroids.Enemy({game: this}));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
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
    if (object instanceof Asteroids.Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
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

  // returns array of all objects
  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.enemies, this.bullets);
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    var game = this;
    this.allObjects().forEach(function (object) {
      if (object !== game.ships[0]){
        var vel = game.directionToShip(object);
        object.vel = vel;
      } else {
        object.vel[0] *= 0.953;
        object.vel[1] *= 0.953;
      }

      object.move();
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) { return; }

        if (obj1.isCollidedWith(obj2)) {

        }
      });
    });
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

})();
