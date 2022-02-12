import convertCordToTileFormat from '../../../general/convertCordToTileFormat'
import makeKey from '../../../general/makeKey'
import exportGameScene from '../../../../exportGameScene'
import rangeCheckTile from '../rangeCheck/rangeCheckTile'
import world from '../../../../data/world'

const followCursor = (e, player, blueprintImg) => {
    const game = exportGameScene()
    blueprintImg.x = convertCordToTileFormat(e.worldX) * world.tileSize
    blueprintImg.y = convertCordToTileFormat(e.worldY) * world.tileSize
    const key = makeKey(convertCordToTileFormat(e.worldX), convertCordToTileFormat(e.worldY))
    if (!rangeCheckTile(player.x, player.y, e.worldX, e.worldY) || (game.world[key].structure)) blueprintImg.setTint(0xff5565)
    else blueprintImg.setTint(0xfff00f)

}

export { followCursor as default }
