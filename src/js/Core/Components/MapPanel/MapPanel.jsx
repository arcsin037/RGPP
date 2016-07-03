import React, {Component} from 'react'
import styles from './MapPanel.scss'

class MapPanel extends Component {
    render() {
        return (
            <div className={styles.test}>
                <canvas className={styles.MapPanelCanvas} />
            </div>
        )
    }
}

export default MapPanel
