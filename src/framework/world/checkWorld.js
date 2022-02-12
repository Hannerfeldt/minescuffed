import generateWorld from './generateWorld'
import rememberWorld from './rememberWorld'
import makeKey from '../general/makeKey'

/* Render whatever is in the view of the camera */
const checkWorld = (game) => {
    const tileSize = 32;
    const left = Math.round((game.cameras.main.worldView.left - tileSize) / tileSize);
    const right = Math.round((game.cameras.main.worldView.right + tileSize * 2) / tileSize);
    const top = Math.round((game.cameras.main.worldView.top - tileSize) / tileSize);
    const bottom = Math.round((game.cameras.main.worldView.bottom + tileSize * 2) / tileSize);

    for (let col = left; col < right; col++) {
        for (let row = top; row < bottom; row++) {
            const key = makeKey(col, row)
            if (!game.world[key]) generateWorld(col, row)
            else if (!game.world[key].inView) rememberWorld(col, row)
        }
    }
}

export { checkWorld as default }
