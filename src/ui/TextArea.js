nibbler.ui.TextArea = Object.create(bender.instance);

nibbler.ui.TextArea.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.TextArea ({
    node: instance.views.$root,
    value: instance.properties.value
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@continuous_change', {data: e.data});
  })
};
