import React, {Component} from 'react'
import styles from './MapPanel.scss'

class MapPanel extends Component {
    render() {
        console.log(styles)
        return (
            <div className={styles.test}>
                <canvas className={styles.MapPanelCanvas}>I am canvas</canvas>
                <div className={styles.test2}>test in test</div>
            </div>
        )
    }
}

export default MapPanel
