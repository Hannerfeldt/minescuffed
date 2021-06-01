import makeKey from '../makeKey'
import exportGameScene from '../../../exportGameScene'

const checkTile = (x, y) => {
    const game = exportGameScene()
    const key = makeKey(x, y)
    if (game.world[key] === undefined) return undefined
    return game.world[key].tile
}

export { checkTile as default }
