define [
    "superagent"
    "modules/flightStatsResult/result/resultModel"
    "utils/collection/dictionary/createDictionary"
    "modules/flightStatsResult/utils/createCollection"
    "core/utils/locale/prepareLocalized"
    "getLocale"
], (request, ResultModel, createDictionary, createCollection, prepareLocalized, getLocale) ->

    data = null
    flightStatesSearchesServiceUrl = "/mock/services/flightStatesSearches"
    collection = null

    # first model in collection
    model_0 = undefined

    provider = undefined
    dictionaryHolder = null
    locale = "Ru"

    queryData = {"applicationId":"4352345343","segments":[{"startDate":"2013-12-03","startPoint":{"id":1,"type":"CITY"},"endPoint":{"id":1995,"type":"CITY"}}]} 

    beforeEachFunc = () ->
        request.post(flightStatesSearchesServiceUrl).send(queryData).set("Accept", "application/json").end (res) =>
            if res.ok
                data = res.body
            else
                console.log  "ERROR " + res.text

        waitsFor(()->
                return data
            , "error with data loading", 1000)
        runs ->
            dictionaryHolder = createDictionary(["AIRPORT", "AIRCOMPANY", "AIRPLANE", "CITY", "FLIGHT_STATE"], data)

            collection = createCollection.call(data, dictionaryHolder)
            model_0 = collection.at(0)

            if !collection.length
                console.log  "Collection is empty!"
                collection = new Backbone.Collection()
                collection.add(new ResultModel())

            provider = data.data.flightStates.airTrips.segments[0].legs

    describe "flightStatsResult createCollection function", -> 
        beforeEach ->
            beforeEachFunc()

        Then ->
            expect(collection.length).toBe provider.mergedFlights.length
        Then ->
            expect(provider.origin.type).toBeDefined()
        Then ->
            expect(dictionaryHolder[provider.origin.type]).toBeDefined()
        Then ->
            expect(dictionaryHolder[provider.origin.type] instanceof Backbone.Collection).toBeTruthy()
        Then ->
            expect(dictionaryHolder[provider.origin.type].at(0) instanceof Backbone.Model).toBeTruthy()
            console.log provider.origin.type, dictionaryHolder[provider.origin.type].at(0)
        Then ->
            expect(dictionaryHolder[provider.origin.type].at(0).get("id")).toBeNumber()
        Then ->
            expect(dictionaryHolder[provider.origin.type].at(0).get("name" + locale)).toBeString()

    describe "flightStatsResult createCollection result collection model fields", -> 
        beforeEach ->
            beforeEachFunc()
        Then ->
            expect(collection instanceof Backbone.Collection).toBeTruthy()
        Then ->
            expect(model_0).toBeDefined()
        Then ->
            expect(model_0.get "code").toBeDefined()
        Then ->
            expect(model_0.get "mergedFlightsCode").toBeDefined()
        Then ->
            expect(model_0.get "locStatus").toBeString()
        Then ->
            expect(model_0.has "marketingCompanyLogo").toBeTruthy()
        Then ->
            expect(model_0.get "marketingCompanyName").toBeDefined()
        Then ->
            expect(model_0.get "flightNumber").toBeDefined()
        Then ->
            expect(model_0.get "mergedFlightsFlightNumber").toBeDefined()
        Then ->
            expect(model_0.get "airportDepartureName").toBeDefined()
        Then ->
            expect(model_0.get "airportArrivalName").toBeDefined()
        Then ->    
            expect(model_0.get "originTerminal").toBeDefined()
            expect(model_0.get "originGate").toBeDefined()
        Then ->
            expect(model_0.get "destinationTerminal").toBeDefined()
            expect(model_0.get "destinationGate").toBeDefined()
        Then ->
            expect(model_0.get "actualArrivalDate").toBeDefined()
            expect(model_0.get "actualArrivalTime").toBeDefined()
        Then ->
            expect(model_0.get "actualDepartureDate").toBeDefined()
            expect(model_0.get "actualDepartureTime").toBeDefined()
        Then ->
            expect(model_0.get "plannedArrivalDate").toBeDefined()
            expect(model_0.get "plannedArrivalTime").toBeDefined()
        Then ->
            expect(model_0.get "plannedDepartureDate").toBeDefined()
            expect(model_0.get "plannedDepartureTime").toBeDefined()



        # Then ->
        #     expect(getActualTypes(_str)).toBeArrayOfStrings()
