define ["attributesToString"
        "core/ioc/utils/getActualTypes"
], (attributesToString, getActualTypes) ->

    _str = null

    model = 
        className: "linkClassName"
        innerComponent:
            innerComponentType: "someInnerControl"
            model: new Backbone.Model
                itemType: "linkControl"
        buffer: []

    describe "ioc getActualTypes function", -> 
        When ->
            _str = attributesToString(model)

        Then ->
            expect(getActualTypes(_str)).toBeArrayOfSize 2
        Then ->
            expect(getActualTypes(_str)).toBeArrayOfStrings()
        Then ->
            expect(getActualTypes(_str)[0]).toBe "someInnerControl"

            