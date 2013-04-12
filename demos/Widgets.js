Widgets = function () {

  nibbler.ui.Application.call (this);

  for (var i = 0; i < this.components.panels.children.length; i++)
  {
    var child = this.components.panels.children [i];
    child.hide ();
  }

  this._current_panel = this.components.widgets_list;
  this.components.back_button.hide ();
  this.components.nav_title.hide ();

  this.onBack = Widgets.onBack;
  this.onListSelect = Widgets.onListSelect;
};

Widgets.onBack = function (e) {
  this._current_panel.hide ();
  this.components.back_button.hide ();
  this.components.nav_title.hide ();
  this._current_panel = this.components.widgets_list;
  this._current_panel.show ();
};


Widgets.onListSelect = function (e) {
  this._current_panel.hide ();

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
  this._current_panel.show ();
  this._current_panel.refresh ();

  this.components.back_button.show ();
  this.components.nav_title.properties.text = e.item.title;
  this.components.nav_title.show ();
};
