nibbler.core.Array = Object.create(bender.instance);

nibbler.core.Array.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.core.Array ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

//   vs.util.defineProperty (instance.properties, 'length', {
//     get : function () {
//       return instance.__vs_instance.length;
//     }
//   })
};
