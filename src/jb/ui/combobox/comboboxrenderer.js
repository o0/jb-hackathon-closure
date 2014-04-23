/**
 * @fileoverview Renderer for custom ComboBox
 * @author igor.alexeenko (Igor Alekseyenko)
 */
 
goog.provide('jb.ui.ComboBoxRenderer');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('ojster');
goog.require('jb.ui.ComboboxTemplate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
jb.ui.ComboBoxRenderer = function() {};
goog.inherits(jb.ui.ComboBoxRenderer, goog.events.EventTarget);
goog.addSingletonGetter(jb.ui.ComboBoxRenderer);

jb.ui.ComboBoxRenderer.CssClass = {
  ARROW: goog.getCssName('jb-combo-arrow'),
  BASE: goog.getCssName('jb-combo'),
  INPUT: goog.getCssName('jb-combo-input')
};

/**
 * @param {jb.ui.ComboBox} component
 * @return {Element}
 */
jb.ui.ComboBoxRenderer.prototype.createDom = function(component) {
  var template = new jb.ui.ComboboxTemplate({
    'caption': component.getCaption()
  });
  template.setBaseCssName(jb.ui.ComboBoxRenderer.CssClass.BASE);

  return ojster.createElement(template);
};

/**
 * @param {jb.ui.ComboBox} component
 * @return {Element}
 */
jb.ui.ComboBoxRenderer.prototype.getInputElement = function(component) {
  return goog.dom.getElementByClass(jb.ui.ComboBoxRenderer.CssClass.INPUT,
                                    component.getElement());
};

/**
 * @param {jb.ui.ComboBox} component
 * @returns {Element}
 */
jb.ui.ComboBoxRenderer.prototype.getArrowElement = function(component) {
  return goog.dom.getElementByClass(jb.ui.ComboBoxRenderer.CssClass.ARROW,
                                    component.getElement());
};
