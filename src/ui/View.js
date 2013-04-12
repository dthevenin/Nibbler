nibbler.ui.View = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.View ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.View.vs_init.call (this);
};

nibbler.ui.View.vs_init = function () {
  var instance = this;

  instance.__vs_instance.configure ({
    layout: instance.properties.layout
  });

  // manage children
  for (var i = 0; i < instance.children.length; i++) {
    var child = instance.children [i];
    if (child && child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
