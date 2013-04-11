(function (exports, undefined) {
/** @license
  Copyright (C) 2009-2012. David Thevenin, ViniSketch SARL (c), and
  contributors. All rights reserved

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

function extendsBenderInstance (instance, vs_object) {

  for (var property in vs_object)
  {
    var s = vs_object [property];
    if (vs.util.isFunction (s))
    {
      if (property == "parent") continue;

      if (property in instance) {
        console.warn("Not overloading property `{0}` on".fmt(property),
          instance);
      } else {
        instance [property] = s.bind (vs_object);
      }
    }
  }
}

/********************************************************************
                         export
*********************************************************************/

vs.util.extend (vs.util, {
  extendsBenderInstance:              extendsBenderInstance,
});

var nibbler = {
  core: {},
  data: {},
  ui: {},
  fx: {},
  ext: {
    fx: {},
    ui: {}
  }
};

exports.nibbler = nibbler;

nibbler._isInstanceOf = function (obj, klass)
{
  if (!obj || !klass) return false;
  
  if (vs.util.isFunction (klass)) return (obj instanceof klass);
  
  var proto = Object.getPrototypeOf (obj);
  
  if (proto === klass) return true;
  else return (nibbler._isInstanceOf (proto, klass));
}

nibbler.__retrieve_vs_array_from = function (value) {
  if (!value) return null;
  if (nibbler._isInstanceOf (value, vs.core.Array)) return value
  if (nibbler._isInstanceOf (value, nibbler.core.Array))
    return value.__vs_instance;
  
  return null;
};

nibbler.__retrieve_vs_model_from = function (value) {
  if (!value) return null;
  if (nibbler._isInstanceOf (value, vs.core.Model)) return value
  if (vnibbler._isInstanceOf (value, nibbler.core.Model))
    return value.__vs_instance;
      
  return null;
};

nibbler.__retrieve_array_from = function (value) {
  if (!value) return null;
  if (nibbler._isInstanceOf (value, vs.core.Array)) return value.data
  if (vs.util.isArray (value)) return value;
  
  return null;
};
nibbler.core.Model = function () {
  var instance = this;

  instance.__vs_instance = new vs.core.Model ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.core.Array = function () {
  var instance = this;

  instance.__vs_instance = new vs.core.Array ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

//   vs.util.defineProperty (instance.properties, 'length', {
//     get : function () {
//       return instance.__vs_instance.length;
//     }
//   })
};
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
nibbler.ui.View = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.View ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.View.vs_init.call (this);
};

nibbler.ui.View.vs_init = function () {
  var instance = this;

  instance.__vs_instance.configure ({
    layout: instance.properties.layout
  });

  // manage children
  for (var key_id in instance.components) {
    if (key_id == '$this' || key_id == '$that') continue;
    var child = instance.components [key_id];
    if (child && child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
nibbler.ui.ScrollView = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ScrollView.vs_init.call (this);
};


nibbler.ui.ScrollView.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    layout: instance.properties.layout,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll
  });
};
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
nibbler.ui.ScrollImage = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ScrollImage.vs_init.call (this);
};

nibbler.ui.ScrollImage.vs_init = function () {
  var instance = this;

  nibbler.ui.ScrollView.vs_init.call (this);

  instance.__vs_instance.configure ({
    node: instance.rendered.$root,
    src: instance.properties.src,
    stretch: instance.properties.stretch
  });

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
nibbler.ui.TextArea = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextArea ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextArea.vs_init.call (this);
};

nibbler.ui.TextArea.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    value: instance.properties.value
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@continuous_change', {data: e.data});
  })
};
nibbler.ui.Button = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Button.vs_init.call (this);
};

nibbler.ui.Button.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text,
    type: instance.properties.type,
    style: instance.properties.style
  });

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select');
  })
};
nibbler.ui.List = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.List ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.List.vs_init.call (this);
};

nibbler.ui.List.vs_init = function () {
  var instance = this, config = {};

  nibbler.ui.View.vs_init.call(this);

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);

  config.hasArrow = instance.properties.hasArrow;
  config.filters = instance.properties.filters;
  config.scroll = instance.properties.scroll;
  config.type = instance.properties.type;

  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('itemselect', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@itemselect', {data: e.data});
  })

  instance.__set_model = nibbler.ui.List.__set_model;
  instance.__set_data = nibbler.ui.List.__set_data;
};

