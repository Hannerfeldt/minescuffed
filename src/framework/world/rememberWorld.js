import makeKey from '../general/makeKey'
import exportGameScene from '../../exportGameScene'
import renderWorld from './renderWorld'

const rememberWorld = (x, y) => {
    const game = exportGameScene()
    const key = makeKey(x, y)
    game.world[key].inView = true
    renderWorld(x, y, game.world[key])
}

export { rememberWorld as default }
