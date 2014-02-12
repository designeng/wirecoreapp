require.config({
  baseUrl: "/wire-app/js",
  packages: [
    {
      name: "wire",
      main: "wire",
      location: "lib/wire"
    }, {
      name: "when",
      main: "when",
      location: "lib/when"
    }, {
      name: "meld",
      main: "meld",
      location: "lib/meld"
    }
  ],
  paths: {
    "context/main": "withwire/context/main",
    "withwire": "withwire/withwire",
    "oneComponent": "withwire/components/oneComponent"
  }
});

require(["withwire"], function(App) {
  return console.log("App withwire", App);
});
