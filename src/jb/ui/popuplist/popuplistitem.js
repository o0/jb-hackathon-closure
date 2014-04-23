/**
 * @fileoverview Item of {@link PopupList}
 * @author igor.alexeenko (Igor Alekseyenko)
 */

goog.provide('jb.ui.PopupListItem');

goog.require('goog.ui.Component');

/**
 * @param {string} caption
 * @constructor
 * @extends {goog.ui.Component}
 */
jb.ui.PopupListItem = function(caption) {
  goog.base(this);
  this.caption_ = caption;
};
goog.inherits(jb.ui.PopupListItem, goog.ui.Component);

/**
 * @enum {string}
 */
jb.ui.PopupListItem.CssClass = {
  BASE: goog.getCssName('jb-popuplist-item'),
  HIGHLIGHTED: goog.getCssName('jb-popuplist-item-highlighted'),
  SELECTED: goog.getCssName('jb-popuplist-item-selected')
};

/** @override */
jb.ui.PopupListItem.prototype.createDom = function() {
  var element = this.getDomHelper().createElement(goog.dom.TagName.DIV);
  goog.dom.classes.add(element, jb.ui.PopupListItem.CssClass.BASE);
  element.innerHTML = this.getCaption();

  this.setElementInternal(element);
};

/** @override */
jb.ui.PopupListItem.prototype.enterDocument = function() {
  this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,
      this.onElementClick_);
};

/**
 * @param {goog.events.EventTarget} evt
 * @private
 */
jb.ui.PopupListItem.prototype.onElementClick_ = function(evt) {
  this.dispatchEvent(goog.ui.Component.EventType.SELECT);
};

/**
 * @return {string}
 */
jb.ui.PopupListItem.prototype.getCaption = function() {
  return this.caption_;
};

/**
 * @param {boolean} selected
 */
jb.ui.PopupListItem.prototype.setSelected = function(selected) {
  if (this.selected_ === selected) {
    return;
  }

  this.selected_ = selected;

  goog.dom.classes.enable(this.getElement(),
      jb.ui.PopupListItem.CssClass.SELECTED, selected);

  this.dispatchEvent(selected ?
      goog.ui.Component.EventType.SELECT :
      goog.ui.Component.EventType.UNSELECT);
};

/**
 * @param {boolean} highlighted
 */
jb.ui.PopupListItem.prototype.setHighlighted = function(highlighted) {
  if (this.highlighted_ === highlighted) {
    return;
  }

  this.highlighted_ = highlighted;

  goog.dom.classes.enable(this.getElement(),
      jb.ui.PopupListItem.CssClass.HIGHLIGHTED, highlighted);
};


