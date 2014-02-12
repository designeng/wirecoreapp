define [
], () ->

    class One
        constructor: (opt) ->
            console.log "OPT:", opt

        init: (arg) ->
            console.log "ONE arg", arg

        check: (opt) ->
            console.log "check", opt