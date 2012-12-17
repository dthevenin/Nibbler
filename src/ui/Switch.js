nibbler.ui.Switch = Object.create(bender.instance);

nibbler.ui.Switch.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.Switch ({
    node: instance.views.$root,
    textOff: instance.properties.textOff,
    textOn: instance.properties.textOn,
    toggled: instance.properties.toggled
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })
};
