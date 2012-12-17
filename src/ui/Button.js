nibbler.ui.Button = Object.create(bender.instance);

nibbler.ui.Button.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.views.$root,
    text: instance.properties.text,
    type: instance.properties.type,
    style: instance.properties.style
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select');
  })
};
