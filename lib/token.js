(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  var Token = RunOrDie.Token = function (options) {
    options.color = Token.COLOR;
    options.rad = Token.RADIUS;

    options.pos = options.pos || options.game.randomPosition();
    options.vel = RunOrDie.Util.randomVec(Token.SPEED);

    RunOrDie.MovingObject.call(this, options);
  };

  RunOrDie.Util.inherits(Token, RunOrDie.MovingObject);

  Token.SPEED = 1;
  Token.COLOR = "#f1c40f";
  Token.RADIUS = 10;
})();
