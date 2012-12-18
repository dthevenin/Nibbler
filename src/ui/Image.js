nibbler.ui.Image = Object.create(bender.instance);

nibbler.ui.Image.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.views.$root,
    src: instance.properties.src
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
