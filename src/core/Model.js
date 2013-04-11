nibbler.core.Model = function () {
  var instance = this;

  instance.__vs_instance = new vs.core.Model ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
