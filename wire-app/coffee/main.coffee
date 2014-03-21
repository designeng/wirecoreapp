require.config

    baseUrl: "/wire-app/js"

    packages: [
        # lib packages
        {
            name: "wire"
            main: "wire"
            location: "../../bower_components/wire"
        },
        {
            name: "when"
            main: "when"
            location: "../../bower_components/when"
        },
        {
            name: "meld"
            main: "meld"
            location: "../../bower_components/meld"
        },
        {
            name: "backbone"
            main: "backbone"
            location: "../../bower_components/backbone"
        },
        {
            name: "underscore"
            main: "underscore"
            location: "../../bower_components/underscore"
        },
        {
            name: "marionette"
            main: "backbone.marionette"
            location: "../../bower_components/marionette/lib"
        },        
        {
            name: "jquery"
            main: "jquery"
            location: "../../bower_components/jquery/dist"
        },        
        {
            name: "text"
            main: "text"
            location: "../../bower_components/text"
        },

        # build test
        # {
        #     name: "withwire"
        #     main: "withwire"
        #     location: "../../../mocha-tests/js/spec/withwire/withwire"
        # }       
    ]

    shim:
        "marionette":
            deps: ["backbone"]
            exports: "Marionette"

    paths:
        # plugins
        "domReady": "../../bower_components/domReady/domReady"

        # bootstrap
        "boot": "boot/index"
        # mediator
        "mediator": "boot/mediator"

        # contexts
        "context/main" : "withwire/context/main"

        # modules
        "withwire": "withwire/withwire"
        "oneComponent": "withwire/components/oneComponent"

require [
    "boot"
], (Marionette, Boot) ->

    console.log "Boot", Boot

