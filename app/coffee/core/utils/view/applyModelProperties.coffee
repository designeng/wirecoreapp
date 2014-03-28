define [], ()->
    
    applyModelProperties = () ->

        if !@model
            throw new Error "Model is not defined!"
            
        attrs = _.toArray(arguments).slice(0)

        # check for options
        options = _.last attrs

        if _.isObject(options) and options.prefix
            prefix = options["prefix"]
        else
            prefix = ""

        attrs = _.first attrs


        for attr in attrs
            if @model.has(attr)
                @[prefix + attr] = @model.get attr
