nibbler.ui.NavigationBar = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.NavigationBar.vs_init.call (this);
};

nibbler.ui.NavigationBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    style: instance.properties.style
  });
};
