import Button from 'Core/components/Base/Button'
import React from 'react'
import calendarIcon from 'Image/System/calendar.svg'

import debugIcon from 'Image/System/debug.svg'
import gridIcon from 'Image/System/grid.svg'
import newIcon from 'Image/System/new.svg'
import pauseIcon from 'Image/System/pause.svg'
import playIcon from 'Image/System/play.svg'
import {save} from 'Core/actions'
import saveIcon from 'Image/System/save.svg'
import styles from './IconMenu.scss'

class IconMenu extends React.Component {
    render() {
        return (
            <div className={styles.btnWrapper}>
                <Button title='New Map'>
                    <img src={newIcon}/>
                </Button>
                <Button title='Save Map' onClick={() => {
                    save({dummy: {}})
                }}>
                    <img src={saveIcon}/>
                </Button>
                <Button title='Grid'>
                    <img src={gridIcon}/>
                </Button>
                <Button title='Schedule'>
                    <img src={calendarIcon}/>
                </Button>
                <Button title='Play'>
                    <img src={playIcon}/>
                </Button>
                <Button title='Pause'>
                    <img src={pauseIcon}/>
                </Button>
                <Button title='Debug Mode'>
                    <img src={debugIcon}/>
                </Button>
            </div >
        )
    }
}
export default IconMenu
