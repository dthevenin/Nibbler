nibbler.data.GoogleSearch = Object.create(bender.instance);

nibbler.data.GoogleSearch.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.data.GoogleSearch ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('engineload',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@engineload');
  })

  if (instance.properties.searchEngine) {
    instance.setSearchEngine (instance.properties.searchEngine);
  }
};

nibbler.data.GoogleSearch.__set_adress = function (value) {
  // Full address search
  this.__vs_instance.searchAddress (value, function (result) {
    this.properties.addresses = result;

    // GPS coordinate search
    this.__vs_instance.addressToGPSCoordinate (value, function (coord) {
      this.properties.position = coord;
    }, this);
  }, this);
}

nibbler.data.GoogleSearch.__set_position = function (value) {
  // Full address search
  this.__vs_instance.GPSCoordinateToAddress (value, function (result) {
    this.properties.addresses = result;
  }, this);
};
