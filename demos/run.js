// Automatically add the id of a component as the class name of its root element
bender.instance.did_render = function () {
  if (this.views.$root && this.views.$root.classList &&
    typeof this.views.$root.classList.add === "function") {
    for (var c = this.component; c && !c.hasOwnProperty("id"); c = c.prototype);
    if (c) {
      this.views.$root.classList.add(c.id);
    }
  }
};

// Run the Bender application given by href
function run(href) {
  window.context = bender.create_context();
  var component = window.context.$("component", flexo.get_args({ href: href }));
  component.create_instance(document.body, null, function (instance) {
    flexo.listen(instance, "@error", function (e) {
      alert("Error loading {0}: {1}.".fmt(e.uri, e.message));
    });
  });
}
