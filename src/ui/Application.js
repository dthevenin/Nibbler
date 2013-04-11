nibbler.ui.Application = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Application ({
    node: instance.rendered.$root
  });

  instance.__vs_instance.initComponent = function () {
    vs.Application_applications [this.id] = this;

    vs.ui.View.prototype.initComponent.call (this);
    this.preventScroll = true;

    this.html = document.querySelector ('html');
    this.html._comp_ = undefined;
    this.view._comp_ = this;
    this.addClassName ('application');
//    this.addClassName ('absolute_layout');

    this.html.removeAttribute ('id');
    this.html.removeAttribute ('x-hag-ref');
    this.html.removeAttribute ('x-hag-comp');

    this.view.setAttribute ('id', this.id);
    this.view.setAttribute ('x-hag-ref', this.id);
    this.view.setAttribute ('x-hag-comp', this.id);

    var self = this;
    document.addEventListener ('orientationChanged', function (e)
    {
      var pid = window.deviceConfiguration.setOrientation (e.orientation);
      if (pid) { self.propagate ('deviceChanged', pid, null, true); }
    });
  };

  instance.__vs_instance.init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Application.vs_init.call (this);
};

nibbler.ui.Application.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    layout: instance.properties.layout
  });

  var _app_ = instance.__vs_instance;
  setTimeout (function () {
    _app_.refresh ();
  }, 0);
};
