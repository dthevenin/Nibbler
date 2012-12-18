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
nibbler.core.Array = Object.create(bender.instance);

nibbler.core.Array.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.core.Array ().init ();
  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

//   vs.util.defineProperty (instance.properties, 'length', {
//     get : function () {
//       return instance.__vs_instance.length;
//     }
//   })
};
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
nibbler.ui.View = Object.create(bender.instance);

nibbler.ui.View.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.View ({
    node: instance.views.$root,
    layout: instance.properties.layout
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  // manage children
  var i = this.children.length;
  while (i--) {
    var child = this.children [i];
    if (child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
nibbler.ui.ScrollView = Object.create(bender.instance);

nibbler.ui.ScrollView.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.ScrollView ({
    node: instance.views.$root,
    layout: instance.properties.layout
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  // manage children
  var i = this.children.length;
  while (i--) {
    var child = this.children [i];
    if (child.__vs_instance) {
      this.__vs_instance.add  (child.__vs_instance);
    }
  }
};
nibbler.ui.Application = Object.create(bender.instance);

nibbler.ui.Application.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Application ({
    node: instance.views.$root,
    layout: instance.properties.layout
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
     
  // manage children
  var i = instance.children.length;
  while (i--) {
    var child = instance.children [i];
    if (child.__vs_instance) {
      instance.__vs_instance.add  (child.__vs_instance);
    }
  }
  
  var _app_ = instance.__vs_instance;
  setTimeout (function () {
    _app_.refresh ();
  }, 0);
};
nibbler.ui.ScrollImage = Object.create(bender.instance);

nibbler.ui.ScrollImage.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.ScrollImageView ({
    node: instance.views.$root,
    src: instance.properties.src,
    pinch: instance.properties.pinch,
    scroll: instance.properties.scroll,
    stretch: instance.properties.stretch
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('load', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@load');
  })
};
nibbler.ui.TextArea = Object.create(bender.instance);

nibbler.ui.TextArea.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.TextArea ({
    node: instance.views.$root,
    value: instance.properties.value
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })

  instance.__vs_instance.bind ('continuous_change',
    instance.__vs_instance, function (e) {
    flexo.notify (instance, '@continuous_change', {data: e.data});
  })
};
nibbler.ui.Button = Object.create(bender.instance);

nibbler.ui.Button.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Button ({
    node: instance.views.$root
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('select', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@select');
  })
};
nibbler.ui.List = Object.create(bender.instance);

nibbler.ui.List.rendering = function () {
  var instance = this, config = {};

  bender.instance.rendering.call(this);

  if (instance.properties.model) {
    if (instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model;
    else if (instance.properties.model &&
            instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model.__vs_instance;
    else
      config.data = instance.properties.model
  }
  else config.data = instance.properties.data;
  
  config.node = instance.views.$root;
  config.hasArrow = instance.properties.hasArrow;
  config.filters = instance.properties.filters;
  config.scroll = instance.properties.scroll;
  config.type = instance.properties.type;

  instance.__vs_instance = new vs.ui.List (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('itemselect', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@itemselect', {data: e.data});
  })
};

nibbler.ui.List.__set_model = function (value) {
  if (value instanceof vs.core.Model)
    this.__vs_instance.model = value;
  else if (vs.util.isArray (value))
    this.__vs_instance.data = value;
  else if (value && value.__vs_instance instanceof vs.core.Model)
    this.__vs_instance.model = value.__vs_instance;
  else console.log ("Unsupported model property");
};
nibbler.ui.ComboBox = Object.create(bender.instance);

nibbler.ui.ComboBox.rendering = function () {
  var instance = this, config = {};

  bender.instance.rendering.call(this);

  config.data = instance.properties.data;
  config.node = instance.views.$root;

  instance.__vs_instance = new vs.ui.ComboBox (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

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
nibbler.ui.RadioButton = Object.create(bender.instance);

nibbler.ui.RadioButton.rendering = function () {
  var instance = this, config = {};

  bender.instance.rendering.call(this);

  if (instance.properties.model) {
    if (instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model;
    else if (instance.properties.model &&
            instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model.__vs_instance;
    else
      config.data = instance.properties.model
  }
  else config.data = instance.properties.data;

  config.node = instance.views.$root;

  instance.__vs_instance = new vs.ui.RadioButton (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndex = 
      instance.__vs_instance._selected_index;
    flexo.notify (instance, '@change', {data: e.data});
  })
};

nibbler.ui.RadioButton.__set_model = function (value) {
  if (value instanceof vs.core.Model)
    this.__vs_instance.model = value;
  else if (vs.util.isArray (value))
    this.__vs_instance.data = value;
  else if (value && value.__vs_instance instanceof vs.core.Model)
    this.__vs_instance.model = value.__vs_instance;
  else console.log ("Unsupported model property");
};
nibbler.ui.CheckBox = Object.create(bender.instance);

nibbler.ui.CheckBox.rendering = function () {
  var instance = this, config = {};

  bender.instance.rendering.call(this);

  if (instance.properties.model) {
    if (instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model;
    else if (instance.properties.model &&
            instance.properties.model instanceof vs.core.Model)
      config.model = instance.properties.model.__vs_instance;
    else
      config.data = instance.properties.model
  }
  else config.data = instance.properties.data;

  config.node = instance.views.$root;

  instance.__vs_instance = new vs.ui.CheckBox (config).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance,
    function (e) {
    instance.properties.selectedIndexes =
      instance.__vs_instance._selected_indexes;
    flexo.notify (instance, '@change', {data: e.data});
  })
};

nibbler.ui.CheckBox.__set_model = function (value) {
  if (value instanceof vs.core.Model)
    this.__vs_instance.model = value;
  else if (vs.util.isArray (value))
    this.__vs_instance.data = value;
  else if (value && value.__vs_instance instanceof vs.core.Model)
    this.__vs_instance.model = value.__vs_instance;
  else console.log ("Unsupported model property");
};
nibbler.ui.NavigationBar = Object.create(bender.instance);

nibbler.ui.NavigationBar.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.NavigationBar ({
    node: instance.views.$root,
    style: instance.properties.style
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.ui.TextLabel = Object.create(bender.instance);

nibbler.ui.TextLabel.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.TextLabel ({
    node: instance.views.$root,
    text: instance.properties.text
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.ui.ProgresseBar = Object.create(bender.instance);

nibbler.ui.ProgresseBar.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.ProgressBar ({
    node: instance.views.$root,
    indeterminate: instance.properties.indeterminate,
    index: instance.properties.index,
    range: instance.properties.range
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.ui.Slider = Object.create(bender.instance);

nibbler.ui.Slider.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Slider ({
    node: instance.views.$root,
    orientation: instance.properties.orientation,
    value: instance.properties.value,
    range: instance.properties.range
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

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
nibbler.ui.Image = Object.create(bender.instance);

nibbler.ui.Image.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.ImageView ({
    node: instance.views.$root,
    src: instance.properties.src
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.ui.TextInput = Object.create(bender.instance);

nibbler.ui.TextInput.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.InputField ({
    node: instance.views.$root,
    value: instance.properties.value,
    type: instance.properties.type,
    placeholder: instance.properties.placeholder
  }).init ();

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.value = e.data;
    flexo.notify (instance, '@change', {data: e.data});
  })

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);
};
nibbler.ui.Switch = Object.create(bender.instance);

nibbler.ui.Switch.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Switch ({
    node: instance.views.$root,
    textOff: instance.properties.textOff,
    textOn: instance.properties.textOn,
    toggled: instance.properties.toggled
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    flexo.notify (instance, '@change', {data: e.data});
  })
};
nibbler.ui.Picker = Object.create(bender.instance);

nibbler.ui.Picker.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.Picker ({
    node: instance.views.$root,
    data: instance.properties.data
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

  instance.__vs_instance.bind ('change', instance.__vs_instance, function (e) {
    instance.properties.selectedKeys =
      instance.__vs_instance.selectedKeys;
    instance.properties.selectedValues =
      instance.__vs_instance.selectedValues;
    flexo.notify (instance, '@change', {data: e.data});
  })
};
nibbler.ui.SegmentedButton = Object.create(bender.instance);

nibbler.ui.SegmentedButton.rendering = function () {
  var instance = this;

  bender.instance.rendering.call(this);

  instance.__vs_instance = new vs.ui.SegmentedButton ({
    node: instance.views.$root,
    isToggleButtons: instance.properties.istogglebuttons,
    items: instance.properties.items,
    type: instance.properties.type
  }).init ();

  vs.util.extendsBenderInstance (instance, instance.__vs_instance);

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
})(window);
