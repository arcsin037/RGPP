/**
 * EventState Object
 *
 * @class EventState
 * @author arcsin
 * @constructor
 * @param spec
 * @param spec.id {Number} Event State ID
 * @param spec.name {String} Event State Name
 */

class EventState {
    constructor({
        id,
        name
    } = {}) {
        this.id = id
        this.name = name
        this.scripts = []
    }

    addScript(scriptID) {
        const scriptData = ScriptDB.createObj(scriptID);
        scripts.push(scriptData)
    }

    removeScript(scriptID) {
        const scriptData = ScriptDB.createObj(scriptID);
        scripts.push(scriptData)
    }

    onLoadGame(event) {
        this.scripts.forEach((script) => {
            script.onLoadGame(event)
        })
    }

    onLoadMap(event) {
        this.scripts.forEach((script) => {
            script.onLoadMap(event)
        })
    }

    onStateTransition(event) {
        this.scripts.forEach((script) => {
            script.onStateTransition(event)
        })
    }

    reaction(event) {
        this.scripts.forEach((script) => {
            script.reaction(event)
        })
    }

    update(event) {
        this.scripts.forEach((script) => {
            script.update(event)
        })
    }

    debugUpdate(event) {
        this.scripts.forEach((script) => {
            script.debugUpdate(event)
        })
    }

    draw(ctx) {
        this.scripts.forEach((script) => {
            ctx.save()
            script.draw(ctx)
            ctx.restore()
        })
    }

    debugDraw(ctx) {
        this.scripts.forEach((script) => {
            ctx.save();
            script.debugDraw(ctx);
            ctx.restore();
        }
    }



    removeScript() {
        if (mScriptDataIDs.length > 1) {
            mScriptDataIDs.pop();
            mScripts.pop();
        }
    }
}
