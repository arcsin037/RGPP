import Const from 'Core/Const/Const.json'

/**
 * Browser Utility Functions
 *
 * @module BrowserUtil
 * @author arcsin
 * @constructor
 */

/**
 * Whether user's browser is opera or not.
 * @method isOpera_
 * @return Whether user's browser is opera
 * @private
 */
const isOpera_ = () => {
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    const isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
    return isOpera
}

/**
 * Whether user's browser is firefox or not.
 * @method isFirefox_
 * @return Whether user's browser is firefox or not
 * @private
 */
const isFirefox_ = () => {
    const isFirefox = typeof InstallTrigger !== 'undefined' // Firefox 1.0+
    return isFirefox
}

/**
 * Whether user's browser is safari or not.
 * @method isSafari_
 * @return Whether user's browser is safari or not
 * @private
 */
const isSafari_ = () => {
    // At least Safari 3+: '[object HTMLElementConstructor]'
    // const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
    const isSafari = Reflect.apply(Object.prototype.toString, window.HTMLElement, []).indexOf('Constructor') > 0
    return isSafari
}

/**
 * Whether user's browser is google chrome or not.
 * @method isChrome_
 * @return Whether user's browser is google chrome or not.
 * @private
 */
const isChrome_ = () => {
    const isChrome = !!window.chrome && !isOpera_() // Chrome 1+
    return isChrome
}

/**
 * Whether user's browser is Internet Explorer or not.
 * @method isIE_
 * @return Whether user's browser is Internet Explorer or not.
 * @private
 */
const isIE_ = () => {
    const isIE = /*@cc_on!@*/ false || !!document.documentMode // At least IE6
    return isIE
}

/**
 * Extract IE version from user agent.
 *
 * @method extractIEVerStr_
 * @return {String} IE version
 * @private
 */
const extractIEVerStr_ = () => {
    // userAgent
    const nvUA = navigator.userAgent

    // search 'msie' or 'MSIE' or 'rv:'
    const bwVer = nvUA.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3]

    return bwVer
}

/**
 * Extract FireFox version from user agent.
 *
 * @method extractFireFoxVerStr_
 * @return {String} FireFox version
 * @private
 */
const extractFireFoxVerStr_ = () => {
    // userAgent
    const nvUA = navigator.userAgent
        // search 'FireFox'
    const cutSt = nvUA.indexOf('Firefox')
        // end of user agent
    const cutEd = nvUA.length

    // cut off 'Firefox'+'/'= 8 character
    const bwVer = nvUA.substring(cutSt + 8, cutEd)

    return bwVer
}

/**
 * Extract Opera version from user agent.
 *
 * @method extractOperaVerStr_
 * @return {String} Opera version
 * @private
 */
const extractOperaVerStr_ = () => {
    // userAgent
    const nvUA = navigator.userAgent
        // search 'Version'
    const cutSt = nvUA.indexOf('Version')
        // end of user agent
    const cutEd = nvUA.length

    //cut off 'Version'+'/'= 8 character
    const bwVer = nvUA.substring(cutSt + 8, cutEd)

    return bwVer
}

/**
 * Extract Google chrome version from user agent.
 *
 * @method extractChromeVerStr_
 * @return {String} Google chrome version
 * @private
 */
const extractChromeVerStr_ = () => {
    // userAgent
    const nvUA = navigator.userAgent
        // search 'Chrome'
    const cutSt = nvUA.indexOf('Chrome')
        // search ' '
    const cutEd = nvUA.indexOf(' ', cutSt)

    // cut off 'Chrome/'= 7 character
    const bwVer = nvUA.substring(cutSt + 7, cutEd)

    return bwVer
}

/**
 * Extract Safari version from user agent.
 *
 * @method extractSafariVerStr_
 * @return {String} Safari version
 * @private
 */
const extractSafariVerStr_ = () => {
    // userAgent
    const nvUA = navigator.userAgent
        // search 'Version'
    const cutSt = nvUA.indexOf('Version')
        // search ' '
    const cutEd = nvUA.indexOf(' ', cutSt)

    // cut off 'Version/'= 8 character
    const bwVer = nvUA.substring(cutSt + 8, cutEd)

    return bwVer
}

/**
 * Detecting browser type and version of the user
 * @method getUserBrowserTypeVersion
 * @return {Object} browser version & type
 */
export const getUserBrowserTypeVersion = () => {
    let bwVerStr = 0
    let bwType = null

    if (isIE_()) {
        // IE
        bwVerStr = extractIEVerStr_()
        bwType = Const.BROWSER_TYPE.IE
    } else if (isOpera_()) {
        // Opera
        bwVerStr = extractOperaVerStr_()
        bwType = Const.BROWSER_TYPE.OPERA
    } else if (isSafari_()) {
        // Safari
        bwVerStr = extractSafariVerStr_()
        bwType = Const.BROWSER_TYPE.SAFARI
    } else if (isChrome_()) {
        // Chrome
        bwVerStr = extractChromeVerStr_()
        bwType = Const.BROWSER_TYPE.GOOGLE_CHROME
    } else if (isFirefox_()) {
        // FireFox
        bwVerStr = extractFireFoxVerStr_()
        bwType = Const.BROWSER_TYPE.FIRE_FOX
    } else {
        // Other browser
        bwType = Const.BROWSER_TYPE.OTHER
    }

    const bwVer = parseInt(bwVerStr, 10)
    return {
        Type: bwType,
        Version: bwVer
    }
}

export default {
    getUserBrowserTypeVersion
}
