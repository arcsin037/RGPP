import Button from 'Core/Components/Base/Button'
import React from 'react'
import calendarIcon from 'Image/System/calendar.svg'

import debugIcon from 'Image/System/debug.svg'
import gridIcon from 'Image/System/grid.svg'
import newIcon from 'Image/System/new.svg'
import pauseIcon from 'Image/System/pause.svg'
import playIcon from 'Image/System/play.svg'
import saveIcon from 'Image/System/save.svg'
import styles from './IconMenu.scss'

class IconMenu extends React.Component {
    render() {
        const newIconImg = <img src={newIcon}/>
        const saveIconImg = <img src={saveIcon}/>
        const gridIconImg = <img src={gridIcon}/>
        const calendarIconImg = <img src={calendarIcon}/>
        const playIconImg = <img src={playIcon}/>
        const pauseIconImg = <img src={pauseIcon}/>
        const debugIconImg = <img src={debugIcon}/>

        return (
            <div className={styles.btnWrapper}>
                <Button title='New Map' innerElement={newIconImg}/>
                <Button title='Save Map' innerElement={saveIconImg}/>
                <Button title='Grid' innerElement={gridIconImg}/>
                <Button title='Schedule' innerElement={calendarIconImg}/>
                <Button title='Play' innerElement={playIconImg}/>
                <Button title='Pause' innerElement={pauseIconImg}/>
                <Button title='Debug Mode' innerElement={debugIconImg}/>
            </div>
        )
    }
}

export default IconMenu
