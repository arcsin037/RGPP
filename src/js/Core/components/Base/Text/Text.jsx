import React, {PropTypes} from 'react'
import {SIZE_STRING} from 'Core/components/definition'
import classNames from 'classnames'
import styles from './Text.scss'

/**
  * Text UI
  * @class Text
  * @author arcsin
  * @constructor
  */

const sizeStyleArray = []
sizeStyleArray[SIZE_STRING.xxsmall] = styles.is_xxsmall
sizeStyleArray[SIZE_STRING.xsmall] = styles.is_xsmall
sizeStyleArray[SIZE_STRING.small] = styles.is_small
sizeStyleArray[SIZE_STRING.medium] = styles.is_medium
sizeStyleArray[SIZE_STRING.large] = styles.is_large
sizeStyleArray[SIZE_STRING.xlarge] = styles.is_xlarge
sizeStyleArray[SIZE_STRING.xxlarge] = styles.is_xxlarge

export const Text = (props) => {
    const {
        size = 'medium',
        text
    } = props

    return (
        <span className={classNames(styles.Text, sizeStyleArray[size])}>
            {text}
        </span>
    )
}

Text.propTypes = {
    size: PropTypes.string,
    text: PropTypes.string.isRequired
}

export default Text
