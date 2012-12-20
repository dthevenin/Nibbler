nibbler.ui.ComboBox = Object.create (nibbler.ui.View);

nibbler.ui.ComboBox.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ComboBox ({
    ndoe: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.ComboBox.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    data: instance.properties.data
  });

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
