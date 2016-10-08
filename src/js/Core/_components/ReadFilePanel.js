/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
    /* global RGPP */
    "use strict";
    var objName = "ReadFilePanel";

    /**
     * Panel of Reading File
     * @class ReadFilePanel
     * @author arcsin
     * @constructor
     */
    var constructor = function() {

        //private parameter
        var BORDER_SIZE = 5;

        var mReader = null;
        var mInputElement = null;
        var mDiv = document.createElement("div");

        var that = {};

        that.div = div;
        that.data = data;
        that.allData = allData;
        that.dataClear = dataClear;

        function initialize() {
            if (window.File) {
                var cssStyle = RGPP.System.CssStyle.getInstance();
                cssStyle.setRelativeCenterPosition(mDiv);
                cssStyle.centeringText(mDiv);

                var textDiv = document.createElement("div");
                $(textDiv).append("Please Drag and Drop file!");
                textDiv.id = "readfile_zone";
                $(mDiv).append(textDiv);
                cssStyle.setRelativeCenterPosition(textDiv);

                mDiv.addEventListener("drop", onDrop, false);
                mDiv.addEventListener("dragover", onCancel, false);
                mDiv.addEventListener("dragenter", onCancel, false);

                // Input readButton
                mInputElement = document.createElement("input");
                mInputElement.type = "file";
                $(mDiv).append(mInputElement);
                mInputElement.addEventListener("change", onChangeFile, false);
                cssStyle.setRelativeCenterPosition(mInputElement);
            }
            else {
                var scriptUtil = RGPP.System.ScriptUtil.getInstance();

                scriptUtil.outputErrMsgToConsole("Cannot Use File API on this Browser.");
            }
        }

        function div() {
            return mDiv;
        }

        //public method
        function data(index) {
            if (mReader == null) {
                return null;
            }
            if (index >= mReader.length) {
                return null;
            }
            return mReader[index].result;
        }

        function allData() {
            //effects: combine text file and return it.
            if (mReader == null) {
                return null;
            }
            var res = [];
            for (var i = 0; i < mReader.length; ++i) {
                res.push(mReader[i].result);
            }
            return res;
        }


        function dataClear() {
            mReader = null;
        }

        //private method
        function readFile(files) {
            try {

                alert("Read File as Binary String");
                var fileNum = files.length;
                //initialize array list
                mReader = [];
                var url = null;

                for (var i = 0; i < fileNum; ++i) {
                    var f = files[i];
                    //output text type.

                    var scriptUtil = RGPP.System.ScriptUtil.getInstance();
                    scriptUtil.outputMsgToConsole(f.type);

                    var reader = new FileReader();
                    //Add Error function
                    reader.onerror = function(evt) {
                        alert("File read Error");
                    };

                    //Register load file
                    reader.onload = function(evt) {
                        //register array list
                        mReader.push(reader);
                        alert("complete read!!");
                    };

                    if (f.type.match('text.*')) {
                        //Text file
                        alert("This file is Text file.");
                        reader.readAsText(f, "utf-8");
                    }
                    else if (f.type.match('image.*')) {
                        //Image file
                        alert("This file is Image file.");
                        url = URL.createObjectURL(f);
                        var img = $("<img>");
                        img.attr("src", url);
                        $(mDiv).append(img);
                    }
                    else if (f.type.match('video.*')) {
                        //Video file
                        alert("This file is Video file.");
                        url = URL.createObjectURL(f);
                        var video = $("<video>");
                        video.attr("src", url);
                        video.attr("controls", "controls");
                        $(mDiv).append(video);
                    }
                    else if (f.type.match('audio.*')) {
                        //Audio file
                        alert("This file is Audio file.");
                        url = URL.createObjectURL(f);
                        var audio = $("<audio>");
                        audio.attr("src", url);
                        audio.attr("controls", "controls");
                        $(mDiv).append(audio);
                    }
                    else {
                        // Binary
                        alert("This file is Binary file.");
                        reader.readAsText(f, "utf-8");
                    }
                }
            }
            catch (e) {
                alert(e.message);
            }

        }

        //get Data From Drag & Drop
        function onDrop(event) {
            alert("Now Dropping!!");
            // cancel event
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.dataTransfer.files) {
                var files = event.dataTransfer.files;
                readFile(files);
            }
        }

        function onCancel(event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
        }

        //get Data From upload Text box
        function onChangeFile(event) {
            var files = event.target.files;
            readFile(files);
        }

        initialize();

        return that;
    };


    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);