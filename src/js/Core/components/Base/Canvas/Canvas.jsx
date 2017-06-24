import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import styles from './Canvas.scss'
class Canvas extends Component {
  componentDidMount () {
    const canvas = findDOMNode(this.refs.canvas)
    if (!canvas || !canvas.getContext) {
      return
    }
    const ctx = canvas.getContext('2d')
    this.props.getCanvasInfo(ctx)
  }

  render () {
    const {
      width,
      height,
      onKeyDown = () => {},
      onKeyUp = () => {}
    } = this.props

    const widthPx = `${width}px`
    const heightPx = `${height}px`

    const sizeStyle = {
      width: widthPx,
      height: heightPx
    }

    return (<canvas ref='canvas' tabIndex={0} className={styles.Canvas} style={sizeStyle} width={widthPx} height={heightPx} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />)
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
