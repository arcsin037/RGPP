import React from 'react'
import SelectBox from 'Core/components/Base/SelectBox'
import Draggable from 'react-draggable'

// import FlatButton from 'material-ui/FlatButton'
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
/*
const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
    <FlatButton label="Primary" primary={true} />
    <FlatButton label="Secondary" secondary={true} />
    <FlatButton label="Disabled" disabled={true} />
  </div>
)
*/

class PaletteWindow extends React.Component {
    constructor(props) {
        super(props)

        // const $mWindow = $('#palette-window')
        //
        // $mWindow.dialog({autoOpen: true, width: 640, height: 500})
        // console.log('Dialog!!!!')
        // $mWindow.dialog('option', 'title', 'Palette')
        // $mWindow.dialog('open')

        const openFunc = () => {

            // var mapPanelList = RGPP.System.MapPanelList.getInstance()
            // if (!mapPanelList.isEventLayer()) {
            // $mWindow.dialog('option', 'title', 'Palette')
            // $mWindow.dialog('open')
            //     var pList = RGPP.System.PalettePanelList.getInstance()
            //     var currentPalettePanel = pList.currentPalettePanel()
            //     if (currentPalettePanel !== null) {
            //         currentPalettePanel.paintComponent()
            //     }
            // }
        }

        const closeFunc = () => {
            // $mWindow.dialog('close')
        }

        this.openFunc = openFunc
        this.closeFunc = closeFunc

    }

    render() {
        return (
            <Draggable handle='div'>
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
            </Draggable>
        )
    }
}

export default PaletteWindow
