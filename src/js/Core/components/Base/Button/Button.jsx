import React, {PropTypes} from 'react'
import styles from './Button.scss'

/**
  * Button UI
  * @class Button
  * @author arcsin
  * @constructor
  */

export const Button = (props) => (
    <button className={styles.Button} title={props.title} onClick={props.onClick}>
        {props.children}
    </button>
)

Button.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button
