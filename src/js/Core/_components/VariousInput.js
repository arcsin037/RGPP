/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
    var objName = "VariousInput";

    /**
     * Various Input
     * @class VariousInput
     * @author arcsin
     * @constructor
     * @param spec {Object}
     * @param spec.type {String} type of input
     * 
     */
    var constructor = function(spec) {
        spec = spec || {};

        var that = {},
            $mInput = null,
            mInitFlag = false,

            SPINNER_STRING = "spinner",
            CHECKBOX_STRING = "checkBox",
            SELECT_MENU_STRING = "selectMenu",
            DATE_STRING = "date",
            OTHER_STRING = "other";


        spec.type = spec.type || OTHER_STRING;

        switch (spec.type) {
            case SPINNER_STRING:
                $mInput = RGPP.System.Spinner();
                break;
            case CHECKBOX_STRING:
                $mInput = RGPP.System.CheckBox({
                    idName: spec.idName,
                    labelName: spec.labelName,
                });
                $mInput.setClickFunction();
                break;
            case SELECT_MENU_STRING:
                $mInput = RGPP.System.UIBase({
                    key: "<select>"
                });
                break;
            case DATE_STRING:
                $mInput = RGPP.System.CalendarInput();
                break;
            default:
                $mInput = RGPP.System.UIBase({
                    key: "<input>"
                });
                spec.type = OTHER_STRING;
        }


        that.initialize = initialize;
        that.value = getValue;
        that.setValue = setValue;
        that.element = element;

        function initialize(arg) {
            if (spec.type === SPINNER_STRING) {
                $mInput.setUp(arg);
            }
            else if (spec.type === SELECT_MENU_STRING) {
                $mInput.empty();
                var elementSize = arg.elements.length;
                for (var i = 0; i < elementSize; i += 1) {
                    var option = document.createElement("option");
                    $(option).append(arg.elements[i]);
                    $(option).attr("value", arg.elements[i]);
                    $mInput.append(option);
                }
                $mInput.selectedIndex = arg.initValue;
            }
            else {
                setValue(arg.initValue);
            }
            mInitFlag = true;
        }

        /**
         * 
         * @method getValue
         */
        function getValue() {
            if (mInitFlag) {
                if (spec.type === SELECT_MENU_STRING) {
                    return $mInput.selectedIndex;
                }
                else if (spec.type !== OTHER_STRING) {
                    return $mInput.getValue();
                }
                return $($mInput).val();
            }
            else {
                return null;
            }
        }

        function setValue(value) {
            if (spec.type !== OTHER_STRING) {
                return $mInput.setValue(value);
            }
            return $($mInput).attr("value", value);
        }

        function element() {
            if (spec.type === SPINNER_STRING) {
                return $mInput.element();
            }
            else if (spec.type === CHECKBOX_STRING || spec.type === DATE_STRING) {
                return $mInput.div();
            }
            return $mInput;
        }

        return that;
    };
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);