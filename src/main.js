/**
 * @fileoverview Entry point.
 * @author igor.alexeenko (Igor Alekseyenko)
 */

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.ui.ComboBox');
goog.require('goog.ui.ComboBoxItem');
goog.require('jb.data');
goog.require('jb.ui.ComboBox');

/**
 * @public
 * @param {boolean=} opt_cheatMode
 * @return {void}
 * @constructor
 */
var Main = function(opt_cheatMode) {
  var comboboxElement;
  var layoutElement = goog.dom.getElementByClass(Main.CssClass.LAYOUT_EL);

  // Cheat mode is solution of a problem without writing new classes, only
  // by using default Google Closure Library components. It works perfectly
  // well and it is common way in using Closure Library — if there is already
  // written and well tested component, you don't need to create a new one.
  if (Boolean(opt_cheatMode)) {
    comboboxElement = new goog.ui.ComboBox();
    comboboxElement.setUseDropdownArrow(true);
    comboboxElement.setDefaultText('Default text');

    goog.array.forEach(jb.data.comboboxData, function(item) {
      comboboxElement.addItem(new goog.ui.ComboBoxItem(item));
    }, this);
  }
  // Regular mode used to show how to write UI Components in Google Closure
  // Library.
  else {
    comboboxElement = new jb.ui.ComboBox();
  }

  comboboxElement.render(layoutElement);
};

/**
 * @enum {string}
 */
Main.CssClass = {
  LAYOUT_EL: goog.getCssName('layout')
};

goog.exportSymbol('Main', Main);
