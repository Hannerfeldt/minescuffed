import makeKey from '../general/makeKey'
import game from '../../index'
import renderWorld from './renderWorld'

const rememberWorld = (x, y) => {
    const _this = game.scene.scenes[2]
    const key = makeKey(x.toString(), y.toString())
    _this.world[key].inView = true
    renderWorld(x, y, _this.world[key])
}

export { rememberWorld as default }
