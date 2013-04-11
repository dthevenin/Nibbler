nibbler.ui.List = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.List ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.List.vs_init.call (this);
};

nibbler.ui.List.vs_init = function () {
  var instance = this, config = {};

  nibbler.ui.View.vs_init.call(this);

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);

  config.hasArrow = instance.properties.hasArrow;
  config.filters = instance.properties.filters;
  config.scroll = instance.properties.scroll;
  config.type = instance.properties.type;

  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('itemselect', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@itemselect', {data: e.data});
  })

  instance.__set_model = nibbler.ui.List.__set_model;
  instance.__set_data = nibbler.ui.List.__set_data;
};

nibbler.ui.List.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.List.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
