nibbler.ui.Image = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Image.vs_init.call (this);
};

nibbler.ui.Image.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    src: instance.properties.src
  });
};
