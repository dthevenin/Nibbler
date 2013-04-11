Widgets = function () {

  nibbler.ui.Application.call (this);

  this._current_panel = this.components.widgets_list;
  this.components.back_button.hide ();
  this.components.nav_title.hide ();

  this.onBack = Widgets.onBack;
  this.onListSelect = Widgets.onListSelect;
};

Widgets.onBack = function (e) {
  // HACK should be this._current_panel.show ();
  this._current_panel.views.$root.classList.remove ('show');
  this.components.back_button.hide ();
  this.components.nav_title.hide ();
  this._current_panel = this.components.widgets_list;
  this._current_panel.removeClassName ('hide');
};


Widgets.onListSelect = function (e) {
  this._current_panel.addClassName ('hide');

  switch (e.index) {
    case 0: this._current_panel = this.components.buttons; break;
    case 1: this._current_panel = this.components.inputs; break;
    case 2: this._current_panel = this.components.selectors; break;
    case 3: this._current_panel = this.components.sliders; break;
    case 4: this._current_panel = this.components.standard_list; break;
    case 5: this._current_panel = this.components.tab_list; break;
    case 6: this._current_panel = this.components.block_list; break;
    case 7: this._current_panel = this.components.map; break;
    case 8: this._current_panel = this.components.todo; break;
  }
  // HACK should be this._current_panel.show ();
  this._current_panel.views.$root.classList.add ('show');
  this.components.back_button.show ();
  this.components.nav_title.properties.text = e.item.title;
  this.components.nav_title.show ();
};
