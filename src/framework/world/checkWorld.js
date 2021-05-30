import generateWorld from './generateWorld'
import rememberWorld from './rememberWorld'
import makeKey from '../general/makeKey'

const checkWorld = (_this) => {
    for (let col = Math.round(_this.cameras.main.worldView.left / 96); col < Math.round(_this.cameras.main.worldView.right / 96); col++) {
        for (let row = Math.round(_this.cameras.main.worldView.top / 96); row < Math.round(_this.cameras.main.worldView.bottom / 96); row++) {
            const key = makeKey(col.toString(), row.toString())
            if (!_this.world[key]) generateWorld(col, row)
            else if (!_this.world[key].inView) rememberWorld(col, row)
        }
    }
}

export { checkWorld as default }
