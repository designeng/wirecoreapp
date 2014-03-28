var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "core/utils/ioc/getActualTypes"], function(Marionette, getActualTypes) {
  var TypesResolverComponent, _ref;
  return TypesResolverComponent = (function(_super) {
    __extends(TypesResolverComponent, _super);

    function TypesResolverComponent() {
      _ref = TypesResolverComponent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TypesResolverComponent.prototype.initialize = function(opts) {
      return console.log("SecondComponent OPTIONS", opts);
    };

    TypesResolverComponent.prototype.start = function() {
      return console.log("SecondComponent test property injection", this.injectedProp);
    };

    TypesResolverComponent.prototype.getTypes = function(declaration) {
      var types;
      return types = getActualTypes(JSON.stringify(declaration));
    };

    TypesResolverComponent.prototype.confirmResult = function(result) {
      return console.log("RESULT:::::", result);
    };

    return TypesResolverComponent;

  })(Marionette.Controller);
});
