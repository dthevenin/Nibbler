nibbler.ui.SegmentedButton = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.SegmentedButton.vs_init.call (this);;
};

nibbler.ui.SegmentedButton.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    isToggleButtons: instance.properties.istogglebuttons,
    items: instance.properties.items,
    type: instance.properties.type,
    orientation: instance.properties.orientation
  });

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select', {data: e.data});
  })

  vs.util.defineProperty (instance.properties, 'selectedIndex', {
    get : function () {
      return instance.__vs_instance.selectedIndex;
    }
  })
};
