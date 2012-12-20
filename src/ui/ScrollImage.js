nibbler.ui.ScrollImage = Object.create (nibbler.ui.View);

nibbler.ui.ScrollImage.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.ScrollImage.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    node: instance.views.$root,
    src: instance.properties.src,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll,
    stretch: instance.properties.stretch
  });

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
