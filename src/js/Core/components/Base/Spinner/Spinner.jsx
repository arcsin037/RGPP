// import {
//     TypeUtil
// } from 'Util'
// /*
// import UIBase from './UIBase'
// */
// /**
//  * System module
//  * @module System
//  * @namespace RGPP.System
//  */
// /**
//  * Spinner
//  *
//  * @class Spinner
//  * @author arcsin
//  * @constructor
//  * @param spec
//  * @param spec.element {jQuery} jQuery element to select box
//  * @param jquery {$} Global object of jQuery
//  */
//
// export default class Spinner extends UIBase {
//     constructor(spec = {}, $) {
//         spec.key = spec.key || '<input>'
//         super(spec, $)
//         let mInitFlag = false
//
//         /**
//          * Set up spinner
//          *
//          * @method setUp
//          * @param param {Object} parameter of spinner
//          * @param param.minValue {Number} minimum value of spinner
//          * @param param.maxValue {Number} maximum value of spinner
//          * @param param.defaultValue {Number} default value of spinner
//          * @param param.stepValue {Number} step value of spinner
//          * @param param.format {String}
//          * * 'n': normal number
//          * * 'C': currency
//          */
//         this.setUp = (param) => {
//             this.element.spinner({
//                 min: param.minValue,
//                 max: param.maxValue,
//                 step: param.stepValue,
//                 numberFormat: param.format
//             })
//
//             mInitFlag = true
//
//             this.setValue(param.defaultValue)
//         }
//
//         /**
//          * Set value of spinner
//          *
//          * @method setValue
//          * @param value {Number} Number to be set in the spinner <br />
//          * If setUp function of this object is not called, ignore this function.
//          */
//         this.setValue = (value) => {
//             if (mInitFlag && TypeUtil.isFiniteNumber(value)) {
//                 this.element.spinner('value', value)
//             }
//         }
//
//         /**
//          * Get value of spinner
//          *
//          * @method getValue
//          * @return {Number | undefined} Value of spinner <br />
//          * If setUp function of this object is not called, return undefined.
//          */
//         this.getValue = () => {
//             if (mInitFlag) {
//                 return this.element.spinner('value')
//             }
//         }
//     }
// }
