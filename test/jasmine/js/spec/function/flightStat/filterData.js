define(["modules/flightStats/utils/filterData"], function(filterData) {
  var beforeEachFunc, modelFlightNumber, modelFrom, modelTo, result, segmentQuery;
  modelFrom = void 0;
  modelTo = void 0;
  modelFlightNumber = void 0;
  result = void 0;
  segmentQuery = {};
  beforeEachFunc = function() {
    modelFrom = new Backbone.Model({
      codeIata: "GCV",
      codeSirena: null,
      countryName: "Бразилия",
      id: "6247",
      inputName: "flightFrom",
      name: "Граватаи",
      type: "CITY"
    });
    modelTo = new Backbone.Model({
      codeIata: "GCV",
      codeSirena: null,
      countryName: "Аргентина",
      id: "1234",
      inputName: "flightTo",
      name: "Граватаи",
      type: "CITY"
    });
    return modelFlightNumber = new Backbone.Model({
      inputName: "flightNumber",
      data: "SU137"
    });
  };
  describe("filterData function modelFrom", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      return result = filterData(modelFrom);
    });
    Then(function() {
      return expect(modelFrom.get("inputName")).toBe("flightFrom");
    });
    return Then(function() {
      expect(result.startPoint).toBeDefined();
      expect(result.startPoint.id).toBe(6247);
      return expect(result.startPoint.type).toBe("CITY");
    });
  });
  describe("filterData function modelTo", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      return result = filterData(modelTo);
    });
    Then(function() {
      return expect(modelTo.get("inputName")).toBe("flightTo");
    });
    return Then(function() {
      expect(result.endPoint).toBeDefined();
      expect(result.endPoint.id).toBe(1234);
      return expect(result.endPoint.type).toBe("CITY");
    });
  });
  describe("filterData function modelTo", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      return result = filterData(modelFlightNumber);
    });
    return Then(function() {
      return expect(result.flightNumber).toBe("SU137");
    });
  });
  return describe("filterData segmentQuery complete", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      result = filterData(modelFrom);
      segmentQuery = _.extend(segmentQuery, result);
      result = filterData(modelTo);
      segmentQuery = _.extend(segmentQuery, result);
      result = filterData(modelFlightNumber);
      return segmentQuery = _.extend(segmentQuery, result);
    });
    Then(function() {
      return expect(segmentQuery.startPoint).toBeObject();
    });
    Then(function() {
      return expect(segmentQuery.endPoint).toBeObject();
    });
    Then(function() {
      return expect(segmentQuery.flightNumber).toBeString();
    });
    return Then(function() {
      modelFrom.set("id", "4321");
      result = filterData(modelFrom);
      segmentQuery = _.extend(segmentQuery, result);
      return expect(segmentQuery.startPoint.id).toBe(4321);
    });
  });
});
