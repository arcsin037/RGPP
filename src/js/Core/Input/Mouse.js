import RGPP from 'RGPP'
const TypeUtil = RGPP.System.Utils.TypeUtil
const MouseButton = []
const MouseButtonPrevious = []
let MouseX = 0
let MouseY = 0

export const MOUSE_BUTTON_LEFT = 0
export const MOUSE_BUTTON_CENTER = 1
export const MOUSE_BUTTON_RIGHT = 2
export const MOUSE_BUTTON_COUNT = 3

const checkPosition = (e) => {
    if (e) {
        const rect = e.target.getBoundingClientRect()
        MouseX = e.clientX - rect.left
        MouseY = e.clientY - rect.top
    } else {
        MouseX = event.offsetX
        MouseY = event.offsetY
    }
}

const isDragged = (buttonID) => {
    if (MouseButton[buttonID]) {
        return true
    } else {
        return false
    }
}

const checkMouseButton = (e) => {
    if (!e) {
        e = window.event
    }
    if (TypeUtil.isDefined(e.buttons)) {
        const data = e.buttons
        MouseButtonPrevious[MOUSE_BUTTON_LEFT] = MouseButton[MOUSE_BUTTON_LEFT]
        MouseButtonPrevious[MOUSE_BUTTON_RIGHT] = MouseButton[MOUSE_BUTTON_RIGHT]
        MouseButtonPrevious[MOUSE_BUTTON_CENTER] = MouseButton[MOUSE_BUTTON_CENTER]

        MouseButton[MOUSE_BUTTON_LEFT] = ((data & 0x0001) ? true : false)
        MouseButton[MOUSE_BUTTON_RIGHT] = ((data & 0x0002) ? true : false)
        MouseButton[MOUSE_BUTTON_CENTER] = ((data & 0x0004) ? true : false)
    }
}

// replace global function
global.onmousedown = function(e) {
    checkMouseButton(e)
}

global.onmouseup = function(e) {
    checkMouseButton(e)
}

global.onmousemove = function(e) {
    checkMouseButton(e)
    // prevent default action
    if (e.preventDefault) {
        e.preventDefault()
    } else {
        return false
    }
}


/**
 * Mouse Operator
 * @class Template
 * @author arcsin
 * @constructor
 */
class Mouse {
    constructor() {
        for (let i = 0; i < MOUSE_BUTTON_COUNT; i += 1) {
            MouseButton[i] = false
            MouseButtonPrevious[i] = false
        }
        this.mouseOverFlag = false
    }

    onmousemove(e) {
        this.mouseMoveFunc(e)
    }

    onmousedown(e) {
        global.onmousedown(e)
        this.mouseDownFunc(e)
    }

    onmouseup(e) {
        global.onmouseup(e)
        this.mouseUpFunc(e)
    }

    onmouseout(e) {
        this.mouseOutFunc(e)
    }

    onmouseover(e) {
        this.mouseOverFunc(e)
    }

    ondblclick(e) {
        this.mouseDoubleClickFunc(e)
    }

    mouseMoveFunc(e) {
        checkPosition(e)
    }

    mouseDownFunc(e) {
        checkPosition(e)
    }

    mouseOutFunc(e) {
        checkPosition(e)
        this.mouseOverFlag = false
    }

    mouseOverFunc(e) {
        checkPosition(e)
        this.mouseOverFlag = true
    }

    mouseUpFunc() {}

    mouseDoubleClickFunc() {}

    getX() {
        return MouseX
    }

    getY() {
        return MouseY
    }

    isPressed(buttonID) {
        return MouseButton[buttonID]
    }

    isClick(buttonID) {
        if (!MouseButtonPrevious[buttonID]) {
            if (this.isPressed(buttonID)) {
                return true
            }
        }
        return false
    }

    isMouseOver() {
        return this.mouseOverFlag
    }

    isMouseUp(buttonID) {
        if (MouseButtonPrevious[buttonID]) {
            if (!this.isPressed(buttonID)) {
                return true
            }
        }
        return false
    }

    mouseInfo() {
        return {
            x: this.getX(),
            y: this.getY(),

            isMouseOver: this.isMouseOver(),

            isPressedLeftButton: this.isPressed(MOUSE_BUTTON_LEFT),
            isPressedRightButton: this.isPressed(MOUSE_BUTTON_RIGHT),
            isPressedCenterButton: this.isPressed(MOUSE_BUTTON_CENTER),

            isLeftClick: this.isClick(MOUSE_BUTTON_LEFT),
            isRightClick: this.isClick(MOUSE_BUTTON_RIGHT),
            isCenterClick: this.isClick(MOUSE_BUTTON_CENTER),

            isLeftDragged: isDragged(MOUSE_BUTTON_LEFT),
            isRightDragged: isDragged(MOUSE_BUTTON_RIGHT),
            isCenterDragged: isDragged(MOUSE_BUTTON_CENTER),

            isLeftUp: this.isMouseUp(MOUSE_BUTTON_LEFT),
            isRightUp: this.isMouseUp(MOUSE_BUTTON_RIGHT),
            isCenterUp: this.isMouseUp(MOUSE_BUTTON_CENTER)
        }
    }
}

export default Mouse
