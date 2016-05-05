/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "BrowserUtil";

	/**
	 * Browser Utility Functions
	 * 
	 * @class BrowserUtil
	 * @author arcsin
	 * @constructor 
	 */
	var constructor = function() {
		var that = {};

		// detecting browser type and version of the user
		that.detectUserBrowserTypeVersion = detectUserBrowserTypeVersion;

		/**
		 * Detecting browser type and version of the user
		 * @method detectUserBrowserTypeVersion
		 */
		function detectUserBrowserTypeVersion() {
			var bwVerStr = 0;

			if (isIE_()) {
				// IE
				bwVerStr = extractIEVerStr_();
				alert("IE : " + bwVerStr);
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.IE;
			}
			else if (isOpera_()) {
				// Opera
				bwVerStr = extractOperaVerStr_();
				alert("Opera : " + bwVerStr);
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.OPERA;
			}
			else if (isSafari_()) {
				// Safari
				bwVerStr = extractSafariVerStr_();
				alert("Safari : " + bwVerStr);
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.SAFARI;
			}
			else if (isChrome_()) {
				// Chrome
				bwVerStr = extractChromeVerStr_();
				alert("Chrome : " + bwVerStr);
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.GOOGLE_CHROME;
			}
			else if (isFirefox_()) {
				// FireFox
				bwVerStr = extractFireFoxVerStr_();
				alert("FireFox : " + bwVerStr);
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.FIRE_FOX;
			}
			else {
				// Other browser
				alert("Other");
				RGPP.System.UserInfo.BROWSER_TYPE = RGPP.Const.BROWSER_TYPE.OTHER;
			}

			RGPP.System.UserInfo.BROWSER_MAJOR_VERSION = parseInt(bwVerStr, 10);
			console.log("Browser Major version : " + RGPP.System.UserInfo.BROWSER_MAJOR_VERSION);
		}

		/**
		 * Whether user's browser is opera or not.
		 * @method isOpera_
		 * @return Whether user's browser is opera
		 * @private
		 */
		var isOpera_ = function() {
			// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
			var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			return isOpera;
		};

		/**
		 * Whether user's browser is firefox or not.
		 * @method isFirefox_
		 * @return Whether user's browser is firefox or not
		 * @private
		 */
		var isFirefox_ = function() {
			var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
			return isFirefox;
		};

		/**
		 * Whether user's browser is safari or not.
		 * @method isSafari_
		 * @return Whether user's browser is safari or not
		 * @private
		 */
		var isSafari_ = function() {
			// At least Safari 3+: "[object HTMLElementConstructor]"
			var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			return isSafari;
		};

		/**
		 * Whether user's browser is google chrome or not.
		 * @method isChrome_
		 * @return Whether user's browser is google chrome or not.
		 * @private
		 */
		var isChrome_ = function() {
			var isChrome = !!window.chrome && !isOpera_(); // Chrome 1+
			return isChrome;
		};

		/**
		 * Whether user's browser is Internet Explorer or not.
		 * @method isIE_
		 * @return Whether user's browser is Internet Explorer or not.
		 * @private
		 */
		var isIE_ = function() {
			var isIE = /*@cc_on!@*/ false || !!document.documentMode; // At least IE6
			return isIE;
		};

		/**
		 * Extract IE version from user agent.
		 * 
		 * @method extractIEVerStr_
		 * @return {String} IE version
		 * @private
		 */
		var extractIEVerStr_ = function() {
			// userAgent
			var nvUA = navigator.userAgent;

			// search "msie" or "MSIE" or "rv:"
			var bwVer = nvUA.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];

			return bwVer;
		};

		/**
		 * Extract FireFox version from user agent.
		 * 
		 * @method extractFireFoxVerStr_
		 * @return {String} FireFox version
		 * @private
		 */
		var extractFireFoxVerStr_ = function() {
			// userAgent
			var nvUA = navigator.userAgent;
			// search "FireFox"
			var cutSt = nvUA.indexOf("Firefox");
			// end of user agent
			var cutEd = nvUA.length;

			// cut off "Firefox"+"/"= 8 character
			var bwVer = nvUA.substring(cutSt + 8, cutEd);

			return bwVer;
		};

		/**
		 * Extract Opera version from user agent.
		 * 
		 * @method extractOperaVerStr_
		 * @return {String} Opera version
		 * @private
		 */
		var extractOperaVerStr_ = function() {
			// userAgent
			var nvUA = navigator.userAgent;
			// search "Version"
			var cutSt = nvUA.indexOf("Version");
			// end of user agent
			var cutEd = nvUA.length;

			//cut off "Version"+"/"= 8 character
			var bwVer = nvUA.substring(cutSt + 8, cutEd);

			return bwVer;
		};

		/**
		 * Extract Google chrome version from user agent.
		 * 
		 * @method extractChromeVerStr_
		 * @return {String} Google chrome version
		 * @private
		 */
		var extractChromeVerStr_ = function() {
			// userAgent
			var nvUA = navigator.userAgent;
			// search "Chrome"
			var cutSt = nvUA.indexOf("Chrome");
			// search " "
			var cutEd = nvUA.indexOf(" ", cutSt);

			// cut off "Chrome/"= 7 character
			var bwVer = nvUA.substring(cutSt + 7, cutEd);

			return bwVer;
		};

		/**
		 * Extract Safari version from user agent.
		 * 
		 * @method extractSafariVerStr_
		 * @return {String} Safari version
		 * @private
		 */
		var extractSafariVerStr_ = function() {
			// userAgent
			var nvUA = navigator.userAgent;
			// search "Version"
			var cutSt = nvUA.indexOf("Version");
			// search " "
			var cutEd = nvUA.indexOf(" ", cutSt);

			// cut off "Version/"= 8 character
			var bwVer = nvUA.substring(cutSt + 8, cutEd);

			return bwVer;
		};

		return that;
	};
	
	RGPP.System.exportsAsSingleton({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);
