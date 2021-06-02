import exportGameScene from '../../exportGameScene'
import renderWorld from '../world/renderWorld/index'
import makeKey from '../general/makeKey'

const grow = (evolve, cords) => {
    const game = exportGameScene()
    const { x, y } = cords
    const key = makeKey(x, y)
    game.world[key].structure.key = evolve

    renderWorld(x, y, game.world[key])
}

export { grow as default }
