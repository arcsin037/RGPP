import React, {Component} from 'react'
import App from 'Core/components/TodoList/App'
import DrawModeSelectBox from 'Plugin/MapChipEditor/containers/DrawModeSelectBox'
// import EmulationWindow from 'Core/components/EmulationWindow'
import IconMenu from 'Core/components/IconMenu'
// import MainPanel from 'Core/components/MainPanel'
import LayerSelectBox from 'Plugin/MapChipEditor/containers/LayerSelectBox'
import MapPanel from 'Plugin/MapChipEditor/containers/MapPanel'
import PalettePanel from 'Plugin/MapChipEditor/containers/PalettePanel'
// import RGPP from 'RGPP'
import SelectBox from 'Core/components/Base/SelectBox'

// import FlatButtonExampleSimple from 'Core/components/FlatButtonExampleSimple'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/**
 * Main Panel of Editor
 *
 * @class EditorMainPanel
 * @author arcsin
 * @constructor
 */

const modeOptions = [
    {
        value: 'TestMode',
        name: 'Test Mode'
    }, {
        value: 'EmulationMode',
        name: 'EmulationMode Mode'
    }
]

class EditorMainPanel extends Component {
    render() {
        return (
            <div>
                {/*
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <FlatButtonExampleSimple/>
                </MuiThemeProvider>
                */}
                <App />
                <IconMenu/>
                <div className='selectbox-wrapper'>
                    <SelectBox options={modeOptions} defaultValue='TestMode'/>
                    <LayerSelectBox />
                    <DrawModeSelectBox />
                </div>
                <MapPanel id={0} />
                <PalettePanel />
                {/* <EmulationWindow titleName={RGPP.Config.GAME_NAME}/> */}
            {/*<PaletteWindow />*/}
            </div>
        )
    }
}
export default EditorMainPanel
