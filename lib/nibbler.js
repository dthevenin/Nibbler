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
nibbler.data.GoogleSearch = Object.create (bender.instance);

nibbler.data.GoogleSearch.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.data.GoogleSearch ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.View = Object.create (bender.instance);

nibbler.ui.View.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.View ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.View.vs_init = function () {
  var instance = this;

  instance.__vs_instance.configure ({
    layout: instance.properties.layout
  });

  // manage children
  var i = this.children.length;
  while (i--) {
    var child = this.children [i];
    if (child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
nibbler.ui.ScrollView = Object.create (nibbler.ui.View);

nibbler.ui.ScrollView.rendering = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.views.$root,
    layout: instance.properties.layout
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};
nibbler.ui.Application = Object.create (nibbler.ui.View);

nibbler.ui.Application.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Application ({
    node: instance.views.$root
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
     
  this.vs_init ();
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
nibbler.ui.ScrollImage = Object.create (nibbler.ui.View);

nibbler.ui.ScrollImage.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ui.ScrollImage.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    node: instance.views.$root,
    src: instance.properties.src,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll,
    stretch: instance.properties.stretch
  });

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
nibbler.ui.TextArea = Object.create (nibbler.ui.View);

nibbler.ui.TextArea.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextArea ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.Button = Object.create (nibbler.ui.View);

nibbler.ui.Button.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
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
nibbler.ui.List = Object.create (nibbler.ui.View);

nibbler.ui.List.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.List ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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

  instance.__vs_instance = new vs.ui.List (config).init ();

  this.__vs_instance.bind ('itemselect', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@itemselect', {data: e.data});
  })
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
nibbler.ui.ComboBox = Object.create (nibbler.ui.View);

nibbler.ui.ComboBox.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ComboBox ({
    ndoe: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.RadioButton = Object.create (nibbler.ui.View);

nibbler.ui.RadioButton.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.RadioButton ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.CheckBox = Object.create (nibbler.ui.View);

nibbler.ui.CheckBox.did_render = function () {
  var instance = this;
  
  instance.__vs_instance = new vs.ui.CheckBox ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
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
nibbler.ui.NavigationBar = Object.create (nibbler.ui.View);

nibbler.ui.NavigationBar.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.NavigationBar.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    style: instance.properties.style
  });
};
nibbler.ui.TextLabel = Object.create (nibbler.ui.View);

nibbler.ui.TextLabel.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.TextLabel.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    text: instance.properties.text
  });
};
nibbler.ui.ProgresseBar = Object.create (nibbler.ui.View);

nibbler.ui.ProgresseBar.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ProgressBar ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
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
nibbler.ui.Slider = Object.create (nibbler.ui.View);

nibbler.ui.Slider.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Slider ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.Image = Object.create (nibbler.ui.View);

nibbler.ui.Image.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.Image.vs_init = function () {
  var instance = this;
  
  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    src: instance.properties.src
  });
};
nibbler.ui.TextInput = Object.create (nibbler.ui.View);

nibbler.ui.TextInput.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.InputField ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
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
nibbler.ui.Switch = Object.create (nibbler.ui.View);

nibbler.ui.Switch.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Switch ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.Picker = Object.create (nibbler.ui.View);

nibbler.ui.Picker.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.Picker ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
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
nibbler.ui.SegmentedButton = Object.create (nibbler.ui.View);

nibbler.ui.SegmentedButton.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
  
  this.vs_init ();
};

nibbler.ui.SegmentedButton.vs_init = function () {
  var instance = this;

  nibbler.ui.View.vs_init.call (this);

  instance.__vs_instance.configure ({
    isToggleButtons: instance.properties.istogglebuttons,
    items: instance.properties.items,
    type: instance.properties.type
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
nibbler.ext.ui.GMap = Object.create(bender.instance);

nibbler.ext.ui.GMap.did_render = function () {
  var instance = this;

  instance.__vs_instance = new vs.ext.ui.GMap ({
    node: instance.views.$root,
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  this.vs_init ();
};

nibbler.ext.ui.GMap.vs_init = function () {
  var instance = this;

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
