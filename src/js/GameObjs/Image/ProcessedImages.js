(function(global) {
	/* global RGPP */
	"use strict";
	    var objName = "ProcessedImages";

    var constructor = function(spec) {
        var that;

        that = {};

        var mProcessedImages = [];
        mProcessedImages[0] = [];
        mProcessedImages[0][0] = [];
        mProcessedImages[0][0][0] = [];

        that.image = image;
        that.setImage = setImage;
        that.setImageSrc = setImageSrc;

        function image(r, g, b, a) {
            if (mProcessedImages[r] === undefined) {
                return null;
            }

            if (mProcessedImages[r][g] === undefined) {
                return null;
            }

            if (mProcessedImages[r][g][b] === undefined) {
                return null;
            }

            if (mProcessedImages[r][g][b][a] === undefined) {
                return null;
            }

            return mProcessedImages[r][g][b][a];
        }

        function setImageSrc(r, g, b, a, src) {
            if (mProcessedImages[r] === undefined) {
                mProcessedImages[r] = [];
            }

            if (mProcessedImages[r][g] === undefined) {
                mProcessedImages[r][g] = [];
            }

            if (mProcessedImages[r][g][b] === undefined) {
                mProcessedImages[r][g][b] = [];
            }

            if (mProcessedImages[r][g][b][a] === undefined) {
                var img = new Image();
                // input 'src' after 'onload'
                img.src = src;
                mProcessedImages[r][g][b][a] = img;
            }
        }


        function setImage(r, g, b, a, img) {
            if (mProcessedImages[r] === undefined) {
                mProcessedImages[r] = [];
            }

            if (mProcessedImages[r][g] === undefined) {
                mProcessedImages[r][g] = [];
            }

            if (mProcessedImages[r][g][b] === undefined) {
                mProcessedImages[r][g][b] = [];
            }

            if (mProcessedImages[r][g][b][a] === undefined) {
                mProcessedImages[r][g][b][a] = img;
            }

        }

        return that;
    };


    RGPP.System.exports({
        name: objName,
        constructorFunc: constructor,
        module: module
    });

})((this || 0).self || global);
