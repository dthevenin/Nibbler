nibbler.ui.Image = Object.create (nibbler.ui.View);

nibbler.ui.Image.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.Image.vs_init = function () {
  var instance = this;
  
  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    src: instance.properties.src
  });
};
