nibbler.ui.TextInput = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.InputField ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextInput.vs_init.call (this);
};

nibbler.ui.TextInput.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    value: instance.properties.value,
    type: instance.properties.type,
    placeholder: instance.properties.placeholder
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = e.data;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
