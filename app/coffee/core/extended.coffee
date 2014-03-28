define ["backbone"
        "marionette"
        "baseLayoutObject"
], (Backbone, Marionette, BaseLayoutObject) ->

    _.extend(Marionette.Layout::, BaseLayoutObject)