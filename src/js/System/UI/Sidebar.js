(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "Sidebar";

    var constructor = function(spec) {
        var that = {};

        var mSidebarObj = spec.sidebarObj;
        var mAlignString = "left";
        var mOpenerString = "";
        var mWrapperString = "";
        var mMaskName = "";

        that.setParameter = setParameter;

        function setParameter(alignString, openerString, wrapperString, maskName) {
            mAlignString = alignString;
            mOpenerString = openerString;
            mWrapperString = wrapperString;
            mMaskName = maskName;

            $(mSidebarObj).simpleSidebar({
                settings: {
                    opener: mOpenerString, //STRING
                    wrapper: mWrapperString, //STRING
                    maskName: mMaskName,
                },
                sidebar: {
                    align: mAlignString, //STRING
                },
            });
        }

        return that;
    };

    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);