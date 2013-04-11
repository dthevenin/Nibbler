nibbler.data.GoogleSearch = function () {
  var instance = this;

  instance.__vs_instance = new vs.data.GoogleSearch ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.data.GoogleSearch.vs_init.call (this);
};

nibbler.data.GoogleSearch.vs_init = function () {
  var instance = this;

  instance.__vs_instance.bind ('engineload',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@engineload');
  })

  if (instance.properties.searchEngine) {
    instance.setSearchEngine (instance.properties.searchEngine);
  }

  instance.__set_address = nibbler.data.GoogleSearch.__set_address;
  instance.__set_position = nibbler.data.GoogleSearch.__set_position;
};

nibbler.data.GoogleSearch.__set_address = function (value) {
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
