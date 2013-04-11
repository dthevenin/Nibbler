nibbler.ui.ScrollView = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ScrollView.vs_init.call (this);
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
