nibbler.core.Model = Object.create (bender.instance);

nibbler.core.Model.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.core.Model ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
