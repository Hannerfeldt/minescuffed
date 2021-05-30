import makeKey from './general/makeKey'
import game from '../index'

const checkTile = (x, y) => {
    const key = makeKey(x, y)
    const _this = game.scene.scenes[2]
    if (_this.world[key] == undefined) return undefined
    return _this.world[key].tile
}

export { checkTile as default }
