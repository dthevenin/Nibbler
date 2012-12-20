nibbler.ui.Button = Object.create (nibbler.ui.View);

nibbler.ui.Button.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.Button.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text,
    type: instance.properties.type,
    style: instance.properties.style
  });

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select');
  })
};
