/**
 * Event Base
 * @class EventBase
 * @author arcsin
 * @constructor
 */

import RGPP from 'RGPP'
import EventState from './EventState'
const scriptUtil = RGPP.System.ScriptUtil
const SCRIPT_DATA_ID_INDEX = 0

class EventBase {
    constructor({
        id = 0,
        name = 'Event',
        initSceneId = 0
    } = {}) {
        this.id = id
        // Default Scene
        this.initSceneId = initSceneId
        // Name
        this.name = name
        // Event Statuses
        this.currentStateIndex = 0
        this.stateKeys = ['normal']

        this.isLoaded = false
        this.isStateTransition = true

        const currentKey = this.currentStateKey()
        this.eventStatuses = {}
        this.eventStatuses[currentKey] = new EventState({
            id: this.currentStateIndex,
            name: currentKey
        })
    }

    onLoadGame(event) {
        this.isStateTransition = true
        if (!this.isLoaded) {
            for (const key in this.eventStatuses) {
                this.eventStatuses[key].onLoadGame(event)
            }
            this.isLoaded = true
        }
    }

    onLoadMap(event) {
        this.isStateTransition = true
        for (const key in this.eventStatuses) {
            this.eventStatuses[key].onLoadMap(event)
        }
    }

    loadChangeableValuesPerEvent() {
        const currentKey = this.currentStateKey()
        const retValues = this.eventStatuses[currentKey].loadChangeableValuesPerEvent()
        return retValues
    }

    loadChangeableValuesPerScript(changeableValues) {
        const currentKey = this.currentStateKey()
        this.eventStatuses[currentKey].loadChangeableValuesPerScript(changeableValues)
    }

    reaction(event) {
        const currentKey = this.currentStateKey()
        if (this.eventStatuses[currentKey] !== undefined) {
            this.eventStatuses[currentKey].reaction(event)
        } else {
            scriptUtil.outputErrMsgToConsole(`[Event.js:reaction] not defined status ${currentKey}`)
        }
    }

    update(event) {
        const currentKey = this.currentStateKey()
        if (this.eventStatuses[currentKey] === undefined) {
            scriptUtil.outputErrMsgToConsole(`[Event.js:update] not defined status ${currentKey}`)
            return
        }
        if (this.isStateTransition) {
            this.eventStatuses[currentKey].onStateTransition(event)
            this.isStateTransition = false
        }
        this.eventStatuses[currentKey].update(event)
    }

    debugUpdate(event) {
        const currentKey = this.currentStateKey()
        if (this.eventStatuses[currentKey] === undefined) {
            scriptUtil.outputErrMsgToConsole(`[Event.js:debugUpdate] not defined status  ${currentKey}`)
            return
        }
        this.eventStatuses[currentKey].debugUpdate(event)
    }


    draw(ctx) {
        const currentKey = this.currentStateKey()
        if (this.eventStatuses[currentKey] === undefined) {
            scriptUtil.outputErrMsgToConsole(`[Event.js:draw] not defined status  ${currentKey}`)
            return
        }
        this.eventStatuses[currentKey].draw(ctx)
    }

    debugDraw(ctx) {
        const currentKey = this.currentStateKey()
        if (this.eventStatuses[currentKey] === undefined) {
            scriptUtil.outputErrMsgToConsole(`[Event.js:debugDraw] not defined status ${currentKey}`)
            return
        }
        this.eventStatuses[currentKey].debugDraw(ctx)
    }

