(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.superPower = false;
    this.pos = options.pos;
    this.vel = options.vel;
    this.rad = options.rad;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.rad, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (otherObject.rad + this.rad);
  };

  MovingObject.prototype.move = function (vel) {
    if (vel){
      this.vel = vel;
    }
    var newPosX = this.pos[0] + this.vel[0];
    var newPosY = this.pos[1] + this.vel[1];

    if (this.game.isOutOfBounds([newPosX, newPosY])) {
      var onBoardArray = this.game.scale(this.pos);
      if (!onBoardArray[0]) { this.pos[0] = newPosX; }
      if (!onBoardArray[1]) { this.pos[1] = newPosY; }
    } else {
      this.pos[0] = newPosX;
      this.pos[1] = newPosY;
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

})();
