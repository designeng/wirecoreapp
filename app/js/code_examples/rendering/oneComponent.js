var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var OneComponent, _ref;
  return OneComponent = (function(_super) {
    __extends(OneComponent, _super);

    function OneComponent() {
      _ref = OneComponent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OneComponent.prototype.initialize = function(opts) {
      return console.log("OneComponent OPTIONS", opts);
    };

    return OneComponent;

  })(Marionette.Controller);
});
