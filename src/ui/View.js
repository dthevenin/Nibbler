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
  for (var key_id in instance.components) {
    if (key_id == '$this' || key_id == '$that') continue;
    var child = instance.components [key_id];
    if (child && child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
