/**
 * @class 2D Vector
 * @author arcsin
 */
class Vector2 {
    constructor({
        x = 0,
        y = 0
    } = {}) {
        this.x = x
        this.y = y
    }

    norm() {
        const squareLength = Vector2.dot(this, this)
        return Math.sqrt(squareLength)
    }

    normalize() {
        const length = this.norm()
        this.x = this.x / length
        this.y = this.y / length
    }

    /* static */
    static add(vecA, vecB) {
        const resultX = vecA.x + vecB.x
        const resultY = vecA.y + vecB.y
        return new Vector2({
            x: resultX,
            y: resultY
        })
    }

    static sub(vecA, vecB) {
        const resultX = vecA.x - vecB.x
        const resultY = vecA.y - vecB.y
        return new Vector2({
            x: resultX,
            y: resultY
        })
    }

    static dot(vecA, vecB) {
        return vecA.x * vecB.x + vecA.y * vecB.y
    }

    static distanceSquare(vecA, vecB) {
        const subVec = Vector2.sub(vecA, vecB)
        return Vector2.dot(subVec, subVec)
    }

    static distance(vecA, vecB) {
        return Math.sqrt(Vector2.distanceSquare(vecA, vecB))
    }

    static multScalar(multValue, vec) {
        return new Vector2({
            x: vec.x * multValue,
            y: vec.y * multValue
        })
    }

    static negated(vec) {
        return new Vector2({
            x: -vec.x,
            y: -vec.y
        })
    }

}

export default Vector2
