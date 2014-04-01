# flightStatsResultController
define ["underscore"
        "backbone"
        "marionette"
        "modules/flightStatsResult/flightStatsResultController"
        "modules/flightStatsResult/declaration"
        "meld"
        "attributesToString"
        "core/ioc/utils/getActualTypes"
        "core/ioc/utils/afterTypesLoaded"
], (_, Backbone, Marionette, FlightStatsResultController, declaration, meld, attributesToString, getActualTypes, afterTypesLoaded) ->

    start = false
    ajaxData = undefined
    dataProvider = undefined
    component = null
    controller = null
    layout = null
    region = null
    $wrapper = null

    beforeEachFunc = () ->
        waitsFor(()->
                return start
            , "error with injected types loading", 1000)
        runs ->
            layout = new Marionette.Layout
                template: "<div class='controllerRegion'></div>"
                model: new Backbone.Model()

            $wrapper = $(".wrapper")
            $wrapper.append layout.render().$el
            layout.addRegion "flightStatsResultRegion", ".controllerRegion"

            region = layout.regionManager.get "flightStatsResultRegion"

            controller = new FlightStatsResultController(
                    declaration: declaration
                    region: region
                    context: _.extend {}, Backbone.Events
                )

    describe "FlightStats Result Controller", ->

        # processing control types before tests start

        # TODO: shoud be optimized as common practise in component/control testing
        # at any case the way we start tests must be simplyfied
        # maybe some declaration processing must be leveraged
        # or when.js callbacks (when.all) used

        types = getActualTypes(attributesToString(declaration.componentItems[0]))

        callback = (res) =>
            $.ajax(
                cache: false
                type: "POST"
                url: "/mock/services/flightStatesSearches"
                data: {}
            ).done((res) =>
                ajaxData = res
                dataProvider = ajaxData.data.flightStates.airTrips.segments[0].legs
                start = true
            )                            

        errback = (err) ->
            console.log "ERROR", err

        afterTypesLoaded(types, callback, errback)

        beforeEach ->
            beforeEachFunc()

        When ->
            controller.exposeComponent(ajaxData)
            component = controller.getComponent()

        Then ->
            expect(controller).toBeDefined()
        Then ->
            expect(controller.declaration).toBeDefined()
        Then ->
            expect(component).toBeDefined()
        Then ->
            mergedFlightsLength = dataProvider.mergedFlights.length
            expect(mergedFlightsLength).toBeDefined()
            expect(controller.tableCollection.length).toBe mergedFlightsLength
        Then ->

            # toHaveText
            # setTimeout(()=>
            #     # expect($wrapper).toHaveText "Вылет123"
            #     console.log $wrapper.html()
            # , 1000)