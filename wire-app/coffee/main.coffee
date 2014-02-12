require.config

    baseUrl: "/wire-app/js"

    packages: [
        # lib packages
        {
            name: "wire"
            main: "wire"
            location: "lib/wire"
        },
        {
            name: "when"
            main: "when"
            location: "lib/when"
        },
        {
            name: "meld"
            main: "meld"
            location: "lib/meld"
        }

        # build test
        # {
        #     name: "withwire"
        #     main: "withwire"
        #     location: "../../../mocha-tests/js/spec/withwire/withwire"
        # }       
    ]

    paths:
        # lib


        # contexts
        "context/main" : "withwire/context/main"

        # modules
        "withwire": "withwire/withwire"
        "oneComponent": "withwire/components/oneComponent"

require [
    "withwire"
], (App) ->

    console.log "App withwire", App

