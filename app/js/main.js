require.config({
  baseUrl: "/app/js",
  packages: [
    {
      name: "wire",
      main: "wire",
      location: "../../bower_components/wire"
    }, {
      name: "when",
      main: "when",
      location: "../../bower_components/when"
    }, {
      name: "meld",
      main: "meld",
      location: "../../bower_components/meld"
    }, {
      name: "backbone",
      main: "backbone",
      location: "../../bower_components/backbone"
    }, {
      name: "underscore",
      main: "underscore",
      location: "../../bower_components/underscore"
    }, {
      name: "_.str",
      main: "underscore.string",
      location: "../../bower_components/underscore.string/lib"
    }, {
      name: "marionette",
      main: "backbone.marionette",
      location: "../../bower_components/marionette/lib"
    }, {
      name: "jquery",
      main: "jquery",
      location: "../../bower_components/jquery/dist"
    }, {
      name: "text",
      main: "text",
      location: "../../bower_components/text"
    }
  ],
  shim: {
    "marionette": {
      deps: ["backbone"],
      exports: "Marionette"
    }
  },
  paths: {
    "domReady": "../../bower_components/domReady/domReady",
    "baseLayoutObject": "core/base/baseLayoutObject",
    "bootstrapSpec": "core/bootstrapSpec",
    "mediator": "boot/mediator",
    "context/main": "withwire/context/main",
    "withwire": "withwire/withwire",
    "oneComponent": "withwire/components/oneComponent",
    "tableControl": "controls/table/tableControl"
  }
});

require(["backbone", "wire", "bootstrapSpec", "wire!code_examples/rendering/renderingSpec", "core/extended"], function(Backbone, wire, bootstrapSpec, renderingContext) {
  return wire(bootstrapSpec).then(function(mainContext) {
    var app, appRegion;
    console.log(mainContext);
    app = mainContext.bootApp;
    appRegion = mainContext.appRegion;
    return appRegion.show(renderingContext.tableControl);
  });
});
