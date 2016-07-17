import React, {Component, PropTypes} from 'react'
import Canvas from 'Core/Components/Base/Canvas'
import styles from './ControllableCanvas.scss'

class ControllableCanvas extends Component {
    getMousePosition(e) {
        let mouseX
        let mouseY
        if (e) {
            const rect = e.target.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
        } else {
            mouseX = event.offsetX
            mouseY = event.offsetY
        }

        return {mouseX, mouseY}
    }

    componentWillMmount() {
        this.setState({ctx: null, mouseX: 0, mouseY: 0})
    }

    render() {
        this.props.getCanvasInfo(this.state)
        return (
            <div
                className={styles.ControllableCanvas}
                onMouseMove={(e) => {
                    this.setState(this.getMousePosition(e))
                }}
            >
                <Canvas
                    {...this.props}
                    getCanvasInfo={(ctx) => this.setState({ctx})}
                 />
            </div>
        )
    }
}

ControllableCanvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    getCanvasInfo: PropTypes.func.isRequired
}

export default ControllableCanvas
