nibbler.ext.ui.GMap = Object.create(bender.instance);

nibbler.ext.ui.GMap.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ext.ui.GMap ({
    node: instance.views.$root,
    center: instance.properties.center,
    maxZoom: instance.properties.maxZoom,
    minZoom: instance.properties.minZoom,
    scroll: instance.properties.scroll,
    streetViewControl: instance.properties.streetViewControl,
    tapToZoom: instance.properties.tapToZoom,
    tilt: instance.properties.tilt,
    zoom: instance.properties.zoom,
    zoomControl: instance.properties.zoomControl
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('mapload', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@mapload');
  })
};