nibbler.ui.Slider = Object.create (nibbler.ui.View);

nibbler.ui.Slider.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Slider ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.Slider.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    orientation: instance.properties.orientation,
    value: instance.properties.value,
    range: instance.properties.range
  });

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    instance.properties.value = instance.__vs_instance._value;
    flexo.notify (instance, '@continuous_change');
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = instance.__vs_instance._value;
    flexo.notify (instance, '@change');
  });
};
