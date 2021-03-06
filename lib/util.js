(function () {
  if (typeof RunOrDie === "undefined") {
    window.RunOrDie = {};
  }

  var Util = RunOrDie.Util = {};

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var randomVec = Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var inherits = Util.inherits = function (child, baseClass) {
    function Surrogate () { this.constructor = child; }
    Surrogate.prototype = baseClass.prototype;
    child.prototype = new Surrogate();
  };
})();
