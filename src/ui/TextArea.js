nibbler.ui.TextArea = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextArea ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextArea.vs_init.call (this);
};

nibbler.ui.TextArea.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    value: instance.properties.value
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@continuous_change', {data: e.data});
  })
};
