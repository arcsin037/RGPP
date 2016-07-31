import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import styles from './Canvas.scss'
class Canvas extends Component {
    componentDidMount() {
        const canvas = findDOMNode(this.refs.canvas)
        const ctx = canvas.getContext('2d')
        this.props.getCanvasInfo(ctx)
    }

    render() {
        const {
            width,
            height,
            onKeyDown = () => {},
            onKeyUp = () => {}
        } = this.props
        
        return (
            <canvas
                ref='canvas'
                className={styles.Canvas}
                width={`${width}px`}
                height={`${height}px`}
                tabIndex='0'
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
            />
        )
    }
}

Canvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    getCanvasInfo: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
}

export default Canvas
