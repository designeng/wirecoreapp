var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "core/utils/ioc/getActualTypes"], function(Marionette, getActualTypes) {
  var SecondComponent, _ref;
  return SecondComponent = (function(_super) {
    __extends(SecondComponent, _super);

    function SecondComponent() {
      _ref = SecondComponent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SecondComponent.prototype.initialize = function(opts) {
      return console.log("SecondComponent OPTIONS", opts);
    };

    SecondComponent.prototype.start = function() {
      return console.log("SecondComponent test property injection", this.injectedProp);
    };

    SecondComponent.prototype.getTableModelDCL = function(declaration) {
      var types;
      return types = getActualTypes(JSON.stringify(declaration));
    };

    return SecondComponent;

  })(Marionette.Controller);
});
