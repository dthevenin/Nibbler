nibbler.ui.ScrollImage = Object.create(bender.instance);

nibbler.ui.ScrollImage.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.views.$root,
    src: instance.properties.src,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll,
    stretch: instance.properties.stretch
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
