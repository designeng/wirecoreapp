var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "./../strategy/simpleComparison"], function(Backbone, simpleComparison) {
  var TableModel, _ref;
  return TableModel = (function(_super) {
    __extends(TableModel, _super);

    function TableModel() {
      _ref = TableModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableModel.prototype.defaults = {
      className: "tableControl",
      width: 400,
      inject: ["typeOne", "typeTwo"],
      headers: ["loc_MyOrders", void 0, "loc_MyOrders", void 0, "loc_MyOrders"],
      headerHeight: 25,
      itemType: "controls/table/row/tableRowControl",
      headerType: "tableHeaderControl",
      bodyType: "tableBodyControl",
      visibleModelFields: ["data", void 0, "nextfield", void 0, "somefield"],
      sortableFields: ["data", "nextfield", "somefield"],
      collectionStrategy: simpleComparison,
      itemClassName: "tableItem",
      itemHeight: 25
    };

    return TableModel;

  })(Backbone.Model);
});
