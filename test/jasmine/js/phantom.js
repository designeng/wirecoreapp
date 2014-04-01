var page, url;

console.log("Loading a web page 1");

page = new WebPage();

url = "http://127.0.0.1:8877/tests/jasmine/teamcity_reporter.html";

phantom.viewportSize = {
  width: 800,
  height: 600
};

page.onConsoleMessage = function(msg) {
  return console.log(msg);
};

page.open(url, function(status) {
  if (status !== "success") {
    return console.log("Unable to load the address!");
  } else {
    return window.setTimeout((function() {
      page.render("output.png");
      return phantom.exit();
    }), 200);
  }
});
