import React from 'react'
import Button from './Base/Button'

import calendarIcon from 'Image/System/calendar.svg'
import debugIcon from 'Image/System/debug.svg'
import gridIcon from 'Image/System/grid.svg'
import newIcon from 'Image/System/new.svg'
import pauseIcon from 'Image/System/pause.svg'
import playIcon from 'Image/System/play.svg'
import saveIcon from 'Image/System/save.svg'

class IconMenu extends React.Component {
    render() {
        return (
            <div className='btn-wrapper'>
                <button className='btn' title='New Map'>
                    <img src={newIcon}/>
                </button>
                <button className='btn' title='Save Map'>
                    <img src={saveIcon}/>
                </button>
                <button className='btn' title='Grid'>
                    <img src={gridIcon}/>
                </button>
                <button className='btn' title='Schedule'>
                    <img src={calendarIcon}/>
                </button>
                <button className='btn' title='Play'>
                    <img src={playIcon}/>
                </button>
                <button className='btn' title='Pause'>
                    <img src={pauseIcon}/>
                </button>
                <button className='btn' title='Debug Mode'>
                    <img src={debugIcon}/>
                </button>
            </div>
        )
    }
}

export default IconMenu
