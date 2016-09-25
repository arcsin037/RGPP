import {addMap, setCtx, setMapChip} from 'Core/actions/Map'
import MapPanel from 'Core/Components/MapPanel'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    mapData: state.maps.data[ownProps.id],
    palettesData: state.palettes.data,
    selectedPalette: state.palettes.selected,
    currentLayerNo: state.maps.selected.currentLayerNo,
    drawMode: state.palettes.context.drawMode
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
    addMap,
    setCtx,
    setMapChip
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel)
