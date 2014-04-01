define [
    "modules/flightStats/utils/filterData"
], (filterData) ->

    modelFrom = undefined
    modelTo = undefined
    modelFlightNumber = undefined

    result = undefined
    segmentQuery = {}

    beforeEachFunc = ->
        modelFrom = new Backbone.Model
            codeIata: "GCV"
            codeSirena: null
            countryName: "Бразилия"
            id: "6247"
            inputName: "flightFrom"
            name: "Граватаи"
            type: "CITY"

        modelTo = new Backbone.Model
            codeIata: "GCV"
            codeSirena: null
            countryName: "Аргентина"
            id: "1234"
            inputName: "flightTo"
            name: "Граватаи"
            type: "CITY"

        modelFlightNumber = new Backbone.Model
            inputName: "flightNumber"
            data: "SU137"


    describe "filterData function modelFrom", ->
        beforeEach ->
            beforeEachFunc()            
        When ->
            result = filterData(modelFrom)
        Then ->
            expect(modelFrom.get "inputName").toBe "flightFrom"
        Then ->
            expect(result.startPoint).toBeDefined()
            expect(result.startPoint.id).toBe 6247
            expect(result.startPoint.type).toBe "CITY"

    describe "filterData function modelTo", ->
        beforeEach ->
            beforeEachFunc() 
        When ->
            result = filterData(modelTo)
        Then ->
            expect(modelTo.get "inputName").toBe "flightTo"
        Then ->
            expect(result.endPoint).toBeDefined()
            expect(result.endPoint.id).toBe 1234
            expect(result.endPoint.type).toBe "CITY"

    describe "filterData function modelTo", ->
        beforeEach ->
            beforeEachFunc()
        When ->
            result = filterData(modelFlightNumber)
        Then ->
            expect(result.flightNumber).toBe "SU137"

    describe "filterData segmentQuery complete", ->
        beforeEach ->
            beforeEachFunc()
        When ->
            result = filterData(modelFrom)
            segmentQuery = _.extend segmentQuery, result
            result = filterData(modelTo)
            segmentQuery = _.extend segmentQuery, result
            result = filterData(modelFlightNumber)
            segmentQuery = _.extend segmentQuery, result
        Then ->
            expect(segmentQuery.startPoint).toBeObject()
        Then ->
            expect(segmentQuery.endPoint).toBeObject()
        Then ->
            expect(segmentQuery.flightNumber).toBeString()
        Then ->
            modelFrom.set "id", "4321"
            result = filterData(modelFrom)
            segmentQuery = _.extend segmentQuery, result
            expect(segmentQuery.startPoint.id).toBe 4321





