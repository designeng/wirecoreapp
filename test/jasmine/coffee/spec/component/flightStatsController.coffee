define [
    "backbone"
    "marionette"
    "when"
    "modules/flightStats/flightStatsController"
    "modules/flightStats/declaration"
    "controlContainerService"
    "core/utils/view/getViewMethods"
    "meld"
    "trace"
], (Backbone, Marionette, When, FlightStatsController, declaration, controlContainerService, getViewMethods, meld, trace) ->

    start = true
    buttonControlResolved = false

    controller = undefined
    component = undefined


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

            controller = new FlightStatsController(
                    declaration: declaration
                    region: region
                    context: _.extend {}, Backbone.Events
                )
            component = controller.component

            controller.show()

            When(component.getControlByTypeName("buttonControl").isResolved()).then((target) =>
                buttonControlResolved = true
            )

    describe "FlightStatsController", ->

        beforeEach ->
            beforeEachFunc()

        Then ->
            expect(controller).toBeDefined()
        Then ->
            expect(component).toBeDefined()
        Then ->
            expect(controller.flightStatesSearchRequest).toBeDefined()
            expect(controller.flightStatesSearchRequest.segments).not.toBeEmptyArray()

        Then ->
            expect(controller.flightStatesSearchRequest.segments[0]).toBeObject()

        Then ->
            model = new Backbone.Model
                data: "SU123"
                inputName: "flightNumber"

            controller.collectData(model)
            expect(controller.flightStatesSearchRequest.segments[0]["flightNumber"]).toBe "SU123"
            
            model = new Backbone.Model
                id: "6247"
                inputName: "flightFrom"

            controller.collectData(model)
            expect(controller.flightStatesSearchRequest.segments[0]["startPoint"].id).toBeNumber()

            model = new Backbone.Model
                id: "1234"
                inputName: "flightTo"

            controller.collectData(model)
            expect(controller.flightStatesSearchRequest.segments[0]["endPoint"].id).toBeNumber()

        Then ->
            # target.simulate('click')
            # @component.getControlByTypeName("tableControl").isResolved()

    describe "FlightStatsController component button control isResolved", ->

        beforeEach ->
            waitsFor(()->
                return buttonControlResolved
            , "error with button control resolving", 1000)
            runs ->

        Then ->
            expect(component.getControlByTypeName("buttonControl").$el).toHaveText "Найти рейсы"
        Then ->
            button = component.getControlByTypeName("buttonControl").$el.find("button")
            button.click()
            expect(component.getControlByTypeName("inputError").$el).toHaveText "Поле обязательно для заполнения"

            


        # describe "flightStatsController after render", ->
        #     Given ->
        #         # 

        #     When ->
        #         # methods = getViewMethods.call @controller, []
                
        #         # for m in methods
        #         #     meld(@controller, m, trace())

        #         @controller.setComponentRegion(@layout.flightStatsRegion)
        #         @controller.show()

        #     Then ->
        #         # must be first 'then' - otherwise BEM classes does not created properly by reason of common When -> ....
        #         expect(@$wrapper.find(".flightStats__error")).toHaveLength 1
        #     Then ->
        #         expect(@$wrapper.find(".flightStats__item").length).toBe @declaration.componentModel.get("itemClasses").length
        #     Then ->
        #         expect(@layout.flightStatsRegion).toBeDefined()
        #     Then ->
        #         expect(@controller.getComponent).toBeDefined()
        #     Then ->
        #         expect(@controller).toBeDefined()
        #     Then ->
        #         expect(@controller.region).toBeDefined()
        #     Then ->
        #         expect(@controller.component).toBeDefined()
        #     Then ->                
        #         expect(@controller.component.region).toBeDefined()
        #     Then ->
        #         expect(@controller.inputErrorHandlerCid).toBe("flightStatsFormErrorHandler")
        #     Then ->
        #         expect(controlContainerService).toBeDefined()
        #     Then ->
        #         errorHandler = @controller.getErrorHandlerControl()
        #         # will be true after inputError with correspondent cid will be found between loaded in component controls - so defered call needed
        #         _.defer(expect(errorHandler).toBeDefined)
        #     Then ->
        #         @item1 = @controller.getItemByIndex(1)
        #         setTimeout(()=>
        #             # nothing
        #             do ->
        #             # console.log @item1.$el.html()
        #             # expect(@item1.$el).toBeHidden()
        #         , 1000)
        
        #     Then ->
        #         expect(@key).toBeDefined()

                    
                


                
            
                