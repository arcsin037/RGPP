/**
 * Whether a reference is defined or not.
 * @method isDefined
 * @param {*} value Reference to check
 * @return {boolean} Whether a reference is defined or not.
 */
export const isDefined = (value) => {
  if (typeof value === 'undefined') {
    return false
  }
  return true
}

/**
 * Whether a reference is undefined or not.
 * @method isUndefined
 * @param {*} value Reference to check
 * @return {boolean} Whether a reference is undefined or not.
 */
export const isUndefined = (value) => !isDefined(value)

/**
 * Whether a reference is string or not.
 * @method isString
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is string or not.
 */
export const isString = (value) => {
  if (typeof value === 'string') {
    return true
  }
  return false
}

/**
 * Whether a reference is integer type or not.
 * @method isIntegerType
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is integer type or not.
 */
export const isIntegerType = (value) => {
  if (value === parseInt(value, 10)) {
    return true
  }
  return false
}

/**
 * Whether a reference is finite number or not.
 * @method isFiniteNumber
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is finite number or not.
 */
export const isFiniteNumber = (value) => {
  if (typeof (value) !== 'number' && typeof (value) !== 'string') {
    return false
  } else {
    return (value === parseFloat(value) && isFinite(value))
  }
}

/**
 * Whether a reference is numeric or not.
 * @method isNumeric
 * @param {*} value Reference to check
 * @return {Boolean} Whether a reference is numeric or not. <br/>
 *
 * (e.g. 0, 0.0, -1, '-1.5', '30.0', '20.80', -20.85, .42, 0x89f, '0x89f', 8e5)
 */
export const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value)

export default {
  isDefined,
  isUndefined,
  isString,
  isIntegerType,
  isFiniteNumber,
  isNumeric
}
