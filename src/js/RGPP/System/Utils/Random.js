/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
import TypeUtil from './TypeUtil'

/**
 * Create random float value.
 * @method createRandFloat
 * @param arg {Object}
 * @param arg.from {Number} Minimum (or maximum) value of random value
 * @param arg.to {Number} Maximum (or minimum) value of random value
 * @return {Number} Float value from &ltarg.from&gt to &ltarg.to&gt
 */
export const createRandFloat = (arg) => {
    const from = arg.from
    const to = arg.to

    if (TypeUtil.isUndefined(from)) {
        //create random real number from 0 to 'to'
        return Math.random() * to
    } else {
        //create random real number from 'from' to 'to'
        return Math.random() * (to - from) + from
    }
}

/**
 * Create random integer value.
 * @method createRandInt
 * @param arg {Object}
 * @param arg.from {Number} Minimum (or maximum) value of random value
 * @param arg.to {Number} Maximum (or minimum) value of random value
 * @return {Number} Integer value from &ltarg.from&gt to &ltarg.to&gt
 */
export const createRandInt = (arg) => {
    if (TypeUtil.isUndefined(arg.from)) {
        arg.from = 0
    }
    arg.from = parseInt(arg.from, 10)
    arg.to = parseInt(arg.to, 10)

    return Math.round(createRandFloat(arg))
}

/**
 * Create -1 or 1
 * @method createRandSign
 * @return {Number} Random value which is -1 or 1.
 */
export const createRandSign = () => createRandInt({
    to: 1
}) * 2 - 1

export default {
    createRandFloat,
    createRandInt,
    createRandSign
}
