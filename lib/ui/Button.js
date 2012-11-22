bender.$.Button = Object.create(bender.instance);

bender.$.Button.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.views.$root
  }).init ();

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select');
  })
};
