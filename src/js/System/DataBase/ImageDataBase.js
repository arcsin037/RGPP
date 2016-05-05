/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "ImageDataBase";
    /**
     * Image Data Base
     * @class ImageDataBase 
     * @author arcsin
     * @constructor
     */
    var constructor = function() {
        var ATTR_NUM = 2;

        var NAME_INDEX = 0;
        var DESCRIPTION_INDEX = 1;

        var that = RGPP.System.DataBase({
            dbName: "ImageDB",
            attrSize: ATTR_NUM,
        });

        var initialize = function() {
            var attrStringArray = [ATTR_NUM];
            attrStringArray[NAME_INDEX] = "Image File Name ";
            attrStringArray[DESCRIPTION_INDEX] = "Description";

            that.setAttrString(attrStringArray);

            var defaultAttrValueArray = [ATTR_NUM];
            defaultAttrValueArray[NAME_INDEX] = "Image";
            defaultAttrValueArray[DESCRIPTION_INDEX] = "Description";

            that.setDefaultAttrValue(defaultAttrValueArray);

            var correctedAttrValueArray = [ATTR_NUM];

            correctedAttrValueArray[NAME_INDEX] = "Image";
            correctedAttrValueArray[DESCRIPTION_INDEX] = "Description";
            that.setCorrectedAttrValue(correctedAttrValueArray);
            that.load();
        };

        initialize();

        return that;
    };
    RGPP.System.exportsAsSingleton({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);