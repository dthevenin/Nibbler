nibbler.ext.ui.GMap = function () {
  var instance = this;

  instance.__vs_instance = new vs.ext.ui.GMap ({
    node: instance.rendered.$root,
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ext.ui.GMap.vs_init.call (this);
};

nibbler.ext.ui.GMap.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    center: instance.properties.center,
    maxZoom: instance.properties.maxZoom,
    minZoom: instance.properties.minZoom,
    scroll: instance.properties.scroll,
    streetViewControl: instance.properties.streetViewControl,
    tapToZoom: instance.properties.tapToZoom,
    tilt: instance.properties.tilt,
    zoom: instance.properties.zoom,
    zoomControl: instance.properties.zoomControl
  });

  instance.__vs_instance.bind ('mapload', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@mapload');
  })
};
