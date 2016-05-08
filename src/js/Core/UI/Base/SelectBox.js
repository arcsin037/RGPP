import {
    TypeUtil
} from 'Util'
import UIBase from './UIBase'

/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
/**
 * Select Box
 *
 * @class SelectBox
 * @author arcsin
 * @constructor
 * @param spec
 * @param spec.element {jQuery} jQuery element to select box
 * @param spec.updateFunc {Function} change function of select box
 * @param jquery {$} Global object of jQuery
 */
export default class SelectBox extends UIBase {
    constructor(spec = {}, $) {
        spec.key = spec.key || '<select>'
        const mUpdateFunc = spec.updateFunc
        super(spec, $)


        // selected index of select box
        this.selectedIndex = 0

        // msDropDown
        const mHandler = this.element.msDropDown && this.element.msDropDown({
            on: {
                change: updateFunc_
            }
        }).data('dd')


        /**
         * Get selected value of select box
         *
         * @method selectedValue
         * @return {String} selected value
         */
        this.selectedValue = () => mHandler.getData().data.value

        /**
         * Function to be called when the selected value is changed
         * @method updateFunc_
         * @private
         */
        const updateFunc_ = () => {
            this.selectedIndex = mHandler.selectedIndex
            if (TypeUtil.isDefined(mUpdateFunc)) {
                mUpdateFunc(this.selectedIndex)
            }
        }
    }
}
