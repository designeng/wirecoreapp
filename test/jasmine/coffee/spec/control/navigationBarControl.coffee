define ["backbone"
        "marionette"
        "tableControl"
], (Backbone, Marionette, NavigationBarControl) ->
    view = undefined
    controlModel = new Backbone.Model
        context: _.extend {}, Backbone.Events
        items: new Backbone.Collection(
            [ { text: "loc_AviaTickets", url: "!/" }
            { text: "loc_TrainTickets", url: "!/header" }
            { text: "loc_Hotels", url: "!/hotels" }
            { text: "loc_CarRental", url: "!/cars" }
            ])

    describe "navigationBarControl", ->
        beforeEach ->
            view = new NavigationBarControl
                model: controlModel
            $(".wrapper").append view.render().$el

        Then ->
            expect(view).toBeDefined()


