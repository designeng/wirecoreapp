define ["backbone"
        "marionette"
        "comboboxControl"
        "controls/combobox/input/comboboxInputView"
        "inputTextModel"
        "dropDownListModel"
], (Backbone, Marionette, ComboboxControl, ComboboxInputView, InputTextModel, DropDownListModel) ->

    # initialization
    comboboxControlRenderedEl = null
    input = null

    AutocompleteInputModel = Backbone.Model.extend
        validation:
            data:
                required: true
                msg: 'Please enter a valid VALUE'

    comboboxControlModel = new InputTextModel(
                name: "flightFrom"
                className: "inputTextControl content__inputTextControl"
                placeHolder: "flightFrom"
                label: "Input email"
                width: 450
                height: 30
                fontSize: 20
                errorPosition: "inline"
                # isValidValue: true
                # disabled: true
                
                # dropdown list
                dropDownListControlModel: new DropDownListModel(
                    className: "dropDownList"
                    width: 600
                    height: 400
                    listHeight: 400
                    display: true
                    defaultMaxItemsToShow: 10
                    firstVisible: 3

                    # item specifications
                    itemType: "flightPointControl"
                    itemClassName: "flightPointItem"
                    itemHeight: 25
                    itemOverClass: "flightPointItem--over"

                    # function for collection creating
                    # createComboboxListCollection: createComboboxListCollection
                )
                # service url
                url: "/services/rest/v1/dictionaries/autoComplete/flightPoints"
                startInputLength: 2           
            )

    comboboxControl = new ComboboxControl(
                model: comboboxControlModel
                dataModel: new AutocompleteInputModel()
            )

    
    # end initialization   

    describe "comboboxControl", ->

        describe "comboboxControlModel def", ->
            Then ->
                expect(comboboxControlModel).toBeDefined()

        describe "comboboxControl", ->
            Then ->
                expect(comboboxControl).toBeDefined()

            Then ->
                expect(comboboxControl.template).toBeDefined()

        describe "comboboxControl after render", ->

            Then ->
                comboboxControlRenderedEl = comboboxControl.render().$el
                # append control el to fixture
                $(".comboboxControlWrapper").append(comboboxControlRenderedEl)

            Then ->                
                expect(comboboxControlRenderedEl).toContainText("Input email")

            Then ->
                expect(comboboxControlRenderedEl).toHaveClass('comboboxControl')

            Then ->
                expect(comboboxControl.textinputRegion).toBeDefined()

            Then ->
                expect(comboboxControl.input).toBeDefined()

            Then ->
                input = comboboxControl.input
                expect(input).toBeInstanceOf(ComboboxInputView)

            Then ->
                expect(comboboxControl.textinputRegion.show input).toBe("")

            Then ->
                expect(input.$el.find("input")).toHaveValue("flightFrom")


            