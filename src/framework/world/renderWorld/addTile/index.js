import addImage from '../../../graphics/addImage'

const addTile = (x, y, tile) => {
    if (tile.src) tile.src.destroy()
    tile.src = addImage({
        x: x * 96,
        y: y * 96,
        key: tile.key,
        zIndex: -1
    })
}

export { addTile as default }
