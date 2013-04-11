nibbler.ui.Switch = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Switch ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Switch.vs_init.call (this);
};

nibbler.ui.Switch.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    textOff: instance.properties.textOff,
    textOn: instance.properties.textOn,
    toggled: instance.properties.toggled
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })
};
