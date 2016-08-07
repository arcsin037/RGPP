import KeyBoard, * as KeyCode from './KeyBoard'

/**
 * Pad
 * @class Pad
 * @author arcsin
 * @constructor
 */
class Pad {
    constructor(keyboard) {
        this.keyboard = keyboard
    }

    padInfo() {
        return {
            isKeyOnUp: this.isKeyOnUp(),
            isKeyOnDown: this.isKeyOnDown(),
            isKeyOnLeft: this.isKeyOnLeft(),
            isKeyOnRight: this.isKeyOnRight(),
            isKeyOnA: this.isKeyOnA(),
            isKeyOnB: this.isKeyOnB(),
            isKeyOnC: this.isKeyOnC(),

            isKeyTriggeredUp: this.isKeyTriggeredUp(),
            isKeyTriggeredDown: this.isKeyTriggeredDown(),
            isKeyTriggeredLeft: this.isKeyTriggeredLeft(),
            isKeyTriggeredRight: this.isKeyTriggeredRight(),
            isKeyTriggeredA: this.isKeyTriggeredA(),
            isKeyTriggeredB: this.isKeyTriggeredB(),
            isKeyTriggeredC: this.isKeyTriggeredC(),
            isKeyTriggeredCtrlC: this.isKeyTriggeredCtrlC(),
            isKeyTriggeredCtrlS: this.isKeyTriggeredCtrlS(),
            isKeyTriggeredCtrlV: this.isKeyTriggeredCtrlV(),
            isKeyTriggeredCtrlX: this.isKeyTriggeredCtrlX(),
            isKeyTriggeredCtrlY: this.isKeyTriggeredCtrlY(),
            isKeyTriggeredCtrlZ: this.isKeyTriggeredCtrlZ(),
            isKeyTriggeredBackSpaceOrDeleteKey: this.isKeyTriggeredBackSpaceOrDeleteKey()
        }
    }

    isKeyOnUp() {
        return this.keyboard.isKeyOn(KeyCode.KEY_UP)
    }

    isKeyOnDown() {
        return this.keyboard.isKeyOn(KeyCode.KEY_DOWN)
    }

    isKeyOnLeft() {
        return this.keyboard.isKeyOn(KeyCode.KEY_LEFT)
    }

    isKeyOnRight() {
        return this.keyboard.isKeyOn(KeyCode.KEY_RIGHT)
    }

    isKeyOnA() {
        let ret = this.keyboard.isKeyOn(KeyCode.KEY_SPACE) || this.keyboard.isKeyOn(KeyCode.KEY_Z)
        ret = (ret || this.keyboard.isKeyOn(KeyCode.KEY_ENTER))
        return ret
    }

    isKeyOnB() {
        const ret = this.keyboard.isKeyOn(KeyCode.KEY_ESC) || this.keyboard.isKeyOn(KeyCode.KEY_X)
        return ret
    }

    isKeyOnC() {
        const ret = this.keyboard.isKeyOn(KeyCode.KEY_SHIFT) || this.keyboard.isKeyOn(KeyCode.KEY_C)
        return ret
    }

    // key trigger
    isKeyTriggeredUp() {
        return this.keyboard.isKeyTriggered(KeyCode.KEY_UP)
    }

    isKeyTriggeredDown() {
        return this.keyboard.isKeyTriggered(KeyCode.KEY_DOWN)
    }

    isKeyTriggeredLeft() {
        return this.keyboard.isKeyTriggered(KeyCode.KEY_LEFT)
    }

    isKeyTriggeredRight() {
        return this.keyboard.isKeyTriggered(KeyCode.KEY_RIGHT)
    }

    isKeyTriggeredA() {
        let ret = this.keyboard.isKeyTriggered(KeyCode.KEY_SPACE)
        ret = (ret || (this.keyboard.isKeyTriggered(KeyCode.KEY_Z) && !this.keyboard.isKeyOn(KeyCode.KEY_CTRL)))
        ret = (ret || this.keyboard.isKeyTriggered(KeyCode.KEY_ENTER))
        return ret
    }

    isKeyTriggeredB() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_ESC) || this.keyboard.isKeyTriggered(KeyCode.KEY_X)
        return ret
    }

    isKeyTriggeredC() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_SHIFT) || this.keyboard.isKeyTriggered(KeyCode.KEY_C)
        return ret
    }

    isKeyTriggeredCtrlC() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_C) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredCtrlS() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_S) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredCtrlV() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_V) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredCtrlX() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_X) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredCtrlY() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_Y) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredCtrlZ() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_Z) && this.keyboard.isKeyOn(KeyCode.KEY_CTRL)
        return ret
    }

    isKeyTriggeredBackSpaceOrDeleteKey() {
        const ret = this.keyboard.isKeyTriggered(KeyCode.KEY_BACKSPACE) || this.keyboard.isKeyTriggered(KeyCode.KEY_DEL)
        return ret
    }
}

export default Pad
