import React, {Component, PropTypes} from 'react'
import Button from 'Core/components/Base/Button'
import {bindActionCreators} from 'redux'
import calendarIcon from 'Image/System/calendar.svg'
import {connect} from 'react-redux'

import debugIcon from 'Image/System/debug.svg'
import {getPluginSaveData} from 'Plugin'
import {getGameObjs} from 'GameObjs'
import gridIcon from 'Image/System/grid.svg'
import newIcon from 'Image/System/new.svg'
import pauseIcon from 'Image/System/pause.svg'
import playIcon from 'Image/System/play.svg'
import {save} from 'Core/actions'
import saveIcon from 'Image/System/save.svg'
import styles from './IconMenu.scss'

class IconMenu extends Component {
    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
    }

    save() {
        this.props.save(this.props.saveData)
    }

    render() {
        return (
            <div className={styles.btnWrapper}>
                <Button title='New Map'>
                    <img src={newIcon}/>
                </Button>
                <Button title='Save Map' onClick={this.save}>
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

IconMenu.propTypes = {
    save: PropTypes.func.isRequired,
    saveData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    saveData: {
        plugin: getPluginSaveData(state),
        gameObjs: getGameObjs()
    }
})

const mapDispatchToProps = (dispatch) => (bindActionCreators({
    save
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(IconMenu)
