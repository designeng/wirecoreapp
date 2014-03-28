var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var AppRegion, _ref;
  return AppRegion = (function(_super) {
    __extends(AppRegion, _super);

    function AppRegion() {
      _ref = AppRegion.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppRegion.prototype.el = "#application";

    AppRegion.prototype.initialize = function(opts) {
      return console.log("INIT region", opts);
    };

    AppRegion.prototype.start = function() {
      return console.log("STARTED", this.test);
    };

    return AppRegion;

  })(Marionette.Region);
});
