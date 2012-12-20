nibbler.ui.CheckBox = Object.create (nibbler.ui.View);

nibbler.ui.CheckBox.did_render = function () {
  var instance = this;
  
  instance.__vs_instance = new vs.ui.CheckBox ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.CheckBox.vs_init = function () {
  nibbler.ui.View.vs_init.call (this);
  
  var instance = this, config = {};

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);
  
  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@change', {data: e.data});
  })
};

nibbler.ui.CheckBox.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.CheckBox.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
