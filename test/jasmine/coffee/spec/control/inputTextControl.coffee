# inputTextControl.coffee
define ["backbone"
        "marionette"
        "inputTextControl"
        "inputTextModel"
        "core/utils/view/getViewMethods"
        "meld"
        "trace"
], (Backbone, Marionette, InputTextControl, InputTextModel, getViewMethods, meld, trace) ->

    view = undefined
    input = null

    FlightNumberModel = Backbone.Model.extend
        validation:
            data:
                required: true
                pattern: 'flightNumber'
                msg: 'Please enter a valid flight number'


    inputTextModel = new InputTextModel
        name: "flightNumber"
        className: "inputTextControl content__inputTextControl"
        placeHolder: "flightNumber"
        value: "startValue123"
        width: 450
        height: 30
        fontSize: 20
        # mask: "99/99/9999"
        errorPosition: "inline"
        # dataModel: new FlightNumberModel()

    describe "inputTextControl", ->
        beforeEach ->
            view = new InputTextControl(
                    model: inputTextModel
                    dataModel: new FlightNumberModel()
                    context: _.extend {}, Backbone.Events
                )
            $(".wrapper").append view.render().$el
            input = view.$el.find("input")

        describe "inputTextControl def", ->
            Then ->
                expect(view).toBeDefined()
            Then ->
                expect(view.getDataModel()).toBeDefined()
            Then ->
                expect(view.ensureDataModel()).toBeDefined()
            Then ->
                expect(view._context).toBeDefined()
            Then ->
                expect(view.ensureName()).toBe "flightNumber"
            Then ->
                view.setWidth(345)
                expect(input.css "width").toBe "345px"
            Then ->
                view.setHeight(50)
                expect(input.css "height").toBe "50px"
            Then ->
                view.setValue "testValue"
                expect(view.getValue()).toBe "testValue"
            Then ->
                view.setValue ""
                expect(view.isEmpty()).toBeTruthy()
            Then ->
                expect(input).not.toBeFocused()
            Then ->
                view.setFocus()
                expect(input).toBeFocused()
            Then ->
                view.setDataModelValue("123")
                expect(view.dataModel.get "data").toBe "123"
            Then ->
                view.setState "active"
                expect(input).not.toHaveClass "inputPlaceHolder"
            Then ->
                view.setState "active"
                view.setState "passive"
                expect(input).toHaveClass "inputPlaceHolder"
            Then ->
                view.setState "valid"
                expect(input).not.toHaveClass view.getStates()["invalid"]["className"]
            Then ->
                errors = []; view.setState "invalid", errors
                expect(input).toHaveClass view._states["invalid"]["className"]



        # describe "inputTextControl after render", ->
        #     it "must have value", ->
        #         inputTextControlRenderedEl = inputTextControl.render().$el

        #         # methods = getViewMethods.call inputTextControl, ["beforeBaseInputRender", "afterBaseInputRender"]

        #         # console.log methods
        #         # for m in methods
        #         #     meld(inputTextControl, m, trace())

        #         expect(inputTextControl.getValue()).toBe("startValue123")