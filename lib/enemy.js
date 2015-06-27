(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Enemy = Asteroids.Enemy = function (options) {
    options.color = Enemy.COLOR;
    options.rad = Enemy.RADIUS;

    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Asteroids.Util.randomVec(Enemy.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Enemy, Asteroids.MovingObject);

  Enemy.SPEED = 1;
  Enemy.COLOR = "#505050";
  Enemy.RADIUS = 2;
  window.Asteroids.EnemySize = Enemy.RADIUS;

})();
