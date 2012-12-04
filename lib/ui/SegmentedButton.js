nibbler.ui.SegmentedButton = Object.create(bender.instance);

nibbler.ui.SegmentedButton.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.views.$root,
    items: instance.properties.items,
    type: instance.properties.type
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select', {data: e.data});
  })

  vs.util.defineProperty (instance.properties, 'selectedIndex', {
    get : function () {
      return instance.__vs_instance.selectedIndex;
    }
  })
};
