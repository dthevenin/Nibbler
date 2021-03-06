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
