define [
    "underscore"
    "backbone"
    "marionette"
    "infoControl"
], (_, Backbone, Marionette, InfoControl) ->

    view = undefined

    beforeEachFunc = () ->
        runs ->
            infoControlModel = new Backbone.Model(
                cases: [
                    {firstField: "loc_FlightPointNotFound"}
                    {secondField: "second_field_value"}
                    {thirdField: "third_field_value"}
                ]
            )
            view = new InfoControl
                model: infoControlModel             

            $(".wrapper").append view.render().$el

    describe "infoControl", ->
        beforeEach ->
            beforeEachFunc()

        Then ->
            expect(view).toBeDefined()
        Then ->
            expect(view.collection.length).toBe 3
        Then ->
            expect(view.collection.getCollectionStream).toBeDefined()            
        Then ->
            expect(view.collection.at(0).get "value").toBe "Ничего не найдено"
        Then ->
            expect(view.collection.at(1).get "value").toBe "second_field_value"
        Then ->
            modelSet = view.chooseModelByKey(view.collection, "firstField")
            expect(modelSet[0] instanceof Backbone.Model).toBeTruthy()
        Then ->
            view.setInfoCases([])
            expect(view.collection.length).toBe 0
            expect(view.$el.html()).toBe ""
        Then ->
            view.setInfoCases(["firstField"])
            expect(view.collection.length).toBe 1
            console.log view.$el.html()



