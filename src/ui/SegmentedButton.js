nibbler.ui.SegmentedButton = Object.create (nibbler.ui.View);

nibbler.ui.SegmentedButton.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.SegmentedButton.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    isToggleButtons: instance.properties.istogglebuttons,
    items: instance.properties.items,
    type: instance.properties.type
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
