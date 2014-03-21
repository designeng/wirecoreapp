define([], function() {
  var One;
  return One = (function() {
    function One(opt) {
      console.log("OPT:", opt);
    }

    One.prototype.initialize = function(arg) {
      return console.log("ONE arg", arg);
    };

    One.prototype.check = function(opt) {
      return console.log("check", opt);
    };

    return One;

  })();
});
