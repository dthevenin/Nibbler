nibbler.ui.TextInput = Object.create(bender.instance);

nibbler.ui.TextInput.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.InputField ({
    node: instance.views.$root,
    value: instance.properties.value,
    type: instance.properties.type,
    placeholder: instance.properties.placeholder
  }).init ();

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = e.data;
    flexo.notify (instance, '@change', {data: e.data});
  })

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
