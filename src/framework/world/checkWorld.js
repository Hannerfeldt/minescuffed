import generateWorld from './generateWorld'
import rememberWorld from './rememberWorld'
import makeKey from '../general/makeKey'

const checkWorld = (game) => {
    for (let col = Math.round(game.cameras.main.worldView.left / 96); col < Math.round(game.cameras.main.worldView.right / 96); col++) {
        for (let row = Math.round(game.cameras.main.worldView.top / 96); row < Math.round(game.cameras.main.worldView.bottom / 96); row++) {
            const key = makeKey(col.toString(), row.toString())
            if (!game.world[key]) generateWorld(col, row)
            else if (!game.world[key].inView) rememberWorld(col, row)
        }
    }
}

export { checkWorld as default }
