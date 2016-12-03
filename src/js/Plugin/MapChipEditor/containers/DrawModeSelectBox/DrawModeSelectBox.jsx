import {ERASER_MODE, FILLING_MODE, MAP_LAYER_NUM, PEN_MODE, RECTANGLE_MODE} from '../../constants'
import React, {Component, PropTypes} from 'react'
import SelectBox from 'Core/components/Base/SelectBox'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getStore} from '../../utils/storeUtil'
import {setDrawMode} from '../../actions/Palette'

const drawModeOptions = [
  {
    value: PEN_MODE,
    name: PEN_MODE
  }, {
    value: RECTANGLE_MODE,
    name: RECTANGLE_MODE
  }, {
    value: FILLING_MODE,
    name: FILLING_MODE
  }, {
    value: ERASER_MODE,
    name: ERASER_MODE
  }
]

class DrawModeSelectBox extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.props.setDrawMode(event.target.value)
  }

  render () {
    return this.props.currentLayerNo === MAP_LAYER_NUM
            ? null
            : <SelectBox options={drawModeOptions} defaultValue='Pen' onChange={this.handleChange} />
  }
}

DrawModeSelectBox.propTypes = {
  setDrawMode: PropTypes.func,
  currentLayerNo: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  const store = getStore(state)
  return {
    currentLayerNo: store.maps.selected.get('currentLayerNo')
  }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  setDrawMode
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(DrawModeSelectBox)
