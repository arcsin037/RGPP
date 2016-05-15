import React, {PropTypes} from 'react'

/**
  * Button UI
  * @class Button
  * @author arcsin
  * @constructor
  */

export const Button = (props) => (
    <button>{props.innerElement}</button>
)

Button.propTypes = {
    innerElement: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.string
    ])
}

export default Button
