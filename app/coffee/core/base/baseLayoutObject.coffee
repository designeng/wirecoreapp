define [
    "core/utils/view/applyModelProperties"
], (applyModelProperties) ->

    return BaseViewObject = 

        defaultClassName: (name) ->
            if @model.has "className"
                return @model.get "className"
            else
                return name

        applyModelProperties: (properties, options) ->
            applyModelProperties.call @, properties, options

        applyOptions: (options, opt) ->
            applyOptions.call @, options, opt