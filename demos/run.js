// Automatically add the id of a component as the class name of its root element
bender.instance.rendering = function () {
  if (this.reference && this.reference.id && this.views.$root) {
    this.views.$root.classList.add(this.reference.id);
  }
};

// Run the Bender application given by href
function run(href) {
  var context = bender.create_context();
  var component = context.create_component(flexo.get_args({ href: href }));
  window.instance = bender.create_instance({ reference: component });
  flexo.listen(instance, "@error", function (e) {
    alert("Error loading {0}: {1}.".fmt(e.uri, e.message));
  });
  flexo.listen(instance, "@rendered", function (e) {
    if (e.instance) {
      window.instance = e.instance;
    }
  });
  context.add_instance(window.instance, document.body);
}
