/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/**
 * Base of UI
 *
 * @class UIBase
 * @author arcsin
 * @constructor
 * @param {Object} spec
 * @param spec.key {String} jQuery key of DOM object
 * @param spec.$element {jQuery} jQuery element
 * @param jquery {$} Global object of jQuery
 */

export default class UIBase {
    constructor(spec = {}, $) {
        this.element = spec.$element || (spec.key && $(spec.key))
    }
}
