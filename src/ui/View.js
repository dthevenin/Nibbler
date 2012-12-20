nibbler.ui.View = Object.create (bender.instance);

nibbler.ui.View.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.View ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.View.vs_init = function () {
  var instance = this;

  instance.__vs_instance.configure ({
    layout: instance.properties.layout
  });

  // manage children
  var i = this.children.length;
  while (i--) {
    var child = this.children [i];
    if (child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
