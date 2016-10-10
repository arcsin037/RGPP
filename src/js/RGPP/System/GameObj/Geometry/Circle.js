import Geometry from './Geometry'
/**
 * Geometry Circle
 *
 * @class Circle
 * @author arcsin
 * @constructor
 */
class Circle extends Geometry {
    constructor({
        radius
    }) {
        super()
        this.radius = radius
        this.diameter = radius * 2.0
    }

    setRadius(radius) {
        this.radius = radius
        this.diameter = radius * 2.0
    }

    width() {
        return this.diameter
    }

    height() {
        return this.diameter
    }

    radius() {
        return this.radius
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
        ctx.stroke()
    }


    addVelocity(velocity) {
        this.velocity = RGPP.System.VectorOperator.getInstance().Vec2.add(this.velocity, velocity)
    }

    move() {
        this.pos = RGPP.System.VectorOperator.getInstance().Vec2.add(this.pos, this.velocity)
    }

    moveVector(pos) {
        this.pos = RGPP.System.VectorOperator.getInstance().Vec2.add(this.pos, pos)
    }

    correctPos() {
        this.moveVector(this.correctPushVector())
    }

    correctVelocity() {
        this.addVelocity(this.correctParallelVelocity())
        this.addVelocity(this.correctPerpendicularVelocity())
    }

    referenceLength() {
        return this.radius
    }

    initMinMax() {
        this.maxPushVector = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
        this.minPushVector = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
        this.maxParallelVelocity = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
        this.minParallelVelocity = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
        this.maxPerpendicularVelocity = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
        this.minPerpendicularVelocity = RGPP.System.Vector2({
            x: 0,
            y: 0
        })
    }

    setMinMaxPushVector(pushVector) {
        if (pushVector.x > 0) {
            this.maxPushVector.x = Math.max(pushVector.x, this.maxPushVector.x)
        }
        else if (pushVector.x < 0) {
            this.minPushVector.x = Math.min(pushVector.x, this.minPushVector.x)
        }

        if (pushVector.y > 0) {
            this.maxPushVector.y = Math.max(pushVector.y, this.maxPushVector.y)
        }
        else if (pushVector.y < 0) {
            this.minPushVector.y = Math.min(pushVector.y, this.minPushVector.y)
        }

    }

    setMinMaxVelocity(parallelLineOfActionVelocity, perpendicularLineOfActionVelocity) {

        if (parallelLineOfActionVelocity.x > 0) {
            this.maxParallelVelocity.x = Math.max(parallelLineOfActionVelocity.x, this.maxParallelVelocity.x)
        }
        else if (parallelLineOfActionVelocity.x < 0) {
            this.minParallelVelocity.x = Math.min(parallelLineOfActionVelocity.x, this.minParallelVelocity.x)
        }

        if (parallelLineOfActionVelocity.y > 0) {
            this.maxParallelVelocity.y = Math.max(parallelLineOfActionVelocity.y, this.maxParallelVelocity.y)
        }
        else if (parallelLineOfActionVelocity.y < 0) {
            this.minParallelVelocity.y = Math.min(parallelLineOfActionVelocity.y, this.minParallelVelocity.y)
        }

        if (perpendicularLineOfActionVelocity.x > 0) {
            this.maxPerpendicularVelocity.x = Math.max(perpendicularLineOfActionVelocity.x, this.maxPerpendicularVelocity.x)
        }
        else if (perpendicularLineOfActionVelocity.x < 0) {
            this.minPerpendicularVelocity.x = Math.min(perpendicularLineOfActionVelocity.x, this.minPerpendicularVelocity.x)
        }

        if (perpendicularLineOfActionVelocity.y > 0) {
            this.maxPerpendicularVelocity.y = Math.max(perpendicularLineOfActionVelocity.y, this.maxPerpendicularVelocity.y)
        }
        else if (perpendicularLineOfActionVelocity.y < 0) {
            this.minPerpendicularVelocity.y = Math.min(perpendicularLineOfActionVelocity.y, this.minPerpendicularVelocity.y)
        }

    }

    correctPushVector() {
        return RGPP.System.VectorOperator.getInstance().Vec2.add(this.maxPushVector, this.minPushVector)
    }

    correctParallelVelocity() {
        return RGPP.System.VectorOperator.getInstance().Vec2.add(this.maxParallelVelocity, this.minParallelVelocity)
    }

    correctPerpendicularVelocity() {
        return RGPP.System.VectorOperator.getInstance().Vec2.add(this.maxPerpendicularVelocity, this.minPerpendicularVelocity)
    }

}

export default Circle
