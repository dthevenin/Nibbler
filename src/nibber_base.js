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

      if (instance.hasOwnProperty(property)) {
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
