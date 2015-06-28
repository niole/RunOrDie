(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  var Enemy = RunOrDie.Enemy = function (options) {
    options.color = Enemy.COLOR;
    options.rad = Enemy.RADIUS;

    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || RunOrDie.Util.randomVec(Enemy.SPEED);

    RunOrDie.MovingObject.call(this, options);
  };

  RunOrDie.Util.inherits(Enemy, RunOrDie.MovingObject);

  Enemy.SPEED = 1;
  Enemy.COLOR = "#505050";
  Enemy.RADIUS = 2;
  window.RunOrDie.EnemySize = Enemy.RADIUS;

})();
