export const drawLine = (ctx, fromX, fromY, toX, toY) => {
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()
}

export const drawRect = (ctx, dstX, dstY, width, height, lineWidth) => {
    ctx.save()
    ctx.lineWidth = lineWidth
    ctx.strokeRect(dstX, dstY, width, height)
    ctx.restore()
}

export const setColor = (ctx, r, g, b, a) => {
    ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
}

export const clear = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const drawImage = (ctx, img) => {
    ctx.drawImage(img, 0, 0)
}

export const loadImage = (imgPath) => {
    const img = new Image()
    img.src = `${imgPath}?${new Date().getTime()}`
    return img
}
