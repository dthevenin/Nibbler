nibbler.ui.RadioButton = Object.create (nibbler.ui.View);

nibbler.ui.RadioButton.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.RadioButton ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.RadioButton.vs_init = function () {
  var instance = this, config = {};

  nibbler.ui.View.vs_init.call (this);

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);

  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndex = 
      instance.__vs_instance._selected_index;
    flexo.notify (instance, '@change', {data: e.data});
  })
};

nibbler.ui.RadioButton.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.RadioButton.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
