nibbler.ui.TextLabel = Object.create(bender.instance);

nibbler.ui.TextLabel.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.views.$root,
    text: instance.properties.text
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
