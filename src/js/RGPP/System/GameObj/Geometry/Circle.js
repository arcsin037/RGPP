import Geometry from './Geometry'
import Vector2 from 'RGPP/System/Utils/Vector2'

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
        this.velocity = Vector2.add(this.velocity, velocity)
    }

    move() {
        this.pos = Vector2.add(this.pos, this.velocity)
    }

    moveVector(pos) {
        this.pos = Vector2.add(this.pos, pos)
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
        this.maxPushVector = new Vector2()
        this.minPushVector = new Vector2()
        this.maxParallelVelocity = new Vector2()
        this.minParallelVelocity = new Vector2()
        this.maxPerpendicularVelocity = new Vector2()
        this.minPerpendicularVelocity = new Vector2()
    }

    setMinMaxPushVector(pushVector) {
        if (pushVector.x > 0) {
            this.maxPushVector.x = Math.max(pushVector.x, this.maxPushVector.x)
        } else if (pushVector.x < 0) {
            this.minPushVector.x = Math.min(pushVector.x, this.minPushVector.x)
        }

        if (pushVector.y > 0) {
            this.maxPushVector.y = Math.max(pushVector.y, this.maxPushVector.y)
        } else if (pushVector.y < 0) {
            this.minPushVector.y = Math.min(pushVector.y, this.minPushVector.y)
        }

    }

    setMinMaxVelocity(parallelLineOfActionVelocity, perpendicularLineOfActionVelocity) {
        if (parallelLineOfActionVelocity.x > 0) {
            this.maxParallelVelocity.x = Math.max(parallelLineOfActionVelocity.x, this.maxParallelVelocity.x)
        } else if (parallelLineOfActionVelocity.x < 0) {
            this.minParallelVelocity.x = Math.min(parallelLineOfActionVelocity.x, this.minParallelVelocity.x)
        }

        if (parallelLineOfActionVelocity.y > 0) {
            this.maxParallelVelocity.y = Math.max(parallelLineOfActionVelocity.y, this.maxParallelVelocity.y)
        } else if (parallelLineOfActionVelocity.y < 0) {
            this.minParallelVelocity.y = Math.min(parallelLineOfActionVelocity.y, this.minParallelVelocity.y)
        }

        if (perpendicularLineOfActionVelocity.x > 0) {
            this.maxPerpendicularVelocity.x = Math.max(perpendicularLineOfActionVelocity.x, this.maxPerpendicularVelocity.x)
        } else if (perpendicularLineOfActionVelocity.x < 0) {
            this.minPerpendicularVelocity.x = Math.min(perpendicularLineOfActionVelocity.x, this.minPerpendicularVelocity.x)
        }

        if (perpendicularLineOfActionVelocity.y > 0) {
            this.maxPerpendicularVelocity.y = Math.max(perpendicularLineOfActionVelocity.y, this.maxPerpendicularVelocity.y)
        } else if (perpendicularLineOfActionVelocity.y < 0) {
            this.minPerpendicularVelocity.y = Math.min(perpendicularLineOfActionVelocity.y, this.minPerpendicularVelocity.y)
        }

    }

    correctPushVector() {
        return Vector2.add(this.maxPushVector, this.minPushVector)
    }

    correctParallelVelocity() {
        return Vector2.add(this.maxParallelVelocity, this.minParallelVelocity)
    }

    correctPerpendicularVelocity() {
        return Vector2.add(this.maxPerpendicularVelocity, this.minPerpendicularVelocity)
    }

}

export default Circle
