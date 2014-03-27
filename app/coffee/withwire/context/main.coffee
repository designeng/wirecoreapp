define
    arg1: "test1"
    arg2: "test2"

    oneComponent:
        create:
            module: "oneComponent"
            args:
                $ref: "arg1"

        ready:
            init:
                $ref: "arg2"

    $plugins: [
        {module: 'wire/debug', trace: true}
    ]
