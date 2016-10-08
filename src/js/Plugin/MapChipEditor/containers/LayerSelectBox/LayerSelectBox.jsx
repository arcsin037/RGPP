import React, {Component, PropTypes} from 'react'
import SelectBox from 'Core/components/Base/SelectBox'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setCurrentLayerNo} from '../../actions/Map'

const layerOptions = [
    {
        value: '0',
        name: 'Layer 1'
    }, {
        value: '1',
        name: 'Layer 2'
    }, {
        value: '2',
        name: 'Layer 3'
    }, {
        value: '3',
        name: 'Event'
    }
]

class LayerSelectBox extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const currentLayerNo = parseInt(event.target.value, 10)
        this.props.setCurrentLayerNo(currentLayerNo)
    }

    render() {
        return <SelectBox options={layerOptions} defaultValue='3' onChange={this.handleChange}/>
    }
}

LayerSelectBox.propTypes = {
    setCurrentLayerNo: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    setCurrentLayerNo
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(LayerSelectBox)