nibbler.ui.List.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.List.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
nibbler.ui.ComboBox = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ComboBox ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ComboBox.vs_init.call (this);
};

nibbler.ui.ComboBox.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    data: instance.properties.data
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  vs.util.defineProperty (instance.properties, 'selectedItem', {
    get : function () {
      return instance.__vs_instance.selectedIndex;
    }
  })
};
nibbler.ui.RadioButton = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.RadioButton ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.RadioButton.vs_init.call (this);
};

nibbler.ui.RadioButton.vs_init = function () {
  var instance = this, config = {};

  nibbler.ui.View.vs_init.call (this);

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);

  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndex =
      instance.__vs_instance._selected_index;
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__set_model = nibbler.ui.RadioButton.__set_model;
  instance.__set_data = nibbler.ui.RadioButton.__set_data;
};

nibbler.ui.RadioButton.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.RadioButton.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
nibbler.ui.CheckBox = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.CheckBox ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.CheckBox.vs_init.call (this);
};

nibbler.ui.CheckBox.vs_init = function () {
  nibbler.ui.View.vs_init.call (this);

  var instance = this, config = {};

  var model = nibbler.__retrieve_vs_array_from (instance.properties.model);
  if (model) config.model = model;
  else config.data = nibbler.__retrieve_array_from (instance.properties.data);

  instance.__vs_instance.configure (config);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__set_model = nibbler.ui.CheckBox.__set_model;
  instance.__set_data = nibbler.ui.CheckBox.__set_data;
};

nibbler.ui.CheckBox.__set_model = function (value) {
  var model = nibbler.__retrieve_vs_array_from (value);
  if (model) this.__vs_instance.model = model;
  else console.log ("Unsupported model property");
};

nibbler.ui.CheckBox.__set_data = function (value) {
  var data = nibbler.__retrieve_array_from (value);
  if (data) this.__vs_instance.data = data;
  else console.log ("Unsupported data property");
};
nibbler.ui.NavigationBar = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.NavigationBar.vs_init.call (this);
};

nibbler.ui.NavigationBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    style: instance.properties.style
  });
};
nibbler.ui.TextLabel = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextLabel.vs_init.call (this);
};

nibbler.ui.TextLabel.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text
  });
};
nibbler.ui.ProgresseBar = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ProgressBar ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.ProgresseBar.vs_init.call (this);
};

nibbler.ui.ProgresseBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    indeterminate: instance.properties.indeterminate,
    index: instance.properties.index,
    range: instance.properties.range
  });
};
nibbler.ui.Slider = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Slider ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Slider.vs_init.call (this);
};

nibbler.ui.Slider.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    orientation: instance.properties.orientation,
    value: instance.properties.value,
    range: instance.properties.range
  });

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    instance.properties.value = instance.__vs_instance._value;
    flexo.notify (instance, '@continuous_change');
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = instance.__vs_instance._value;
    flexo.notify (instance, '@change');
  });
};
nibbler.ui.Image = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Image.vs_init.call (this);
};

nibbler.ui.Image.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    src: instance.properties.src
  });
};
nibbler.ui.TextInput = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.InputField ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.TextInput.vs_init.call (this);
};

nibbler.ui.TextInput.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    value: instance.properties.value,
    type: instance.properties.type,
    placeholder: instance.properties.placeholder
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = e.data;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
nibbler.ui.Switch = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Switch ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Switch.vs_init.call (this);
};

nibbler.ui.Switch.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    textOff: instance.properties.textOff,
    textOn: instance.properties.textOn,
    toggled: instance.properties.toggled
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })
};
nibbler.ui.Picker = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Picker ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.Picker.vs_init.call (this);
};

nibbler.ui.Picker.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    data: instance.properties.data
  });

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.selectedKeys =
      instance.__vs_instance.selectedKeys;
    instance.properties.selectedValues =
      instance.__vs_instance.selectedValues;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
nibbler.ui.SegmentedButton = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.rendered.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  nibbler.ui.SegmentedButton.vs_init.call (this);;
};

nibbler.ui.SegmentedButton.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    isToggleButtons: instance.properties.istogglebuttons,
    items: instance.properties.items,
    type: instance.properties.type,
    orientation: instance.properties.orientation
  });

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select', {data: e.data});
  })

  vs.util.defineProperty (instance.properties, 'selectedIndex', {
    get : function () {
      return instance.__vs_instance.selectedIndex;
    }
  })
};
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
})(window);
