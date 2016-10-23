import GameObjBase from '../GameObjBase'

class Geometry extends GameObjBase {
    constructor({
        pos,
        velocity,
        width,
        height
    }) {
        super()
        this.isHit = false
        this.pos = pos
        this.velocity = velocity
        this.width = width
        this.height = height
    }

    resetHit() {
        this.isHit = false
    }
}

export default Geometry
