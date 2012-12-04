nibbler.ui.Picker = Object.create(bender.instance);

nibbler.ui.Picker.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Picker ({
    node: instance.views.$root,
    data: instance.properties.data
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.selectedKeys =
      instance.__vs_instance.selectedKeys;
    instance.properties.selectedValues =
      instance.__vs_instance.selectedValues;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
