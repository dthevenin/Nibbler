nibbler.ui.NavigationBar = Object.create (nibbler.ui.View);

nibbler.ui.NavigationBar.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.NavigationBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    style: instance.properties.style
  });
};
