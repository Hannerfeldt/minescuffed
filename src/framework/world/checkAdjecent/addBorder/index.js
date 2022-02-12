import exportGameScene from '../../../../exportGameScene'
import addImage from '../../../graphics/addImage'
import world from '../../../../data/world'

const addBorder = (config) => {
    const game = exportGameScene()
    const { tile, key, x, y, i } = config

    if (!game.tiles[key].border) return
    if (!tile.border) tile.border = []

    tile.border[i] = addImage({
        x: x * world.tileSize,
        y: y * world.tileSize,
        key: key + '_border',
        rotation: (i * (-Math.PI / 2)),
        zIndex: 2,
    })
}

export { addBorder as default }
