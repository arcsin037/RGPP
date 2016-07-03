import React, {PropTypes} from 'react'
import styles from './Button.scss'

/**
  * Button UI
  * @class Button
  * @author arcsin
  * @constructor
  */

export const Button = (props) => (
    <button className={styles.Button} title={props.title}>
        {props.innerElement}
    </button>
)

Button.propTypes = {
    innerElement: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.string]),
    title: PropTypes.string.isRequired
}

export default Button
