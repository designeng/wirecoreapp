define([], function() {
  var One;
  return One = (function() {
    function One(opt) {
      console.log("OPT:", opt);
    }

    One.prototype.init = function(arg) {
      return console.log("ONE arg", arg);
    };

    One.prototype.check = function(opt) {
      return console.log("check", opt);
    };

    return One;

  })();
});
