nibbler.ui.RadioButton = Object.create(bender.instance);

nibbler.ui.RadioButton.rendering = function () {
  var instance = this, config = {};

  bender.instance.rendering.call(this);

  if (instance.properties.model) {
    if (instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model;
    else if (instance.properties.model &&
            instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model.__vs_instance;
    else
      config.data = instance.properties.model
  }
  else config.data = instance.properties.data;

  config.node = instance.views.$root;

  instance.__vs_instance = new vs.ui.RadioButton (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndex = 
      instance.__vs_instance._selected_index;
    flexo.notify (instance, '@change', {data: e.data});
  })
};

nibbler.ui.RadioButton.__set_model = function (value) {
  if (value instanceof vs.core.Model)
    this.__vs_instance.model = value;
  else if (vs.util.isArray (value))
    this.__vs_instance.data = value;
  else if (value && value.__vs_instance instanceof vs.core.Model)
    this.__vs_instance.model = value.__vs_instance;
  else console.log ("Unsupported model property");
};
