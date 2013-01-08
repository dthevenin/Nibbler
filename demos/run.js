// Automatically add the id of a component as the class name of its root element
bender.context.rendered = function (instance) {
  if (instance.views.$root && instance.views.$root.classList &&
    typeof instance.views.$root.classList.add === "function") {
    for (var c = instance.component; c; c = c.prototype) {
      if (c.hasOwnProperty("id")) {
        instance.views.$root.classList.add(c.id);
      }
    }
  }
};

// Link stylesheets
bender.context.link_stylesheet = function (uri) {
  document.head.appendChild(flexo.$link({ rel: "stylesheet", href: uri }));
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
