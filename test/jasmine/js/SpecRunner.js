require.config({
  baseUrl: "/app/js",
  packages: [
    {
      name: "backbone",
      main: "backbone",
      location: "../../bower_components/backbone"
    }, {
      name: "jquery",
      main: "jquery.min",
      location: "../../bower_components/jquery/dist"
    }, {
      name: "jquery.maskedinput",
      main: "jquery.maskedinput",
      location: "../../bower_components/jquery.maskedinput"
    }, {
      name: "jquery.placeholder",
      main: "jquery.placeholder",
      location: "../../bower_components/jquery.placeholder"
    }, {
      name: "marionette",
      main: "backbone.marionette",
      location: "../../bower_components/backbone.marionette/lib"
    }, {
      name: "localstorage",
      main: "backbone.localStorage",
      location: "../../bower_components/backbone.localStorage"
    }, {
      name: "bacon",
      main: "Bacon",
      location: "../../bower_components/bacon/dist"
    }, {
      name: "eventstreams",
      main: "backbone.eventstreams",
      location: "../../bower_components/backbone.eventstreams/dist"
    }, {
      name: "backbone.babysitter",
      main: "backbone.babysitter",
      location: "../../bower_components/backbone.babysitter/lib/amd"
    }, {
      name: "backbone.wreqr",
      main: "backbone.wreqr",
      location: "../../bower_components/backbone.wreqr/lib/amd"
    }, {
      name: "modelbinder",
      main: "Backbone.ModelBinder",
      location: "../../bower_components/Backbone.ModelBinder"
    }, {
      name: "backbone.validation",
      main: "backbone-validation-amd",
      location: "../../bower_components/backbone.validation/dist"
    }, {
      name: "underscore",
      main: "lodash",
      location: "../../bower_components/lodash/dist"
    }, {
      name: "_.str",
      main: "underscore.string",
      location: "../../bower_components/underscore.string/lib"
    }, {
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
      name: "text",
      main: "text",
      location: "../../bower_components/text"
    }, {
      name: "i18n",
      main: "i18n",
      location: "../../bower_components/requirejs-i18n"
    }, {
      name: "moment",
      main: "moment",
      location: "../../bower_components/momentjs"
    }, {
      name: "hbs",
      main: "backbone.marionette.hbs",
      location: "../../bower_components/backbone.marionette.hbs"
    }, {
      name: "handlebars",
      main: "handlebars",
      location: "../../bower_components/handlebars"
    }, {
      name: "superagent",
      main: "superagent",
      location: "../../bower_components/superagent"
    }
  ],
  paths: {
    "jquery.ScrollTo": "vendors/jquery-scrollto",
    "flat": "vendors/flat",
    "templates": "../templates",
    "handlebarsHelpers": "helpers/handlebarsHelpers",
    "appinstance": "core/app",
    "mediator": "core/mediator",
    "core/appbootstrap": "core/appbootstrap",
    "vent": "core/vent",
    "overridden": "core/overridden",
    "extended": "core/extended",
    "regionModuleRegistrator": "core/modules/page/registrator/regionModuleRegistrator",
    "moduleHash": "core/modules/page/registrator/moduleHash",
    "routeProcessor": "core/modules/root/routeprocessor/index",
    "routemap": "routeMap",
    "rootModule": "core/modules/root/rootModule",
    "rootController": "core/modules/root/rootController",
    "rootRouter": "core/modules/root/rootRouter",
    "pageModule": "core/modules/page/pageModule",
    "pageController": "core/modules/page/pageController",
    "pageLayout": "core/modules/page/pageLayout",
    "baseViewObject": "core/base/object/baseViewObject",
    "baseLayoutObject": "core/base/object/baseLayoutObject",
    "baseControllerObject": "core/base/object/baseControllerObject",
    "baseRouter": "core/base/baseRouter",
    "baseModule": "core/base/baseModule",
    "baseLayout": "core/base/baseLayout",
    "baseComponent": "core/base/component/baseComponent",
    "baseFormController": "core/base/baseFormController",
    "baseControlWrapper": "core/base/baseControlWrapper",
    "baseInput": "core/base/baseInput",
    "baseActiveKey": "core/base/baseActiveKey",
    "baseControl": "core/base/baseControl",
    "resolver": "core/ioc/resolver",
    "controlTypesRx": "core/ioc/utils/controlTypesRx",
    "getActualTypes": "core/ioc/utils/getActualTypes",
    "globalEvents": "core/services/events/globalEvents",
    "controlContainerService": "core/services/controls/controlContainer",
    "renderingService": "core/services/controls/renderingService",
    "getLocale": "core/utils/config/getCurrentLocale",
    "headerLayout": "modules/header/headerLayout",
    "navigationCompositeView": "modules/header/navigation/navigationCompositeView",
    "contentModule": "modules/content/contentModule",
    "contentController": "modules/content/contentController",
    "footerInner": "modules/footerInner/footerInnerController",
    "debugModule": "modules/debug/debugModule",
    "debugConsoleModule": "modules/debugConsole/debugConsoleModule",
    "buttonModel": "controls/button/model/buttonModel",
    "inputTextModel": "controls/inputText/model/inputTextModel",
    "hintModel": "controls/hint/model/hintModel",
    "dropDownListModel": "controls/dropdownlist/model/dropDownListModel",
    "boxModel": "controls/box/model/boxModel",
    "comboboxListCollection": "controls/combobox/collection/comboboxListCollection",
    "linkControl": "controls/link/linkControl",
    "textControl": "controls/text/textControl",
    "boxControl": "controls/box/boxControl",
    "buttonControl": "controls/button/buttonControl",
    "switchControl": "controls/switch/switchControl",
    "inputTextControl": "controls/inputText/inputTextControl",
    "comboboxControl": "controls/combobox/comboboxControl",
    "checkboxControl": "controls/checkbox/checkboxControl",
    "navigationBarControl": "controls/navigationbar/navigationBarControl",
    "hintControl": "controls/hint/hintControl",
    "dropDownListControl": "controls/dropdownlist/dropDownListControl",
    "flightPointControl": "controls/flightpoint/flightPointControl",
    "inputError": "controls/error/inputError",
    "tableControl": "controls/table/tableControl",
    "popupControl": "controls/popup/popupControl",
    "infoControl": "controls/info/infoControl",
    "preloader": "controls/preloader/preloaderControl",
    "navIcon": "controls/navIcon/navIconControl",
    "simpleTplControl": "controls/simpleTpl/simpleTplControl",
    "footerBar": "controls/footerBar/footerBarControl",
    "linkFooterNavControl": "controls/link/linkFooterNavControl",
    "tableHeaderControl": "controls/table/header/tableHeaderControl",
    "tableBodyControl": "controls/table/body/tableBodyControl",
    "flightStatesResultTableRow": "controls/table/row/flightStatesResult/flightStatesResultTableRow",
    "flightSearchHistoryModule": "modules/flightSearchHistory/flightSearchHistoryModule",
    "flightSearchHistoryController": "modules/flightSearchHistory/flightSearchHistoryController",
    "flightSearchHistoryBarControl": "controls/flightSearchHistoryBar/flightSearchHistoryBarControl",
    "linkFavoriteSearchControl": "controls/link/linkFavoriteSearchControl",
    "flightSearchHeader": "modules/flightSearchHeader/flightSearchHeaderController",
    "filterPopupSimplyContent": "modules/filterPopupSimplyContent/filterPopupSimplyContentController",
    "filterPopupListContent": "modules/filterPopupListContent/filterPopupListContentController",
    "filterButtonList": "controls/filter/wrapper/buttonList",
    "filterMediatorBase": "controls/filter/mediator/base",
    "filterButtonSwitcher": "controls/filter/button/switcher",
    "filterButtonPopup": "controls/filter/button/popup",
    "filterContentPopupSimply": "controls/filter/content/popupSimply",
    "filterContentPopupList": "controls/filter/content/popupList",
    "filterContentBase": "controls/filter/content/base",
    "header": "modules/header/headerController",
    "flightStats": "modules/flightStats/flightStatsController",
    "flightStatsResult": "modules/flightStatsResult/flightStatsResultController",
    "flightSearchHistory": "modules/flightSearchHistory/flightSearchHistoryController",
    "flightStatsFilter": "modules/flightStatsFilter/flightStatsFilterController",
    "footer": "modules/footer/footerController",
    "content": "modules/content/contentController",
    "popupDev": "modules/popupDev/popupDevController",
    "popupDevContent": "modules/popupDevContent/popupDevContentController",
    "sortedTableFilter": "modules/sortedTableFilter/sortedTableFilterController",
    "sortedTableFilterContent": "modules/sortedTableFilterContent/sortedTableFilterContentController",
    "sortedTable": "modules/sortedTable/sortedTableController",
    "debug": "modules/debug/debugController",
    "compPl": "plugins/compPl"
  },
  shim: {
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    handlebarsHelpers: ["handlebars"],
    "_.str": {
      deps: ["underscore"]
    },
    handlebars: {
      exports: "Handlebars"
    },
    backbone: {
      deps: ["underscore", "jquery"]
    },
    "eventstreams": {
      deps: ["backbone", "bacon"]
    },
    "modelbinder": {
      deps: ["backbone"]
    },
    "backbone.validation": {
      deps: ["backbone"]
    },
    "backbone.wreqr": {
      deps: ["backbone"]
    },
    "backbone.babysitter": {
      deps: ["backbone"]
    },
    "localstorage": {
      deps: ["backbone", "jquery"]
    },
    "jquery.ScrollTo": {
      deps: ['jquery'],
      exports: "$.fn.ScrollTo"
    },
    "jquery.maskedinput": {
      deps: ['jquery']
    },
    "jquery.placeholder": {
      deps: ['jquery']
    },
    "flat": {
      exports: "flat"
    }
  },
  hbs: {
    templateExtension: ".html"
  },
  locale: "ru"
});

requirejs.s.contexts._.config["paths"]["jquery.simulate"] = "/tests/jasmine/js/lib/jquery.simulate";

requirejs.s.contexts._.config["paths"]["flat"] = "/tests/jasmine/js/lib/flat";

requirejs.s.contexts._.config["paths"]["attributesToString"] = "/tests/jasmine/js/common/develop/attributesToString";

require(["jquery", "underscore", "js/SpecIndex.js", "/tests/jasmine/js/common/beforeEach.js", "/tests/jasmine/js/common/afterEach.js"], function($, _, index) {
  var extention, htmlReporter, jasmineEnv, pathToSpec, specs;
  jasmineEnv = jasmine.getEnv();
  htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  pathToSpec = "/tests/jasmine/js/spec/";
  extention = ".js";
  specs = _.map(index.specs, function(spec) {
    return spec = pathToSpec + spec + extention;
  });
  return $(function() {
    jasmine.getFixtures().fixturesPath = "/tests/jasmine/fixtures";
    return require(specs, function() {
      return jasmineEnv.execute();
    });
  });
});
