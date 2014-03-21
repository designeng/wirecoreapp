require.config({
  baseUrl: "/wire-app/js",
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
      deps: ["backbone"]
    }
  },
  paths: {
    "domReady": "../../bower_components/wire/domReady",
    "boot": "boot/index",
    "mediator": "boot/mediator",
    "context/main": "withwire/context/main",
    "withwire": "withwire/withwire",
    "oneComponent": "withwire/components/oneComponent"
  }
});

require(["boot"], function(Boot) {
  return console.log("Boot", Boot);
});
