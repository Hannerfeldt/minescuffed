import rangeCheckTile from '../rangeCheck/rangeCheckTile'
import exportGameScene from '../../../../exportGameScene'
import makeKey from '../../../general/makeKey'
import convertCordToTileFormat from '../../../general/convertCordToTileFormat'
import followCursor from '../followCursor'

const placeBuilding = (e, costs) => {
    const game = exportGameScene()
    const player = game.player

    if (rangeCheckTile(player.x, player.y, e.worldX, e.worldY)) return

    const key = makeKey(convertCordToTileFormat(e.worldX), convertCordToTileFormat(e.worldY))

    if (game.world[key].structure) return

    game.input.removeListener('pointerdown', placeBuilding)
    game.input.removeListener('pointermove', followCursor)

    game.world[key].structure = {}
    game.world[key].structure.key = blueprintImg.texture.key
    if (craft.rotations) game.keyboard.R.destroy()
    blueprintImg.destroy()

    renderWorld(convertCordToTileFormat(e.worldX), convertCordToTileFormat(e.worldY), game.world[key])

    costs.forEach(c => player.bag.reduce(c.key, c.cost))
}

export { placeBuilding as default }
