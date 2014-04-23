/**
 * @fileoverview Popup with list behaviour.
 * @author igor.alexeenko (Igor Alekseyenko)
 */

goog.provide('jb.ui.PopupList');

goog.require('goog.array');
goog.require('jb.ui.Popup');
goog.require('jb.ui.PopupListItem');

/**
 * @param {Element=} opt_anchorElement
 * @constructor
 * @extends {jb.ui.Popup}
 */
jb.ui.PopupList = function(opt_anchorElement) {
  goog.base(this, opt_anchorElement);

  /**
   * @type {Array.<jb.ui.PopupListItem>}
   * @private
   */
  this.items_ = [];

  /**
   * @type {Array.<jb.ui.PopupListItem>}
   * @private
   */
  this.selectedItems_ = [];

  this.highlightedIndex_ = 0;
  this.selectedIndex_ = null;
};
goog.inherits(jb.ui.PopupList, jb.ui.Popup);

/**
 * @enum {string}
 */
jb.ui.PopupList.CssClass = {
  BASE: goog.getCssName('jb-popuplist')
};

/** @override */
jb.ui.PopupList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().
      listen(document.body, goog.events.EventType.KEYDOWN, this.onKeyDown_).
      listen(this, goog.ui.Component.EventType.SELECT, this.onElSelect_);

  this.filter();
};

/**
 * @param {string=} opt_substr
 */
jb.ui.PopupList.prototype.filter = function(opt_substr) {
  if (!opt_substr) {
    this.selectedItems_ = this.items_.slice(0);
  }
  else {
    this.selectedItems_ = goog.array.filter(this.items_, function(item) {
      var caption = item.getCaption().toLowerCase();
      var substr = opt_substr.toLowerCase();

      return caption.indexOf(substr) > -1;
    }, this);
  }

  this.removeChildren(true);
  goog.array.forEach(this.selectedItems_, function(item) {
    this.addChild(item, true);
  }, this);

  this.setItemHighlightedAt(this.highlightedIndex_, true);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
jb.ui.PopupList.prototype.onKeyDown_ = function(evt) {
  this.handleKeyDown(evt);
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
jb.ui.PopupList.prototype.onElSelect_ = function(evt) {
  var item = /** @type {jb.ui.PopupListItem} */ (evt.target);
  var itemID = item.getId();
  var allIDs = this.getChildIds();

  this.setItemHighlightedAt(allIDs.indexOf(itemID), true, true, true);
};

/**
 * @param {goog.events.BrowserEvent} evt
 */
jb.ui.PopupList.prototype.handleKeyDown = function(evt) {
  switch(evt.keyCode) {
    case goog.events.KeyCodes.ESC:
      this.setShown(false);
      break;
    case goog.events.KeyCodes.UP:
      this.setItemHighlightedAt(this.highlightedIndex_ - 1, true);
      break;
    case goog.events.KeyCodes.DOWN:
      this.setItemHighlightedAt(this.highlightedIndex_ + 1, true);
      break;
    case goog.events.KeyCodes.ENTER:
      this.setItemHighlightedAt(this.highlightedIndex_, true, true, true);
      break;
  }
};

/**
 * @param {jb.ui.PopupListItem} item
 * @return {jb.ui.PopupList} This method can be used in chain.
 */
jb.ui.PopupList.prototype.addItem = function(item) {
  if (this.items_.indexOf(item) > -1) {
    return this;
  }

  this.items_.push(item);

  return this;
};

/**
 * @param {number} index
 * @param {boolean} highlighted
 * @param {boolean=} opt_selected
 * @param {boolean=} opt_close
 */
jb.ui.PopupList.prototype.setItemHighlightedAt = function(index, highlighted,
                                                          opt_selected,
                                                          opt_close) {
  if (this.getChildIds().length === 0) {
    return;
  }

  if (highlighted || opt_selected) {
    if (this.selectedIndex_ === index) {
      return;
    }
  }

  index = goog.math.clamp(index, 0, this.getChildCount() - 1);

  var item = this.getChildAt(index);

  if (highlighted) {
    this.getChildAt(this.highlightedIndex_);
    this.setItemHighlightedAt(this.highlightedIndex_, false);

    if (opt_selected) {
      if (this.selectedIndex_) {
        var selectedItem = this.getChildAt(this.selectedIndex_);

        if (selectedItem) {
          selectedItem.setSelected(false);
        }
      }

      this.selectedIndex_ = index;
      item.setSelected(true);

      if (opt_close) {
        this.setShown(false);
      }
    }
  }

  item.setHighlighted(highlighted);

  this.highlightedIndex_ = highlighted ? index : null;
};

/**
 * @return {?number}
 */
jb.ui.PopupList.prototype.getHighlightedIndex = function() {
  return this.highlightedIndex_;
};



 