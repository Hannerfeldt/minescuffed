import addImage from '../../../graphics/addImage'
import world from '../../../../data/world'

const addTile = (x, y, tile) => {
    if (tile.src) tile.src.destroy()
    tile.src = addImage({
        x: x * world.tileSize,
        y: y * world.tileSize,
        key: tile.key,
        zIndex: -1
    })
}

export { addTile as default }
