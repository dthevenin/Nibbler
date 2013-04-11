"use strict";

// Run the Bender application given by href
function run (href) {
  // Add classes based on id
  (function ($super) {
    bender.Component.render = function () {
      $super.apply(this, arguments);
      if (this.rendered.$root) {
        for (var c = this; c; c = c.prototype) {
          if (c.id) {
            this.rendered.$root.classList.add(c.id);
          }
        }
      }
    };
  }(bender.Component.render));

  var ENV = bender.load_app (
    window.document.body,
    flexo.get_args({ href: href }
  ));


}
