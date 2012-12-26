nibbler.ui.ScrollView = Object.create (nibbler.ui.View);

nibbler.ui.ScrollView.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};


nibbler.ui.ScrollView.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    layout: instance.properties.layout,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll
  });
};
