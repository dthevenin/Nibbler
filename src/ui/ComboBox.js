nibbler.ui.ComboBox = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ComboBox ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ComboBox.vs_init.call (this);
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
