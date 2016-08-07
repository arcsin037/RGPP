import React, {PropTypes} from 'react'
import {addTodo} from 'Core/actions'
import {connect} from 'react-redux'

let AddTodo = ({dispatch}) => {
    let input

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodo(input.value))
                input.value = ''
            }}>
                <input ref={(node) => {
                    input = node
                }}/>
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}
AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired
}
AddTodo = connect()(AddTodo)

export default AddTodo
