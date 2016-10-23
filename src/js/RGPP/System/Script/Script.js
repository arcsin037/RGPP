 /**
  * Script Base
  * @class Script
  * @author arcsin
  * @constructor
  */
 class Script {
     /*eslint no-unused-vars: ["error", { "args": "none" }]*/

     // "onLoadGame" is called when the game is loaded.
     onLoadGame(event) {
         // scriptUtil.outputMsgToConsole("Script 'onLoadGame' is not defined!")
     }

     // "onLoadMap" is called when the map is loaded.
     onLoadMap(event) {
         // scriptUtil.outputMsgToConsole("Script 'onLoadMap' is not defined!")
     }

     // "state transition" is called when the game is loaded.
     onStateTransition(event) {
         // scriptUtil.outputMsgToConsole("Script 'onStateTransition' is not defined!")
     }

     reaction(event) {
         // scriptUtil.outputMsgToConsole("Script 'reaction' is not defined!")
     }

     update(event) {
         // scriptUtil.outputMsgToConsole("Script 'update' is not defined!")
     }

     debugUpdate(event) {
         // scriptUtil.outputMsgToConsole("Script 'debugUpdate' is not defined!")

     }

     draw(ctx) {
         // scriptUtil.outputMsgToConsole("Script 'draw' is not defined!")
     }

     debugDraw(ctx) {
         // scriptUtil.outputMsgToConsole("Script 'debugDraw' is not defined!")
     }

     loadChangeableValuesPerEvent() {
         // scriptUtil.outputMsgToConsole("Script 'loadChangeableValuesPerEvent' is not defined!")
         return []
     }

     loadChangeableValuesPerScript() {
         // scriptUtil.outputMsgToConsole("Script 'loadChangeableValuesPerScript' is not defined!")
         return []
     }

 }
 export default Script
