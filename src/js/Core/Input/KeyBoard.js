const KEY_COUNT = 256

export const KEY_LEFT = 37
export const KEY_RIGHT = 39
export const KEY_UP = 38
export const KEY_DOWN = 40

export const KEY_SPACE = 32
export const KEY_ENTER = 13
export const KEY_ESC = 27
export const KEY_DEL = 46
export const KEY_BACKSPACE = 8

export const KEY_C = 67

export const KEY_S = 83

export const KEY_V = 86

export const KEY_X = 88
export const KEY_Y = 89
export const KEY_Z = 90

export const KEY_SHIFT = 16
export const KEY_CTRL = 17

export class KeyBoard {

    constructor() {
        this.key = [KEY_COUNT]
        this.keyPrevious = [KEY_COUNT]
        for (let i = 0; i < KEY_COUNT; i += 1) {
            this.key[i] = false
            this.keyPrevious[i] = false
        }
    }

    onkeydown(e) {
        if (e) { //Fire fox
            this.key[e.which] = true
        } else {
            this.key[event.keyCode] = true
        }
        e.preventDefault()
        return false
    }

    onkeyup(e) {
        if (e) { //Fire fox
            this.key[e.which] = false
            this.keyPrevious[e.which] = false
        } else {
            this.key[event.keyCode] = false
            this.keyPrevious[event.keyCode] = false
        }
        return false
    }

    // Key On
    isKeyOn(code) {
        return this.key[code]
    }

    // Key Triggered
    isKeyTriggered(code) {
        if (this.key[code]) {
            if (this.keyPrevious[code]) {
                return false
            } else {
                return true
            }
        }
        return false
    }

    keyInfo() {
        return {
            key: this.key,
            keyPrevious: this.keyPrevious
        }
    }
}

export default KeyBoard
