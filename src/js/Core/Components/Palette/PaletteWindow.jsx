import $ from 'jquery'
import React from 'react'
import SelectBox from 'Core/Components/Base/SelectBox.jsx'

import 'jquery-ui'
import saveIcon from 'Image/System/save.svg'

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

class PaletteWindow extends React.Component {
    constructor(props) {
        super(props)
        const $mWindow = $('#palette-window')

        $mWindow.dialog({autoOpen: true, width: 640, height: 500})
        console.log('Dialog!!!!')
        $mWindow.dialog('option', 'title', 'Palette')
        $mWindow.dialog('open')

        const openFunc = () => {

            // var mapPanelList = RGPP.System.MapPanelList.getInstance()
            // if (!mapPanelList.isEventLayer()) {
            $mWindow.dialog('option', 'title', 'Palette')
            $mWindow.dialog('open')
            //     var pList = RGPP.System.PalettePanelList.getInstance()
            //     var currentPalettePanel = pList.currentPalettePanel()
            //     if (currentPalettePanel !== null) {
            //         currentPalettePanel.paintComponent()
            //     }
            // }
        }

        const closeFunc = () => {
            $mWindow.dialog('close')
        }

        this.openFunc = openFunc
        this.closeFunc = closeFunc

    }

    render() {
        return (
            <div id='palette-window' title='Palette'>
                <div id='palette-window-menu'>
                    <SelectBox options={drawModeOptions} defaultValue='Pen'/>
                    <label>Tag value</label>
                    <input id='tag-data-spinner'/>

                    <button id='save-tag-data' className='btn' title='Save Tag Data'>
                        <img src={saveIcon}/>
                    </button>
                </div>
                <div id='PalettePanelItemDiv'></div>
            </div>
        )
    }
}

export default PaletteWindow
