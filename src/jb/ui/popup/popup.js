/**
 * @fileoverview Basic popup element
 * @author igor.alexeenko (Igor Alekseyenko)
 */

goog.provide('jb.ui.Popup');

goog.require('goog.dom');
goog.require('goog.positioning');
goog.require('goog.style');
goog.require('goog.ui.Component');

/**
 * @param {Element=} opt_anchorElement
 * @constructor
 * @extends {goog.ui.Component}
 */
jb.ui.Popup = function(opt_anchorElement) {
  goog.base(this);

  if (opt_anchorElement) {
    this.anchorElement_ = opt_anchorElement;
  }
};
goog.inherits(jb.ui.Popup, goog.ui.Component);

/**
 * @enum {string}
 */
jb.ui.Popup.CssClass = {
  BASE: goog.getCssName('jb-popup')
};

/**
 * @enum {string}
 */
jb.ui.Popup.EventType = {
  HIDE: goog.events.getUniqueId('hide'),
  SHOW: goog.events.getUniqueId('show')
};

/**
 * @static
 * @param {Element=} opt_anchorElement
 * @return {jb.ui.Popup}
 */
jb.ui.Popup.showPopup = function(opt_anchorElement) {
  var popup = new jb.ui.Popup(opt_anchorElement);
  popup.setShown(true);

  return popup;
};

/**
 * @type {Element}
 * @private
 */
jb.ui.Popup.prototype.anchorElement_ = null;

/**
 * @override
 */
jb.ui.Popup.prototype.createDom = function() {
  var element = this.getDomHelper().createElement(goog.dom.TagName.DIV);
  goog.dom.classes.add(element, jb.ui.Popup.CssClass.BASE);

  this.setElementInternal(element);
};

/**
 * @override
 */
jb.ui.Popup.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  if (!goog.isNull(this.getAnchorElement())) {
    goog.positioning.positionAtAnchor(
        this.getAnchorElement(), goog.positioning.Corner.BOTTOM_LEFT,
        this.getElement(), goog.positioning.Corner.TOP_LEFT);
  } else {
    this.reposition();
  }

  this.getHandler().
      listen(window, goog.events.EventType.RESIZE, this.onWindowResize_);
};

jb.ui.Popup.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.getHandler().removeAll();
};

/**
 * @param {goog.events.Event} evt
 * @private
 */
jb.ui.Popup.prototype.onWindowResize_ = function(evt) {
  if (!goog.isNull(this.getAnchorElement())) {
    this.setShown(false);
  } else {
    this.reposition();
  }
};

/**
 * @return {Element}
 */
jb.ui.Popup.prototype.getAnchorElement = function() {
  return this.anchorElement_;
};

/**
 * @param {boolean} shown
 */
jb.ui.Popup.prototype.setShown = function(shown) {
  if (this.shown_ === shown) {
    return;
  }

  this.shown_ = shown;

  if (shown) {
    this.render(document.body);
  } else {
    goog.dom.removeNode(this.getElement());
    this.exitDocument();
  }

  this.dispatchEvent(shown ?
      jb.ui.Popup.EventType.SHOW :
      jb.ui.Popup.EventType.HIDE);
};

/**
 * @return {boolean}
 */
jb.ui.Popup.prototype.isShown = function() {
  return this.shown_;
};

/**
 * Places element at center.
 */
jb.ui.Popup.prototype.reposition = function() {
  var documentSize = goog.style.getSize(document.body);
  var elementSize = goog.style.getSize(this.getElement());
  var popupMargin = new goog.math.Box(
      -(elementSize.height / 2), 0, 0, -(elementSize.width / 2));

  goog.positioning.positionAtCoordinate(
      new goog.math.Coordinate(
              documentSize.width / 2, documentSize.height / 2),
      this.getElement(),
      goog.positioning.Corner.TOP_LEFT,
      popupMargin);
};
