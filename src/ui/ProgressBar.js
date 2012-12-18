nibbler.ui.ProgresseBar = Object.create(bender.instance);

nibbler.ui.ProgresseBar.did_render = function () {
  var instance = this;

  bender.instance.did_render.call(this);

  instance.__vs_instance = new vs.ui.ProgressBar ({
    node: instance.views.$root,
    indeterminate: instance.properties.indeterminate,
    index: instance.properties.index,
    range: instance.properties.range
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
