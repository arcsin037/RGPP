/**
 * System module
 * @module GameObjBase
 * @namespace RGPP.System
 */

class GameObjBase {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    update() {}

    draw(ctx) {}

    debugDraw(ctx) {}

    sortFunction(a, b) {
        return 0
    }
}

export default GameObjBase
