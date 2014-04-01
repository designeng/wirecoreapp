define ["underscore"
    "backbone"
    "marionette"
    "buttonControl"
    "buttonModel"
    "meld"
], (_, Backbone, Marionette, ButtonControl, ButtonModel, meld) ->

    view = undefined

    # context init
    context = _.extend {}, {
            isClicked: false
            init: ->
                _.bindAll @, "onProcessData"
                @on "process:data", @onProcessData
            onProcessData: (data) -> 
                @isClicked = true
        }, Backbone.Events

    beforeEachFunc = () ->
        # waitsFor(()->
        #         return start
        #     , "error with injected types loading", 1000)
        runs ->
            buttonModel = new ButtonModel(
                caption: "Найти"
                triggerEvent: "process:data"
                context: context
            )
            view = new ButtonControl
                model: buttonModel 

            view._context.init()               

            $(".wrapper").append view.render().$el

    describe "buttonControl", ->
        beforeEach ->
            beforeEachFunc()

        Then ->
            expect(view).toBeDefined()
        Then ->
            expect(view._context).toBeDefined()
        Then ->
            expect(view._context.isClicked).not.toBeTruthy()
            view.$el.click()
            expect(view._context.isClicked).toBeTruthy()
        Then ->
            view.$el.click()
            expect(view.$el).toBeDisabled()


