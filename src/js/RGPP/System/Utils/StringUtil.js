/**
 * System module
 * @module System
 * @namespace RGPP.System
 */

/**
 * String Utility Functions
 *
 * @class StringUtil
 * @author arcsin
 * @constructor
 */

/**
 * Whether the string is empty string
 *
 * @method isEmptyString
 * @param str check string
 * @return {Boolean} whether the string is empty string
 */
export const isEmptyString = (str) => {
  if (str === '') {
    return true
  }
  return false
}

/**
 * Substitute replacement string for search string
 *
 * @method substitute
 * @param {string} originalStr original string
 * @param {string} searchStr seach string
 * @param {string} replacementStr replacement string
 * @return {string} string after substitution
 */
export const substitute = (originalStr, searchStr, replacementStr) =>
    originalStr.split(searchStr).join(replacementStr)

/**
 * Extract file name except for extension
 * @method extractFileNameExceptForExtension
 * @param {string} fileName file name
 * @return {string] file name except for extension
 */
export const extractFileNameExceptForExtension = (fileName) => {
  const separator = '.'
  const arrayOfStrings = fileName.split(separator)
  let baseFileName = arrayOfStrings[0]
  for (let i = 1; i < arrayOfStrings.length - 1; i += 1) {
    baseFileName += '.'
    baseFileName += arrayOfStrings[i]
  }
  return baseFileName
}

/**
 * Extract extension from file name
 * @method extractExtension
 * @param {string} fileName file name
 * @return {string] extension
 */
export const extractExtension = (fileName) => {
  const separator = '.'
  const arrayOfStrings = fileName.split(separator)
  const lastIndex = arrayOfStrings.length - 1
  if (lastIndex === 0) {
    return ''
  }
  const extension = arrayOfStrings[lastIndex]
  return extension
}

export default {
  isEmptyString,
  substitute,
  extractFileNameExceptForExtension,
  extractExtension
}
