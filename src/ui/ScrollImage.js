nibbler.ui.ScrollImage = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ScrollImage.vs_init.call (this);
};

nibbler.ui.ScrollImage.vs_init = function () {
  var instance = this;

  nibbler.ui.ScrollView.vs_init.call (this);

  instance.__vs_instance.configure ({
    node: instance.rendered.$root,
    src: instance.properties.src,
    stretch: instance.properties.stretch
  });

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
