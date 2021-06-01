import exportGameScene from '../../../exportGameScene'
import checkTile from '../../general/checkTile'
import getCordsforAdjecent from './getCordsforAdjecent'
import addBorder from './addBorder'

const checkAdjacent = (xPos, yPos, tile) => {
    const game = exportGameScene()

    for (let i = 0; i < 4; i++) {
        const { x, y } = getCordsforAdjecent(xPos, yPos, i)
        const adjecent = checkTile(x, y)

        if (adjecent === undefined) continue
        if (adjecent.key === tile.key) continue

        let config
        if (game.tiles[tile.key].bordersHierarchy < game.tiles[adjecent.key].bordersHierarchy) {
            config = { tile: adjecent, key: tile.key, x, y, i }
        } else {
            const index = i < 2 ? i + 2 : i - 2
            config = { tile, key: adjecent.key, x: xPos, y: yPos, i: index }
        }

        addBorder(config)
    }
}

export { checkAdjacent as default }
