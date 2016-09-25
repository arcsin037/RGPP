import React, {Component, PropTypes} from 'react'
import {MAP_LAYER_NUM} from 'Core/constant'
import SelectBox from 'Core/Components/Base/SelectBox'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setDrawMode} from 'Core/actions/Palette'

const drawModeOptions = [
    {
        value: 'Pen',
        name: 'Pen'
    }, {
        value: 'Rectangle',
        name: 'Rectangle'
    }, {
        value: 'Filling',
        name: 'Filling'
    }, {
        value: 'Eraser',
        name: 'Eraser'
    }
]

class LayerSelectBox extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.setDrawMode(event.target.value)
    }

    render() {
        return this.props.currentLayerNo === MAP_LAYER_NUM ?
        null :
        <SelectBox options={drawModeOptions} defaultValue='Pen' onChange={this.handleChange}/>
    }
}

LayerSelectBox.propTypes = {
    setDrawMode: PropTypes.func,
    currentLayerNo: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
    currentLayerNo: state.maps.selected.currentLayerNo
})

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    setDrawMode
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(LayerSelectBox)
