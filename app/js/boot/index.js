define(["wire!mediator"], function(context) {
  return context.wire({
    formView: {
      render: {
        template: {
          module: 'text!controls/form/resource/formView.html'
        }
      },
      insert: {
        first: 'root'
      }
    },
    buttonControl: {
      create: "controls/button/buttonControl",
      ready: {
        initialize: {
          args: {
            one: 1,
            two: 2
          }
        },
        testButton: {
          $ref: "message"
        }
      }
    }
  }).then(function(childContext) {
    return console.log("childContext", childContext);
  });
});
