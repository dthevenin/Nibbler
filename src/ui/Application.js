nibbler.ui.Application = Object.create(bender.instance);

nibbler.ui.Application.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Application ({
    node: instance.views.$root,
    layout: instance.properties.layout
  });
  
  instance.__vs_instance.initComponent = function () {
    vs.Application_applications [this.id] = this;

    vs.ui.View.prototype.initComponent.call (this);
    this.preventScroll = true;

    this.html = document.querySelector ('html');
    this.html._comp_ = undefined;
    this.view._comp_ = this;
    this.addClassName ('application');
    
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
     
  // manage children
  var i = instance.children.length;
  while (i--) {
    var child = instance.children [i];
    if (child.__vs_instance) {
      instance.__vs_instance.add  (child.__vs_instance);
    }
  }
  
  var _app_ = instance.__vs_instance;
  setTimeout (function () {
    _app_.refresh ();
  }, 0);
};
