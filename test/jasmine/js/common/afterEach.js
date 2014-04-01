define(function() {
  var combinedRegex, localMachineSign, stackElementSelector, stackError;
  localMachineSign = "http://localhost";
  stackError = null;
  stackElementSelector = ".stackTrace";
  combinedRegex = /(?:https?|ftp):\/\/.*?\..*?(?=\W?\s)/g;
  return afterEach(function() {
    var container, href, portСolonPos, prevLastIndex, res, resSlashInverted, result, slashPos, stackTraceHtml;
    if (window.location.href.indexOf(localMachineSign) !== -1) {
      if (!stackError) {
        stackTraceHtml = $(stackElementSelector).html();
        if (stackTraceHtml) {
          stackError = true;
          container = $(stackElementSelector);
          container.html("");
          result = void 0;
          prevLastIndex = 0;
          combinedRegex.lastIndex = 0;
          while ((result = combinedRegex.exec(stackTraceHtml))) {
            res = result[0];
            if (res.indexOf(localMachineSign) !== -1) {
              portСolonPos = res.search(/:\d+/);
              slashPos = res.slice(portСolonPos).indexOf("/");
              resSlashInverted = res.slice(portСolonPos + slashPos).replace(/\//g, "\\");
              href = "http://localhost:8877/#!/specReport/" + resSlashInverted;
              container.append($("<span/>").text(stackTraceHtml.slice(prevLastIndex, result.index)));
              container.append($("<a/>").attr("href", href).text(res));
              prevLastIndex = combinedRegex.lastIndex;
            } else {
              break;
              return;
            }
          }
          return container.append($("<span/>").text(stackTraceHtml.slice(prevLastIndex)));
        }
      }
    }
  });
});
