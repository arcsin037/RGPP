import RGPP from 'RGPP'

const CHIP_WIDTH = 32
const CHIP_HEIGHT = 32

const BasicDraw = RGPP.System.Graphics.BasicDraw
const ImageUtil = RGPP.System.Graphics.ImageUtil

let id = 0

export class Palette {
    constructor({img, onLoad}) {
        this.id = id++
        this.chipWidth = CHIP_WIDTH
        this.chipHeight = CHIP_HEIGHT
        this.col = 0
        this.row = 0

        this.onLoadImage = this.onLoadImage.bind(this)
        this.img = ImageUtil.loadImage(img, this.onLoadImage)
        this.onLoad = onLoad
    }

    onLoadImage() {
        this.width = this.img.width
        this.height = this.img.height
        this.col = Math.floor(this.width / this.chipWidth)
        this.row = Math.floor(this.height / this.chipHeight)

        this.onLoad()
    }

    onDraw (ctx) {
        BasicDraw.drawImage(ctx, this.img)
    }
}

export default Palette
