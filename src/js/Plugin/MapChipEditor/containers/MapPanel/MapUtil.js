import {
    drawImage
} from 'RGPP/System/Graphics/Base/BasicDraw'

/*
export const drawMap = (ctx, props) => {
    const {
        mapData,
        palettesData,
        currentLayerNo
    } = props

    if (!mapData || !palettesData) {
        return
    }

    const col = mapData.col
    const row = mapData.row
    const mapChipWidth = mapData.cellWidth
    const mapChipHeight = mapData.cellHeight
    const mapLayers = mapData.layers
    const maxLayerNum = mapLayers.length

    for (let layerNo = 0; layerNo < maxLayerNum; layerNo += 1) {
        if (layerNo !== currentLayerNo && currentLayerNo < maxLayerNum) {
            ctx.globalAlpha = 0.5
        } else {
            ctx.globalAlpha = 1.0
        }
        const layer = mapLayers[layerNo]
        for (let y = 0; y < row; y += 1) {
            for (let x = 0; x < col; x += 1) {
                const chipSetDataID = layer.chipSetDataID(x, y)
                const chipSetNo = layer.chipSetNo(x, y)
                if (chipSetDataID >= 0 && chipSetNo >= 0) {
                    const palette = palettesData[chipSetDataID]
                    const paletteCol = palette.col
                    const paletteChipWidth = palette.chipWidth
                    const paletteChipHeight = palette.chipHeight
                    const chipX = (chipSetNo % paletteCol) * paletteChipWidth
                    const chipY = Math.floor(chipSetNo / paletteCol) * paletteChipHeight
                    const option = {
                        sx: chipX,
                        sy: chipY,
                        sw: paletteChipWidth,
                        sh: paletteChipHeight,
                        dx: x * mapChipWidth,
                        dy: y * mapChipHeight,
                        dw: mapChipWidth,
                        dh: mapChipHeight
                    }
                    drawImage(ctx, palette.img, option)
                }
            }
        }
    }
}
*/

/*
export const drawVirtualImage = (ctx, props) => {
    const {
        mapData,
        selectedPalette,
        palettesData
    } = props

    const paletteId = selectedPalette.id
    const selectedPaletteData = palettesData[paletteId]
    if (!selectedPaletteData) {
        return
    }

    const paletteImg = selectedPaletteData.img
    const paletteChipWidth = selectedPaletteData.chipWidth
    const paletteChipHeight = selectedPaletteData.chipHeight

    const scaleX = mapData.cellWidth / paletteChipWidth
    const scaleY = mapData.cellHeight / paletteChipHeight

    ctx.globalAlpha = 0.5

    const startPixelX = selectedPalette.startX * paletteChipWidth
    const startPixelY = selectedPalette.startY * paletteChipHeight
    const specifyRangePixelX = selectedPalette.specifyRangeX * paletteChipWidth
    const specifyRangePixelY = selectedPalette.specifyRangeY * paletteChipHeight

    const option = {
        sx: startPixelX,
        sy: startPixelY,
        sw: specifyRangePixelX,
        sh: specifyRangePixelY,
        dx: mapPanel.mouseCellX * mapData.cellWidth,
        dy: mapPanel.mouseCellY * mapData.cellHeight,
        dw: specifyRangePixelX * scaleX,
        dh: specifyRangePixelY * scaleY
    }
    drawImage(ctx, paletteImg, option)
}
*/
