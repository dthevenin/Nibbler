nibbler.ui.NavigationBar = Object.create(bender.instance);

nibbler.ui.NavigationBar.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.views.$root,
    style: instance.properties.style
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};