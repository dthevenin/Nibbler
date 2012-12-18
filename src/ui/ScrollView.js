nibbler.ui.ScrollView = Object.create(bender.instance);

nibbler.ui.ScrollView.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.views.$root,
    layout: instance.properties.layout
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  // manage children
  var i = this.children.length;
  while (i--) {
    var child = this.children [i];
    if (child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
