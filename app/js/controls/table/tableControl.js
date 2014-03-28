var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "marionette", "controls/table/controller/tableController"], function(Backbone, Marionette, TableController) {
  var TableBodyRegionType, TableControl, TableHeaderRegionType, TableOptions, _ref, _ref1, _ref2;
  TableOptions = (function() {
    function TableOptions() {}

    TableOptions.prototype.itemHeight = 10;

    TableOptions.prototype.itemType = "tableRowControl";

    TableOptions.prototype.headerType = "tableHeaderControl";

    TableOptions.prototype.bodyType = "tableBodyControl";

    TableOptions.prototype.visibleModelFields = "";

    TableOptions.prototype.sortableFields = "";

    return TableOptions;

  })();
  TableHeaderRegionType = (function(_super) {
    __extends(TableHeaderRegionType, _super);

    function TableHeaderRegionType() {
      _ref = TableHeaderRegionType.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableHeaderRegionType.prototype.el = ".tableHeader";

    TableHeaderRegionType.prototype.open = function(view) {
      return this.$el.replaceWith(view.el);
    };

    return TableHeaderRegionType;

  })(Marionette.Region);
  TableBodyRegionType = (function(_super) {
    __extends(TableBodyRegionType, _super);

    function TableBodyRegionType() {
      _ref1 = TableBodyRegionType.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TableBodyRegionType.prototype.el = ".tableBody";

    TableBodyRegionType.prototype.open = function(view) {
      return this.$el.replaceWith(view.el);
    };

    return TableBodyRegionType;

  })(Marionette.Region);
  return TableControl = (function(_super) {
    __extends(TableControl, _super);

    function TableControl() {
      _ref2 = TableControl.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    TableControl.prototype.template = "<thead class='tableHeader'></thead><tbody class='tableBody'></tbody>";

    TableControl.prototype.tagName = "table";

    TableControl.prototype.regions = {
      tableHeaderRegion: TableHeaderRegionType,
      tableBodyRegion: TableBodyRegionType
    };

    TableControl.prototype.eventBus = _.extend({}, Backbone.Events);

    TableControl.prototype.initialize = function(options) {
      console.log("options:::::::::::::::::::", options);
      this.applyModelProperties(["itemHeight", "itemType", "headerType", "bodyType", "visibleModelFields", "sortableFields", "collection", "collectionStrategy", "headers", "headerClassPrefix", "headerHeight"], {
        prefix: "_"
      });
      this.applyDefaults();
      this.resolveClasses();
      _.bindAll(this, "addItemToCollection", "exposeCollection");
      this.context.on("sortedtable:additem", this.addItemToCollection);
      return this.initTableController(this._collection);
    };

    TableControl.prototype.initTableController = function(collection) {
      return this.tableController = new TableController({
        collection: collection,
        collectionStrategy: this._collectionStrategy
      });
    };

    TableControl.prototype.applyDefaults = function() {
      if (!this._headerClassPrefix) {
        return this._headerClassPrefix = "header_";
      }
    };

    TableControl.prototype.initTemplateVariables = function() {
      return this._thead = this.$el.find('thead:first');
    };

    TableControl.prototype.getCollection = function() {
      return this.tableController.getCollection();
    };

    TableControl.prototype.resolveClasses = function() {
      if (this._itemType) {
        this.itemViewClass = require(this._itemType);
      }
      if (this._headerType) {
        this.headerViewClass = require(this._headerType);
      }
      if (this._bodyType) {
        return this.bodyViewClass = require(this._bodyType);
      }
    };

    TableControl.prototype.onBeforeRender = function() {
      return this.createSubViews();
    };

    TableControl.prototype.createSubViews = function() {
      if (this._headerType) {
        return this.headerView = new this.headerViewClass({
          eventBus: this,
          columns: this._visibleModelFields,
          tableController: this.tableController,
          headerHeight: this._headerHeight,
          sortableFields: this._sortableFields,
          headers: this._headers,
          headerClassPrefix: this._headerClassPrefix
        });
      }
    };

    TableControl.prototype.onExposeCollection = function() {
      if (this._bodyType) {
        this.bodyView = new this.bodyViewClass({
          eventBus: this,
          itemView: this.itemViewClass,
          collection: this.tableController.getCollection(),
          columns: this._visibleModelFields,
          itemHeight: this._itemHeight
        });
      }
      if (this._headerType) {
        this.tableHeaderRegion.show(this.headerView);
      }
      if (this._bodyType) {
        this.tableBodyRegion.show(this.bodyView);
      }
      return this.initTemplateVariables();
    };

    TableControl.prototype._setProperties = function(obj, attrs, mapping) {
      var attr, _i, _len;
      for (_i = 0, _len = attrs.length; _i < _len; _i++) {
        attr = attrs[_i];
        if (mapping && mapping[attr]) {
          attr = mapping[attr];
        }
        obj.set(attr, this[this._attrPrefix + attr]);
      }
      return obj;
    };

    TableControl.prototype.addItemToCollection = function(item) {
      return this.tableController.addItemToCollection(item);
    };

    TableControl.prototype.exposeCollection = function(collection) {
      this.tableController.setCollection(collection);
      return this.triggerMethod("expose:collection");
    };

    TableControl.prototype.publicApi = function() {
      return {
        "addItemToCollection": this.addItemToCollection,
        "exposeCollection": this.exposeCollection,
        "getCollection": this.getCollection
      };
    };

    return TableControl;

  })(Marionette.Layout);
});
