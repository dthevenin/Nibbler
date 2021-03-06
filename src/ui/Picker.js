nibbler.ui.Picker = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Picker ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Picker.vs_init.call (this);
};

nibbler.ui.Picker.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    data: instance.properties.data
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.selectedKeys =
      instance.__vs_instance.selectedKeys;
    instance.properties.selectedValues =
      instance.__vs_instance.selectedValues;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
