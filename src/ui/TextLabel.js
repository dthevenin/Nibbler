nibbler.ui.TextLabel = Object.create (nibbler.ui.View);

nibbler.ui.TextLabel.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.TextLabel.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text
  });
};