    updateStateWithArray(stateArray, scriptArray, changeableValueArray) {
        this.deleteAllState()
        const stateNum = stateArray.length
        for (let stateIndex = 0; stateIndex < stateNum; ++stateIndex) {
            const id = stateIndex
            const key = stateArray[stateIndex]
            this.stateKeys[id] = key
            this.eventStatuses[key] = new RGPP.System.EventState({
                id,
                name: key
            })
            const scriptNum = scriptArray[stateIndex].length
            for (let scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {
                this.eventStatuses[key].setScriptID(
                    scriptIndex,
                    scriptArray[stateIndex][scriptIndex][SCRIPT_DATA_ID_INDEX])

                const changeableValueNum = changeableValueArray[stateIndex][scriptIndex].length
                for (let cIndex = 0; cIndex < changeableValueNum; cIndex += 1) {
                    const value = changeableValueArray[stateIndex][scriptIndex][cIndex]
                    this.eventStatuses[key].setChangeableInitValue(scriptIndex, cIndex, value)
                }
                this.eventStatuses[key].setInitValuesToChangeableValue()
            }
        }
    }

    updateStateWithInputField(stateNum, inputNameField) {
        scriptUtil.outputMsgToConsole(`[Event.js:updateStateWithInputField] stateNum = ${stateNum}`)
        this.deleteAllState()

        for (let eventStateIndex = 0; eventStateIndex < stateNum; ++eventStateIndex) {
            const id = eventStateIndex
            const key = $(inputNameField[eventStateIndex]).val()
            this.stateKeys[id] = key
            scriptUtil.outputMsgToConsole(`[Event.js:updateStateWithInputField] key = ${key}`)
            if (this.eventStatuses[key] === undefined) {
                this.eventStatuses[key] = new RGPP.System.EventState({
                    id,
                    name: key
                })
            } else {
                this.eventStatuses[key].setID(id)
                this.eventStatuses[key].setName(key)
            }
        }

        // Delete another key
        for (const key in this.eventStatuses) {
            let breakFlag = false
            for (let i = 0; i < this.stateKeys.length; ++i) {
                if (key === this.stateKeys[i]) {
                    breakFlag = true
                    break
                }
            }
            if (!breakFlag) {
                scriptUtil.outputMsgToConsole(`delete key : ${key}`)
                Reflect.deleteProperty(this.eventStatuses, key)
            }
        }


        this.stateKeys.length = stateNum
    }

    updateCurrentStateScript(comboBox) {
        const currentKey = this.currentStateKey()
        scriptUtil.outputMsgToConsole(`current state key = ${currentKey}`)
        const scriptNum = this.eventStatuses[currentKey].scriptNum()
        for (let scriptIndex = 0; scriptIndex < scriptNum; ++scriptIndex) {
            const selectedIndex = comboBox[scriptIndex].selectedIndex()
            scriptUtil.outputMsgToConsole(`scriptIndex = ${scriptIndex} selectedIndex : ${selectedIndex}`)
            const scriptDB = RGPP.System.ScriptDataBase.getInstance()
            this.eventStatuses[currentKey].setScriptID(
                scriptIndex,
                scriptDB.searchCategoryIDFromIndex(selectedIndex),
                scriptDB.searchDataIDFromIndex(selectedIndex))
        }
        this.isStateTransition = true
    }

    addCurrentStateScript() {
        const currentKey = this.currentStateKey()
        this.eventStatuses[currentKey].addScript()
    }

    removeCurrentStateScript() {
        const currentKey = this.currentStateKey()
        this.eventStatuses[currentKey].removeScript()
    }

    searchMinEventStateID() {
        if (this.getStateSize() === 0) {
            return 0
        }
        let j = 0
        let existFlag = false
        while (!existFlag) {
            for (let i = 0; i < this.getStateSize(); i += 1) {
                if (this.eventStatuses[i].id() === j) {
                    existFlag = true
                    break
                }
            }
            if (!existFlag) {
                return j
            }
            ++j
        }
    }

    getID() {
        return this.id
    }

    getInitMapDataID() {
        return this.mapDataID
    }

    getInitX() {
        return mInitX
    }

    getInitY() {
        return mInitY
    }

    getName() {
        return mName
    }

    setID(id) {
        mID = id
    }

    setInitialPos(mapID, x, y) {
        mInitMapDataID = mapID
        mInitX = x
        mInitY = y
    }

    resetParam() {
        this.isLoaded = false
        this.currentStateIndex = 0
        this.isStateTransition = true
        scriptUtil.outputMsgToConsole('resetParam!')
    }

    setName(name) {
        mName = name
    }

    stateID(index) {
        const key = this.stateKeys[index]
        scriptUtil.outputMsgToConsole('[Event.js:stateID()] key = ' + key)
        return this.eventStatuses[key].id()
    }

    stateName(index) {
        const key = this.stateKeys[index]
        scriptUtil.outputMsgToConsole('[Event.js:stateName()] key = ' + key)
        return this.eventStatuses[key].name()
    }

    getStateSize() {
        return Object.keys(this.eventStatuses).length
    }

    setCurrentStateIndex(stateIndex) {
        if (this.currentStateIndex !== stateIndex) {
            this.isStateTransition = true
            this.currentStateIndex = stateIndex
            scriptUtil.outputMsgToConsole('this.currentStateIndex = ' + this.currentStateIndex)
        }
    }

    setCurrentStateByKey(key) {
        const currentKey = this.currentStateKey()
        if (currentKey !== key) {
            let breakFlag = false
            for (let index = 0; index < this.stateKeys.length; index += 1) {
                if (this.stateKeys[index] === key) {

                    this.currentStateIndex = index
                    scriptUtil.outputMsgToConsole('this.currentStateIndex = ' + this.currentStateIndex)
                    this.stateKeys[this.currentStateIndex] = key
                    scriptUtil.outputMsgToConsole('set current state : index : ' + index + ' key : ' + key)
                    breakFlag = true
                    break
                }
            }
            if (breakFlag) {
                this.isStateTransition = true
            } else {
                scriptUtil.outputErrMsgToConsole('No state : ' + key)
            }
        }
    }

    getScriptNum(stateIndex) {
        const key = this.stateKeys[stateIndex]
        return this.eventStatuses[key].scriptNum()
    }

    getScriptDataID(stateIndex, scriptIndex) {
        const key = this.stateKeys[stateIndex]
        return this.eventStatuses[key].scriptID(scriptIndex)
    }

    getScriptCategoryID(stateIndex, scriptIndex) {
        const key = this.stateKeys[stateIndex]
        return this.eventStatuses[key].scriptCategoryID(scriptIndex)
    }

    getScriptIDSet(stateIndex, scriptIndex) {
        const idSet = [2]
        const key = this.stateKeys[stateIndex]

        idSet[SCRIPT_CATEGORY_ID_INDEX] = this.eventStatuses[key].scriptCategoryID(scriptIndex)
        idSet[SCRIPT_DATA_ID_INDEX] = this.eventStatuses[key].scriptID(scriptIndex)
        return idSet
    }

    getChangeableValueNum(stateIndex, scriptIndex) {
        const key = this.stateKeys[stateIndex]
        return this.eventStatuses[key].changeableValueNum(scriptIndex)
    }

    getChangeableInitValue(stateIndex, scriptIndex, cIndex) {
        const key = this.stateKeys[stateIndex]
        return this.eventStatuses[key].changeableInitValue(scriptIndex, cIndex)
    }

    getScriptName(currentKey, scriptIndex) {
        return this.eventStatuses[currentKey].scriptName(scriptIndex)
    }

    currentStateIndex() {
        scriptUtil.outputMsgToConsole('this.currentStateIndex = ' + this.currentStateIndex)
        return this.currentStateIndex
    }

    currentStateKey() {
        let currentKey = this.stateKeys[this.currentStateIndex]
        if (typeof currentKey === 'undefined') {
            this.currentStateIndex = 0
            currentKey = this.stateKeys[this.currentStateIndex]
        }
        return currentKey
    }

    currentScriptNum() {
        const currentKey = this.currentStateKey()
        return this.eventStatuses[currentKey].scriptNum()
    }

    currentScriptID(index) {
        const currentKey = this.currentStateKey()

        return this.eventStatuses[currentKey].scriptID(index)
    }

    currentScriptName(index) {
        const currentKey = this.currentStateKey()
        return this.eventStatuses[currentKey].scriptName(index)
    }

    currentScriptCategoryIndex(index) {
        const currentKey = this.currentStateKey()
        return this.eventStatuses[currentKey].categoryIndex(index)
    }

    currentScriptIndex(index) {
        const currentKey = this.currentStateKey()
        return this.eventStatuses[currentKey].scriptIndex(index)
    }

    stateTransitionFlag() {
        return this.isStateTransition
    }

    deleteAllState() {
        for (const key in this.eventStatuses) {
            delete this.eventStatuses[key]
        }
    }

    resetStateTransitionFlag() {
        this.isStateTransition = false
    }

    copyObj(eventID) {
        const copyEvent = RGPP.System.EventBase({
                id: eventID,
                categoryID: mInitMapCategoryID,
                mapID: mInitMapDataID,
                x: mInitX,
                y: mInitY,
                name: mName
            })
            // copyEvent.setImageName(mImageName)
        const stateArray = createStateArray()
        const scriptArray = createScriptArray()
        const initChangeableValueArray = createInitChangeableValueArray()
        copyEvent.updateStateWithArray(stateArray, scriptArray, initChangeableValueArray)
        return copyEvent
    }

    createStateArray() {
        const stateSize = this.getStateSize()
        let array = [stateSize]

        for (let i = 0; i < stateSize; ++i) {
            array[i] = this.stateKeys[i]
        }

        return array
    }

    createScriptArray() {
        const stateSize = getStateSize()
        const array = [stateSize]
        for (let stateIndex = 0; stateIndex < stateSize; stateIndex += 1) {
            const scriptNum = getScriptNum(stateIndex)
            array[stateIndex] = [scriptNum]
            for (let scriptIndex = 0; scriptIndex < scriptNum; scriptIndex += 1) {
                const scriptCategoryID = getScriptCategoryID(stateIndex, scriptIndex)
                const scriptID = getScriptDataID(stateIndex, scriptIndex)
                array[stateIndex][scriptIndex] = []
                array[stateIndex][scriptIndex][SCRIPT_CATEGORY_ID_INDEX] = scriptCategoryID
                array[stateIndex][scriptIndex][SCRIPT_DATA_ID_INDEX] = scriptID
            }
        }
        return array
    }

    createInitChangeableValueArray() {
        const stateSize = getStateSize()
        const array = []
        for (let stateIndex = 0; stateIndex < stateSize; stateIndex += 1) {
            const scriptNum = getScriptNum(stateIndex)
            array[stateIndex] = []
            for (let scriptIndex = 0; scriptIndex < scriptNum; scriptIndex += 1) {
                const changeableValueNum = this.getChangeableValueNum(stateIndex, scriptIndex)
                array[stateIndex][scriptIndex] = []
                for (let cIndex = 0; cIndex < changeableValueNum; cIndex += 1) {
                    const value = this.getChangeableInitValue(stateIndex, scriptIndex, cIndex)
                    array[stateIndex][scriptIndex][cIndex] = value
                }
            }
        }
        return array
    }


    saveInitValuesFromChangeableValue() {
        for (const key in this.eventStatuses) {
            this.eventStatuses[key].saveInitValuesFromChangeableValue()
        }
    }

    saveInitValuesFromChangeableValuePerScript() {
        const currentKey = this.currentStateKey()
        this.eventStatuses[currentKey].saveInitValuesFromChangeableValuePerScript()
    }

}

export default EventBase
