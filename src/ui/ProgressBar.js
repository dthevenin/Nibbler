nibbler.ui.ProgresseBar = Object.create (nibbler.ui.View);

nibbler.ui.ProgresseBar.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ProgressBar ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.ProgresseBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    indeterminate: instance.properties.indeterminate,
    index: instance.properties.index,
    range: instance.properties.range
  });
};
