bender.$.Widgets = Object.create(bender.instance);

bender.$.Widgets.rendering = function () {
  this._current_panel = this.instances.widgets_list;
  this.instances.back_button.hide ();
};

bender.$.Widgets.onBack = function (e) {
  // HACK should be this._current_panel.show ();
  this._current_panel.instances.panel.views.$root.classList.remove ('show');
  this.instances.back_button.hide ();
  this._current_panel = this.instances.widgets_list;
  this._current_panel.removeClassName ('hide');
};


bender.$.Widgets.onListSelect = function (e) {
  this._current_panel.addClassName ('hide');

  console.log (this.instances.buttons)
  switch (e.index) {
    case 0: this._current_panel = this.instances.buttons; break;
    case 1: this._current_panel = this.instances.inputs; break;
    case 2: this._current_panel = this.instances.selectors; break;
    case 3: this._current_panel = this.instances.sliders; break;
    case 4: this._current_panel = this.instances.standard_list; break;
    case 5: this._current_panel = this.instances.tab_list; break;
    case 6: this._current_panel = this.instances.block_list; break;
    case 7: this._current_panel = this.instances.map; break;
  }
  // HACK should be this._current_panel.show ();
  this._current_panel.instances.panel.views.$root.classList.add ('show');
  this.instances.back_button.show ();
};
