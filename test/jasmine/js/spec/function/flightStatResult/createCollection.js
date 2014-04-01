define(["superagent", "modules/flightStatsResult/result/resultModel", "utils/collection/dictionary/createDictionary", "modules/flightStatsResult/utils/createCollection", "core/utils/locale/prepareLocalized", "getLocale"], function(request, ResultModel, createDictionary, createCollection, prepareLocalized, getLocale) {
  var beforeEachFunc, collection, data, dictionaryHolder, flightStatesSearchesServiceUrl, locale, model_0, provider, queryData;
  data = null;
  flightStatesSearchesServiceUrl = "/mock/services/flightStatesSearches";
  collection = null;
  model_0 = void 0;
  provider = void 0;
  dictionaryHolder = null;
  locale = "Ru";
  queryData = {
    "applicationId": "4352345343",
    "segments": [
      {
        "startDate": "2013-12-03",
        "startPoint": {
          "id": 1,
          "type": "CITY"
        },
        "endPoint": {
          "id": 1995,
          "type": "CITY"
        }
      }
    ]
  };
  beforeEachFunc = function() {
    var _this = this;
    request.post(flightStatesSearchesServiceUrl).send(queryData).set("Accept", "application/json").end(function(res) {
      if (res.ok) {
        return data = res.body;
      } else {
        return console.log("ERROR " + res.text);
      }
    });
    waitsFor(function() {
      return data;
    }, "error with data loading", 1000);
    return runs(function() {
      dictionaryHolder = createDictionary(["AIRPORT", "AIRCOMPANY", "AIRPLANE", "CITY", "FLIGHT_STATE"], data);
      collection = createCollection.call(data, dictionaryHolder);
      model_0 = collection.at(0);
      if (!collection.length) {
        console.log("Collection is empty!");
        collection = new Backbone.Collection();
        collection.add(new ResultModel());
      }
      return provider = data.data.flightStates.airTrips.segments[0].legs;
    });
  };
  describe("flightStatsResult createCollection function", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(collection.length).toBe(provider.mergedFlights.length);
    });
    Then(function() {
      return expect(provider.origin.type).toBeDefined();
    });
    Then(function() {
      return expect(dictionaryHolder[provider.origin.type]).toBeDefined();
    });
    Then(function() {
      return expect(dictionaryHolder[provider.origin.type] instanceof Backbone.Collection).toBeTruthy();
    });
    Then(function() {
      expect(dictionaryHolder[provider.origin.type].at(0) instanceof Backbone.Model).toBeTruthy();
      return console.log(provider.origin.type, dictionaryHolder[provider.origin.type].at(0));
    });
    Then(function() {
      return expect(dictionaryHolder[provider.origin.type].at(0).get("id")).toBeNumber();
    });
    return Then(function() {
      return expect(dictionaryHolder[provider.origin.type].at(0).get("name" + locale)).toBeString();
    });
  });
  return describe("flightStatsResult createCollection result collection model fields", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(collection instanceof Backbone.Collection).toBeTruthy();
    });
    Then(function() {
      return expect(model_0).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("code")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("mergedFlightsCode")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("locStatus")).toBeString();
    });
    Then(function() {
      return expect(model_0.has("marketingCompanyLogo")).toBeTruthy();
    });
    Then(function() {
      return expect(model_0.get("marketingCompanyName")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("flightNumber")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("mergedFlightsFlightNumber")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("airportDepartureName")).toBeDefined();
    });
    Then(function() {
      return expect(model_0.get("airportArrivalName")).toBeDefined();
    });
    Then(function() {
      expect(model_0.get("originTerminal")).toBeDefined();
      return expect(model_0.get("originGate")).toBeDefined();
    });
    Then(function() {
      expect(model_0.get("destinationTerminal")).toBeDefined();
      return expect(model_0.get("destinationGate")).toBeDefined();
    });
    Then(function() {
      expect(model_0.get("actualArrivalDate")).toBeDefined();
      return expect(model_0.get("actualArrivalTime")).toBeDefined();
    });
    Then(function() {
      expect(model_0.get("actualDepartureDate")).toBeDefined();
      return expect(model_0.get("actualDepartureTime")).toBeDefined();
    });
    Then(function() {
      expect(model_0.get("plannedArrivalDate")).toBeDefined();
      return expect(model_0.get("plannedArrivalTime")).toBeDefined();
    });
    return Then(function() {
      expect(model_0.get("plannedDepartureDate")).toBeDefined();
      return expect(model_0.get("plannedDepartureTime")).toBeDefined();
    });
  });
});
