/**
 * @fileoverview Custom-made ComboBox
 * @author igor.alexeenko (Igor Alekseyenko)
 */

goog.provide('jb.ui.ComboBox');

goog.require('goog.array');
goog.require('goog.ui.Component');
goog.require('jb.data');
goog.require('jb.ui.ComboBoxRenderer');
goog.require('jb.ui.PopupList');
goog.require('jb.ui.PopupListItem');

/**
 * @param {string=} opt_caption
 * @param {jb.ui.ComboBoxRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.Component}
 */
jb.ui.ComboBox = function(opt_caption, opt_renderer) {
  goog.base(this);

  this.caption_ = goog.isDef(opt_caption) ? opt_caption :
      this.defaultCaption;

  this.renderer_ = goog.isDef(opt_renderer) ? opt_renderer :
      jb.ui.ComboBoxRenderer.getInstance();
};
goog.inherits(jb.ui.ComboBox, goog.ui.Component);

/**
 * @enum {string}
 */
jb.ui.ComboBox.EventType = {
  CHANGE: goog.events.getUniqueId('change'),
  SHOW_POPUP: goog.events.getUniqueId('showpopup'),
  HIDE_POPUP: goog.events.getUniqueId('hidepopup')
};

/**
 * @type {string}
 * @protected
 */
jb.ui.ComboBox.prototype.defaultCaption = 'Default text';

/** @override */
jb.ui.ComboBox.prototype.createDom = function() {
  this.setElementInternal(this.getRenderer().createDom(this));

  this.inputElement_ = this.getRenderer().getInputElement(this);
  this.arrowElement_ = this.getRenderer().getArrowElement(this);

  this.popupElement_ = new jb.ui.PopupList(this.inputElement_);
  this.popupElement_.setParentEventTarget(this);
  this.registerDisposable(this);

  goog.array.forEach(jb.data.comboboxData, function(item) {
    this.popupElement_.addItem(new jb.ui.PopupListItem(item));
  }, this);

  this.popupElement_.filter();
};

/** @override */
jb.ui.ComboBox.prototype.enterDocument = function() {
  this.getHandler().
      listen(this.inputElement_, goog.events.EventType.KEYUP,
          this.onInputKeyUp_).
      listen(this.inputElement_, goog.events.EventType.FOCUS,
          this.onInputFocus_).
      listen(this.arrowElement_, goog.events.EventType.CLICK,
          this.onArrowClick_).
      listen(this.popupElement_, goog.ui.Component.EventType.SELECT,
          this.onItemSelect_);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
jb.ui.ComboBox.prototype.onInputKeyUp_ = function(evt) {
  var ignoredKeys = [
    goog.events.KeyCodes.DOWN,
    goog.events.KeyCodes.ENTER,
    goog.events.KeyCodes.ESC,
    goog.events.KeyCodes.UP
  ];

  if (!goog.array.contains(ignoredKeys, evt.keyCode) &&
      this.inputElement_.value !== this.inputLastValue_) {
    this.popupElement_.filter(this.inputElement_.value);
    this.inputLastValue_ = this.inputElement_.value;
  }
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
jb.ui.ComboBox.prototype.onInputFocus_ = function(evt) {
  this.popupElement_.setShown(true);
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
jb.ui.ComboBox.prototype.onInputBlur_ = function(evt) {
  this.popupElement_.setShown(false);
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
jb.ui.ComboBox.prototype.onArrowClick_ = function(evt) {
  this.popupElement_.setShown(!this.popupElement_.isShown());
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
jb.ui.ComboBox.prototype.onItemSelect_ = function(evt) {
  var selectedItem = /** @type {jb.ui.PopupListItem} */ (evt.target);
  this.inputElement_.value = selectedItem.getCaption();
};

/**
 * @return {jb.ui.ComboBoxRenderer}
 */
jb.ui.ComboBox.prototype.getRenderer = function() {
  return this.renderer_;
};

/**
 * @return {string}
 */
jb.ui.ComboBox.prototype.getCaption = function() {
  return this.caption_;
};

