nibbler.ui.TextLabel = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextLabel.vs_init.call (this);
};

nibbler.ui.TextLabel.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text
  });
};
