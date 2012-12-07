bender.$.Widgets = Object.create(bender.instance);

bender.$.Widgets.rendering = function () {
  this._current_panel = this.instances.widgets_list;
  this.instances.back_button.hide ();
  this.instances.nav_title.hide ();
};

bender.$.Widgets.onBack = function (e) {
  // HACK should be this._current_panel.show ();
  this._current_panel.views.$root.classList.remove ('show');
  this.instances.back_button.hide ();
  this.instances.nav_title.hide ();
  this._current_panel = this.instances.widgets_list;
  this._current_panel.removeClassName ('hide');
};


bender.$.Widgets.onListSelect = function (e) {
  this._current_panel.addClassName ('hide');

  switch (e.index) {
    case 0: this._current_panel = this.instances.buttons.instances.buttons; break;
    case 1: this._current_panel = this.instances.inputs.instances.inputs; break;
    case 2: this._current_panel = this.instances.selectors.instances.selectors; break;
    case 3: this._current_panel = this.instances.sliders.instances.sliders; break;
    case 4: this._current_panel = this.instances.standard_list.instances.standardlist; break;
    case 5: this._current_panel = this.instances.tab_list.instances.tablist; break;
    case 6: this._current_panel = this.instances.block_list.instances.blocklist; break;
    case 7: this._current_panel = this.instances.map.instances.map; break;
    case 8: this._current_panel = this.instances.todo.instances.todo; break;
  }
  // HACK should be this._current_panel.show ();
  this._current_panel.views.$root.classList.add ('show');
  this.instances.back_button.show ();
  this.instances.nav_title.properties.text = e.item.title;
  this.instances.nav_title.show ();
};
