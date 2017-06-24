/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function (global) {
    /* global RGPP */
  'use strict'
  var objName = 'ImageFilterInstance'
    /**
     * Image Filter Instance
     * @class ImageFilterInstance
     * @author arcsin
     * @constructor
     */
  var constructor = function () {
    var that = {}

    var mFilter = null

    that.filter = filter
    that.setFilter = setFilter
    that.resetFilter = resetFilter

    function setFilter (filter) {
      mFilter = filter
    }

    function resetFilter () {
      mFilter = null
    }

    function filter (ctx) {
      if (mFilter !== null) {
        mFilter.filter(ctx)
      }
    }

    return that
  }

  RGPP.System.exportsAsSingleton({
    name: objName,
    constructorFunc: constructor,
    module: module
  })
})((this || 0).self || global)
