import rangeCheckTile from '../rangeCheck/rangeCheckTile'
import exportGameScene from '../../../../exportGameScene'
import makeKey from '../../../general/makeKey'
import convertCordToTileFormat from '../../../general/convertCordToTileFormat'
import renderWorld from '../../../world/renderWorld/index'
import adaptStructure from '../adaptStructure'

const placeStructure = (e, costs, blueprintImg, craft) => {
    const game = exportGameScene()
    const player = game.player
    if (!rangeCheckTile(player.x, player.y, e.worldX, e.worldY)) return
    const x = convertCordToTileFormat(e.worldX)
    const y = convertCordToTileFormat(e.worldY)
    const key = makeKey(x, y)

    if (game.world[key].structure) return

    game.input.off('pointerdown')
    game.input.off('pointermove')

    const { alarm } = game.structures[craft.key]
    /*
    e.time has to be mapped or else the array is just a reference
    and any update to the reference is saved to the original array
    */
    if (alarm) alarm.forEach(e => game.clock.setAlarm(e.time.map((e) => e), e.fn, { x, y }))

    if (craft.rotations) game.keyboard.R.destroy()

    game.world[key].structure = {}

    game.world[key].structure.key = blueprintImg.texture.key
    blueprintImg.destroy()

    costs.forEach(c => player.bag.reduce(c.key, c.cost))
    const adaptable = game.crafts[craft.key]?.adaptable
    if (adaptable) return adaptStructure(x, y, craft.name, adaptable, game.world, true)

    renderWorld(x, y, game.world[key])
}

export { placeStructure as default }
