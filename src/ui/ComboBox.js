nibbler.ui.ComboBox = Object.create(bender.instance);

nibbler.ui.ComboBox.did_render = function () {
  var instance = this, config = {};

  bender.instance.did_render.call(this);

  config.data = instance.properties.data;
  config.node = instance.views.$root;

  instance.__vs_instance = new vs.ui.ComboBox (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  vs.util.defineProperty (instance.properties, 'selectedItem', {
    get : function () {
      return instance.__vs_instance.selectedIndex;
    }
  })
};
