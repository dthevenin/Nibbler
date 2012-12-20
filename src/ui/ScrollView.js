nibbler.ui.ScrollView = Object.create (nibbler.ui.View);

nibbler.ui.ScrollView.rendering = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.views.$root,
    layout: instance.properties.layout
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};
