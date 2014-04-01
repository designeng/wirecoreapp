define [
    "backbone"
    "marionette"
    "modules/flightStats/flightStatsController"
    "modules/flightStats/declaration"
    "switchControl"
    "core/utils/view/getViewMethods"
    "meld"
    "trace"
], (Backbone, Marionette, FlightStatsController, declaration, SwitchControl, getViewMethods, meld, trace) ->

    start = true
    view = undefined

    beforeEachFunc = () ->
        waitsFor ->
            return [start, "error with injected types loading", 1000]

        runs ->
            view = new SwitchControl
                dataModel: new Backbone.Model()
                model: new Backbone.Model
                    name: "switch"
                    className: "switchControl"
                    width: 200
                    height: 30
                    fontSize: 20
                    inputOptions: ["loc_Route", "loc_FlightNumber"]
                    itemClass: "switchItem"
                    itemFocusedClass: "switchItem__focused"
                    itemSelectedClass: "switchItem__selected"
                    context: new FlightStatsController
                        declaration: declaration

            $(".wrapper").append view.render().$el

    describe "switchControl", ->
        beforeEach ->
            beforeEachFunc()
        Then ->
            expect(view).toBeDefined()
        Then ->
            expect(view._itemFocusedClass).toEqual "switchItem__focused"
        Then ->
            expect(view._itemSelectedClass).toEqual "switchItem__selected"
        Then ->
            expect($(".wrapper").find(".item0")).toHaveText "Маршрут"
        Then ->
            expect($(".wrapper").find(".item1")).toHaveText "Номер рейса"
        Then ->
            $('.item0').find("input").focus()
            expect($('.item0').find("input")).toBeFocused()