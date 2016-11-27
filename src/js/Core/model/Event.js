import EventBase from './EventBase'
import RGPP from 'RGPP'

class Event extends EventBase {
  constructor (arg = {}) {
    super(arg)
    const {currentMapID = 0, currentEventX = 0, currentEventY = 0} = arg

    this.gameObjectIDArray = []
    this.gameObjectArray = []
    this.currentMapID = currentMapID
    this.currentEventX = currentEventX
    this.currentEventY = currentEventY
  }

  createGameObj(gameObjID, namespace, name) {
    if (this.gameObjectArray[name] === undefined) {
      this.gameObjectArray[name] = []
    }

    if (this.gameObjectIDArray[name] === undefined) {
      this.gameObjectIDArray[name] = []
    }

    const scriptName = this.correctScriptName(namespace, name)

    const executeProgramString = `return new ${scriptName}()`

    const scriptUtil = RGPP.System.ScriptUtil.getInstance()
    scriptUtil.outputMsgToConsole(executeProgramString)

    const gameObj = (new Function(executeProgramString))()

    if (this.gameObjectIDArray[name][gameObjID] === undefined) {
      this.gameObjectArray[name].push(gameObj)
      const size = this.gameObjectArray[name].length
      this.gameObjectIDArray[name][gameObjID] = size - 1
    } else {
      const index = this.gameObjectIDArray[name][gameObjID]
      this.gameObjectArray[name][index] = gameObj
    }
    return gameObj
  }

  createImageObj(gameObjID, arg) {
    const name = 'ImageObj'
    if (this.gameObjectArray[name] === undefined) {
      this.gameObjectArray[name] = []
    }

    if (this.gameObjectIDArray[name] === undefined) {
      this.gameObjectIDArray[name] = []
    }

    const imageDataManager = RGPP.System.ImageDataManager.getInstance()

    const gameObj = imageDataManager.createObj(arg)
    if (this.gameObjectIDArray[name][gameObjID] === undefined) {
      this.gameObjectArray[name].push(gameObj)
      const size = this.gameObjectArray[name].length
      this.gameObjectIDArray[name][gameObjID] = size - 1
    } else {
      const index = this.gameObjectIDArray[name][gameObjID]
      this.gameObjectArray[name][index] = gameObj
    }
    return gameObj

  }

  createSoundObj() {}

  correctScriptName(namespace, scriptName) {
    const retName = `${RGPP.GlobalNS}.${namespace}.${scriptName}`
    return retName
  }

  setPosition(mapDataID, x, y) {
    RGPP.System.EventMoveInfoList.getInstance().setMoveInfo({
      mapDataID,
      currentX: x,
      currentY: y
    })

    this.currentMapID = mapDataID
    this.currentEventX = x
    this.currentEventY = y
  }

  getX() {
    return this.currentEventX
  }

  getY() {
    return this.currentEventY
  }

  currentMapDataID() {
    return this.currentMapID
  }

  clearGameObj() {
    this.gameObjectIDArray = []
    this.gameObjectArray = []
  }

  gameObjs(name) {
    if (this.gameObjectArray[name] === undefined) {
      return []
    }
    return this.gameObjectArray[name]
  }

  gameObjKeys() {
    const keys = []
    for (const key in this.gameObjectArray) {
      keys.push(key)
    }
    return keys
  }
}

export default Event
