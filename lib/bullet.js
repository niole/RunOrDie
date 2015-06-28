(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  var Bullet = RunOrDie.Bullet = function (options) {
    options.rad = Bullet.RADIUS;

    RunOrDie.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 1;
  Bullet.SPEED = 15;

  RunOrDie.Util.inherits(Bullet, RunOrDie.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof RunOrDie.Asteroid) {
      this.remove();
      otherObject.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
})();
