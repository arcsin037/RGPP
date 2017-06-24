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

export const drawImage = (ctx, img, option) => {
  if (!option) {
    ctx.drawImage(img, 0, 0)
    return
  }
  const {
        sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height,
        dx = 0,
        dy = 0,
        dw = img.width,
        dh = img.height
    } = option
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
}
