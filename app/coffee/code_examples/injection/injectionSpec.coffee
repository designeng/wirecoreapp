define
    oneComponent:
        create: "code_examples/injection/oneComponent"

    secondComponent:
        create: 
            module: "code_examples/injection/secondComponent"
            args:
                one: 1
                two: 2   
        properties:
            injectedProp: {$ref: 'oneComponent'}
        ready:
            start: {}