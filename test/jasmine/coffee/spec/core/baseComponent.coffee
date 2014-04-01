define [
    "backbone"
    "marionette"
    "baseComponent"
], (Backbone, Marionette, BaseComponent) ->

    component = undefined
    composition = undefined

    declaration =
        componentModel: new Backbone.Model(
                componentType: "form"
                action: "stub.json"
                method: "POST"
                ajax: true
                inputErrorHandlerCid: "flightStatsFormErrorHandler"
                rootClass: "flightStats"
                itemClasses: ["switch", "inputText"]
                dataModel: new Backbone.Model()
            )
        componentItems: []

    beforeEachFunc = () ->
        # waitsFor(()->
        runs ->
            layout = new Marionette.Layout
                template: "<div class='controllerRegion'></div>"
                model: new Backbone.Model()

            $wrapper = $(".wrapper")
            $wrapper.append layout.render().$el
            layout.addRegion "flightStatsResultRegion", ".controllerRegion"

            region = layout.regionManager.get "flightStatsResultRegion"

            component = new BaseComponent(
                    declaration: declaration
                    region: region
                    context: _.extend {}, Backbone.Events
                )

            composition = component.getComposition()

    describe "Core::baseComponent", ->

        beforeEach ->
            beforeEachFunc()

        Then ->
            expect(component).toBeDefined()
        Then ->
            expect(composition).toBeDefined()
        Then ->
            expect(composition.model).toBeDefined()
        Then ->
            expect(composition.model instanceof Backbone.Model).toBeTruthy()
        Then ->
            expect(composition.model.get "action").toBe "stub.json"
        Then ->
            expect(composition.model.get "method").toBe "POST"
        Then ->
            expect(composition.isForm).toBeTruthy()
