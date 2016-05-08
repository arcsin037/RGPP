(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "ChangeableValue";

    // Class
    var constructor = function(spec) {
        var that = {};
        var mTrElement = $("<tr>");
        var mNameLabel = $("<label>");
        spec.spinner = (spec.spinner === undefined) ? true : spec.spinner;

        var mMinValue = (spec.minValue === undefined) ? -10000000000 : spec.minValue;
        var mMaxValue = (spec.maxValue === undefined) ? 10000000000 : spec.maxValue;
        var mDefaultValue = spec.defaultValue || 0;
        var mStepValue = spec.stepValue || 1;
        var mBaseName = spec.name || "variable name";
        var mValueName = mBaseName;
        var mValue = mDefaultValue;

        var mVariousInput = RGPP.System.VariousInput({
            type: spec.type,
        });

        var tdElementName = $("<td>");
        tdElementName.append(mNameLabel);
        var tdElementValue = $("<td>");
        tdElementValue.append(mVariousInput.element());

        mTrElement.append(tdElementName);
        mTrElement.append(tdElementValue);

        // Interface
        that.trElement = trElement;
        that.value = getValue;
        that.saveValue = saveValue;
        that.setValue = setValue;

        that.initialize = initialize;
        that.name = getName;
        that.baseName = baseName;
        that.setName = setName;

        function initialize() {
            mVariousInput.initialize({
                minValue: mMinValue,
                maxValue: mMaxValue,
                initValue: mValue,
                stepValue: mStepValue,
                format: "n",
            });
        }

        function setValue(value) {
            mValue = value;
            var spinnerValue = mVariousInput.value();
            if (spinnerValue !== null) {
                mVariousInput.setValue(mValue);
            }
        }

        function saveValue() {
            var value = mVariousInput.value();
            if (value !== null) {
                mValue = value;
            }
            mVariousInput.setValue(mValue);
        }

        function getValue() {
            var value = mVariousInput.value();
            if (value === null) {
                return mValue;
            }
            return mVariousInput.value();
        }

        function trElement() {
            $(mNameLabel).empty();
            $(mNameLabel).append(mValueName);
            return mTrElement;
        }

        function getName() {
            return mValueName;
        }

        function baseName() {
            return mBaseName;
        }

        function setName(name) {
            mValueName = name;
        }

        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);