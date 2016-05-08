(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "CheckBox";

    var constructor = function(spec) {
        var that = {};

        that.div = div;
        that.setClickFunction = setClickFunction;
        that.enableCheckBox = enableCheckBox;
        that.disableCheckBox = disableCheckBox;
        that.setValue = setValue;
        that.value = value;

        var mDiv = null;
        var mLabel = null;
        var mCheckBox = null;
        var mUpdateFunc = null;

        var mIsChecked = false;

        mDiv = document.createElement("div");
        mDiv.id = spec.idName;
        mCheckBox = $("<input type='checkbox'>");
        if (spec.labelName !== undefined) {
            mLabel = $("<label>");
            mLabel.addClass("checkbox");
            $(mLabel).append(spec.labelName);
            $(mLabel).append(mCheckBox);
        }

        $(mDiv).append(mLabel);

        var cssStyle = RGPP.System.CssStyle.getInstance();
        cssStyle.setPadding(mDiv, 10, 10, 10, 10);
        cssStyle.setNonBreaking(mDiv);

        function div() {
            if (spec.labelName === undefined) {
                return mCheckBox;
            }
            return mDiv;
        }

        function setClickFunction(updateFunc) {
            mUpdateFunc = updateFunc;
            $(mCheckBox).click(function() {
                mIsChecked = this.checked;
                if (mUpdateFunc) {
                    mUpdateFunc(mIsChecked);
                }
                var scriptUtil = RGPP.System.ScriptUtil.getInstance();
                scriptUtil.outputMsgToConsole(mIsChecked);
            });
        }

        function enableCheckBox() {
            mIsChecked = true;
            $(mCheckBox).prop("checked", true);
        }

        function disableCheckBox() {
            mIsChecked = false;
            $(mCheckBox).prop("checked", false);
        }

        function setValue(value) {
            if (value) {
                enableCheckBox();
            }
            else {
                disableCheckBox();
            }
        }

        function value() {
            return mIsChecked;
        }

        return that;
    };
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);