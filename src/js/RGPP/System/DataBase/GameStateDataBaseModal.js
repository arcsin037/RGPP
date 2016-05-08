/**
 * Game State Data Base Modal
 * 
 * @class GameStateDataBaseModal
 */
(function(global) {
    /* global RGPP */
    "use strict";
        var objName = "GameStateDataBaseModal";

    var constructor = function(spec) {
        var mDB = RGPP.System.GameStateDataBase.getInstance();
        var that = RGPP.System.DBModal({
            dbName: "Game State",
            db: mDB,
            updateFunc: spec.updateFunc,
        });

        return that;
    };
    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);