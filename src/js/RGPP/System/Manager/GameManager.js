import RGPP from 'Core/RGPP'
/**
 * Game Manager
 * @class GameManager
 * @author arcsin
 * @constructor
 */

const FRAME_RATE = 20 // (frame / second)
const INTERVAL = 1000 / FRAME_RATE

class GameManager {
    // Private variable

    constructor() {
        this.isDebugMode = false
        this.isPauseGame = false
        this.isTestMode = false
        this.isEmulationMode = false

        this.timer = new RGPP.System.Timer()

        this.requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.setTimeout
    }


    startGame() {
        this.requestAnimationFrame(this.alwaysUpdate, INTERVAL)
    }

    togglePause() {
        this.isPauseGame = !this.isPauseGame
        return this.isPauseGame
    }

    quitGame() {
        RGPP.System.ImageDataManager.getInstance().clearObj()
        RGPP.System.EventObjManager.getInstance().clear()
        RGPP.System.EmulationModeCanvas.getInstance().clear()
    }

    alwaysUpdate() {
        const eom = RGPP.System.EventObjManager.getInstance()
        eom.organizeEventObj()
        if (!this.isPauseGame) {
            this.onUpdate()
        }
        this.onDraw()

        const mapPanelList = RGPP.System.MapPanelList.getInstance()
        const currentMapPanel = mapPanelList.currentMapPanel()
        if (currentMapPanel !== null) {
            const fps = this.timer.measureFPS()
            currentMapPanel.setFPS(fps)
        }
        if (this.isTestMode) {
            requestAnimationFrame(this.alwaysUpdate, INTERVAL)
        }
    }

    onUpdate() {
        const cm = RGPP.System.ControlManager.getInstance()
        const eom = RGPP.System.EventObjManager.getInstance()

        // update event instance
        eom.updateEventObj()

        // update event instance for debug
        if (this.isDebugMode) {
            eom.updateEventObjDebug()
        }

        RGPP.System.EventDialogList.getInstance().updateDialog()

        eom.updateGameObj()

        // save previous pad info
        cm.savePreviousInputInfo()
    }

    onDraw() {
        const currentMapPanel = RGPP.System.MapPanelList.getInstance().currentMapPanel()
        if (currentMapPanel !== null) {
            const eom = RGPP.System.EventObjManager.getInstance()
            const ctx = currentMapPanel.getCtx()

            eom.sortGameObj()

            // draw map
            currentMapPanel.paintComponent()

            // draw event instance
            eom.drawEventObj(ctx)

            if (this.isDebugMode) {
                eom.drawEventObjDebug(ctx)
            }

            // Draw Filter
            RGPP.System.ImageFilterInstance.getInstance().filter(ctx)

            if (this.isEmulationMode) {
                // Draw to Emulation Canvas
                const scrollX = RGPP.System.CoordinateSystem.getInstance().convertMapToScreenX(0)
                const scrollY = RGPP.System.CoordinateSystem.getInstance().convertMapToScreenY(0)
                const imageData = ctx.getImageData(scrollX, scrollY, RGPP.Config.RESOLUTION_X, RGPP.Config.RESOLUTION_Y)
                RGPP.System.EmulationModeCanvas.getInstance().draw(imageData)
            }

            // Draw System Rect
            currentMapPanel.drawEditSystemRect()
        }
    }


    setTestMode(isTestMode) {
        // Reset Filter
        RGPP.System.ImageFilterInstance.getInstance().resetFilter()
        const mapPanelList = RGPP.System.MapPanelList.getInstance()
        const eom = RGPP.System.EventObjManager.getInstance()
        const eventMoveInfoList = RGPP.System.EventMoveInfoList.getInstance()

        if (isTestMode === true && this.isTestMode === false) {
            this.isTestMode = true
            // clear event instance
            eventMoveInfoList.clear()
            eom.clear()

            // set game mode
            for (let mapPanelIndex = 0; mapPanelIndex < mapPanelList.length; mapPanelIndex += 1) {
                mapPanelList.panel(mapPanelIndex).setGameMode()
                mapPanelList.panel(mapPanelIndex).resetEventParam()
            }

            if (mapPanelList.size() > 0) {
                // load initialized event instance of current map panel
                eom.loadInitEventObj()
            }

            RGPP.System.EventDialogList.getInstance().updateDialog()

            RGPP.System.ImageDataManager.getInstance().clearObj()

            // start game main loop
            this.startGame()

            eom.onLoad()
        } else if (isTestMode === false && this.isTestMode === true) {
            this.isTestMode = false
            // stop game main loop
            this.quitGame()

            // reset game mode
            for (let mapPanelIndex = 0; mapPanelIndex < mapPanelList.length; mapPanelIndex += 1) {
                mapPanelList.panel(mapPanelIndex).resetGameMode()
            }
            RGPP.System.EmulationModeCanvas.getInstance().resetInput()

            // clear event instance
            eventMoveInfoList.clear()
            eom.clear()
        }
    }


    setDebugMode(isDebugMode) {
        this.isDebugMode = isDebugMode
    }

    setEmulationMode(emulationFlag) {
        this.isEmulationMode = emulationFlag
    }

    isEmulationMode() {
        return this.isEmulationMode
    }

    isTestMode() {
        return this.isTestMode
    }

    isDebugMode() {
        return this.isDebugMode
    }

}

export default GameManager
