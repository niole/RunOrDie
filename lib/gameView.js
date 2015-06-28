(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  window.score = 0;

  var GameView = RunOrDie.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;

    this.passGameView();
  };

  var acceleration = 1.4;
  GameView.MOVES = {
    "w": [ 0, -acceleration],
    "a": [-acceleration,  0],
    "s": [ 0,  acceleration],
    "d": [ acceleration,  0],
  };

  GameView.prototype.passGameView = function () {
    this.game.acceptGameView(this);
  },

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet(); });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        $('#score').html(window.score);
        window.score += 1;
      }, 1000 / RunOrDie.Game.FPS
    );

    this.addEnemy = setInterval(function(interval){
      gameView.game.placeEnemy();
    }, 1000);

    this.addBonusToken = setInterval(function(interval) {
      gameView.game.placeToken();
    }, 5000);

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    clearInterval(this.addEnemy);
    clearInterval(this.addBonusToken);
  };

  GameView.prototype.endGame = function () {
    this.stop();
    window.$('#lost').html("Game Over");
  }

})();
