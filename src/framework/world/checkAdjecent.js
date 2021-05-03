import game from '../../index'
import checkTile from '../checkTile'
import addImage from '../addImage'

const checkAdjacent = (x, y, tile) => {
    const _this = game.scene.scenes[2]

    for (let i = 0; i < 4; i++) {
        let xDir = 0
        let yDir = 0
        i % 2 == 0 ? yDir += (i - 1) : xDir += (i - 2)
        const adjecent = checkTile(x + xDir, y + yDir)
        if (adjecent !== undefined) {
            const tileDiff = adjecent.key !== tile.key
            if (tileDiff) {
                if (_this.tiles[tile.key].bordersHierarchy < _this.tiles[adjecent.key].bordersHierarchy) {
                    if (!adjecent.border) adjecent.border = []
                    if (_this.borders[tile.key]) {
                        adjecent.border[i < 2 ? i + 2 : i - 2] = addImage((x + xDir) * 96, (y + yDir) * 96, _this.borders[tile.key][i < 2 ? i + 2 : i - 2], -1)
                    }
                } else {
                    if (!tile.border) tile.border = []
                    if (_this.borders[adjecent.key]) {
                        tile.border[i] = addImage(x * 96, y * 96, _this.borders[adjecent.key][i], 1)
                    }
                }
            }
        }

    }
}

export { checkAdjacent as default }
