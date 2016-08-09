import Graphics from '../Graphics'

const CHIP_WIDTH = 32
const CHIP_HEIGHT = 32

const BasicDraw = Graphics.BasicDraw
const ImageUtil = Graphics.ImageUtil

let id = 0

export class Palette {
    constructor({img, onLoad}) {
        this.id = id++
        this.chipWidth = CHIP_WIDTH
        this.chipHeight = CHIP_HEIGHT
        this.maxCol = 0
        this.maxRow = 0

        this.onLoadImage = this.onLoadImage.bind(this)
        this.paletteImage = ImageUtil.loadImage(img, this.onLoadImage)
        this.onLoad = onLoad
    }

    onLoadImage() {
        this.width = this.paletteImage.width
        this.height = this.paletteImage.height
        this.maxCol = Math.floor(this.width / this.chipWidth)
        this.maxRow = Math.floor(this.height / this.chipHeight)

        this.onLoad()
    }

    onDraw (ctx) {
        if (!ctx) {
            return
        }
        BasicDraw.drawImage(ctx, this.paletteImage)
    }
}

export default Palette
