import React, {Component, PropTypes} from 'react'
import Canvas from 'Core/Components/Base/Canvas'
import KeyBoard from 'Core/Input/KeyBoard'
import Mouse from 'Core/Input/Mouse'
import Pad from 'Core/Input/Pad'

import styles from './ControllableCanvas.scss'

class ControllableCanvas extends Component {
    constructor(props) {
        super(props)
        this.ctx = null
        this.keyboard = new KeyBoard()
        this.mouse = new Mouse()
        this.pad = new Pad(this.keyboard)

        this.getCanvasInfo = this.getCanvasInfo.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onDoubleClick = this.onDoubleClick.bind(this)
    }

    componentWillMount() {
        this.updateState()
    }

    componentDidMount() {
        this.updateState()
    }

    componentDidUpdate(nextProps, nextState) {
        nextProps.onEvent(nextState)
    }

    updateState() {
        const nextState = {
            ctx: this.ctx,
            mouseInfo: this.mouse.mouseInfo(),
            keyInfo: this.keyboard.keyInfo(),
            padInfo: this.pad.padInfo()
        }
        this.setState(nextState)
        if (!nextState) {
            return
        }
        const {ctx, mouseInfo, keyInfo, padInfo} = nextState
        if (!mouseInfo || !ctx || !keyInfo || !padInfo) {
            return
        }
        this.props.onEvent(nextState)
    }


    getCanvasInfo(ctx) {
        this.ctx = ctx
        this.updateState()
    }

    onKeyDown(e) {
        this.keyboard.onkeydown(e)
        this.updateState()
    }

    onKeyUp(e) {
        this.keyboard.onkeyup(e)
        this.updateState()
    }

    onMouseMove(e) {
        this.mouse.onmousemove(e)
        this.updateState()
    }

    onMouseDown(e) {
        this.mouse.onmousedown(e)
        this.updateState()
    }

    onMouseUp(e) {
        this.mouse.onmouseup(e)
        this.updateState()
    }

    onMouseOut(e) {
        this.mouse.onmouseout(e)
        this.updateState()
    }

    onMouseOver(e) {
        this.mouse.onmouseover(e)
        this.updateState()
    }

    onDoubleClick(e) {
        this.mouse.ondblclick(e)
        this.updateState()
    }

    render() {
        return (
            <div
                className={styles.ControllableCanvas}
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseOut={this.onMouseOut}
                onMouseOver={this.onMouseOver}
                onDoubleClick={this.onDoubleClick}
            >
                <Canvas
                    {...this.props}
                    getCanvasInfo={this.getCanvasInfo}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        )
    }
}

ControllableCanvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onEvent: PropTypes.func.isRequired
}

export default ControllableCanvas
