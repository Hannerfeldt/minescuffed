import exportGameScene from '../../exportGameScene'
import checkTile from '../checkTile'
import addImage from '../graphics/addImage'

const getCordsforAdjecent = (config) => {
    let { xPos, yPos, i } = config
    if (i % 2 == 0) return { x: 0, y: yPos + (i - 1) }
    else return { x: xPos + (i - 2), y: 0 }
}

const checkAdjacent = (xPos, yPos, tile) => {
    const game = exportGameScene()

    for (let i = 0; i < 4; i++) {
        const { x, y } = getCordsforAdjecent({xPos, yPos, i})
        const adjecent = checkTile(x, y)

        if (adjecent === undefined) return
        if (adjecent.key === tile.key) return

        if (game.tiles[tile.key].bordersHierarchy < game.tiles[adjecent.key].bordersHierarchy) {

            if (!adjecent.border) adjecent.border = []
            if (!game.borders[tile.key]) return

            const index = i < 2 ? i + 2 : i - 2
            adjecent.border[index] = addImage({
                x: x * 96,
                y: y * 96,
                key: game.borders[tile.key] + '_border',
                rotate: (-Math.PI / 2) + (index * Math.PI / 2),
                zIndex: 1,
            })
        } else {
            if (!tile.border) tile.border = []
            if (!game.borders[adjecent.key]) return

            tile.border[i] = addImage({
                x: x * 96,
                y: y * 96,
                key: game.borders[adjecent.key] + '_border',
                zIndex: 2
            })
        }
    }
}

export { checkAdjacent as default }
