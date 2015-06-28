(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = RunOrDie.Ship = function (options) {
    options.rad = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();

    RunOrDie.MovingObject.call(this, options);
  };

  Ship.RADIUS = 5;

  RunOrDie.Util.inherits(Ship, RunOrDie.MovingObject);

  // Ship.prototype.fireBullet = function () {
  //   var norm = RunOrDie.Util.norm(this.vel);
  //
  //   if (norm == 0) {
  //     // Can't fire unless moving.
  //     return;
  //   }
  //
  //   var relVel = RunOrDie.Util.scale(
  //     RunOrDie.Util.dir(this.vel),
  //     RunOrDie.Bullet.SPEED
  //   );
  //
  //   var bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];
  //
  //   var bullet = new RunOrDie.Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });
  //
  //   this.game.add(bullet);
  // };
  //
  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})();
