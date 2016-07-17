import React, {PropTypes} from 'react'
import styles from './SelectBox.scss'
/**
 * Select Box
 *
 * @class SelectBox
 * @author arcsin
 * @constructor
 * @param spec
 * @param spec.element {jQuery} jQuery element to select box
 * @param spec.updateFunc {Function} change function of select box
 * @param jquery {$} Global object of jQuery
 */

export const SelectBox = (props) => {
    const options = props.options.map((option) => (
        <option key={option.value} value={option.value} selected={option.selected}>{option.name}</option>
    ))
    return (
        <select className={styles.SelectBox} defaultValue={props.defaultValue}>
            {options}
        </select>
    )
}

SelectBox.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ),
    defaultValue: PropTypes.string
}

export default SelectBox
