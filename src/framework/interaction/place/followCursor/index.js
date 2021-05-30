import convertCordToTileFormat from '../../../general/convertCordToTileFormat'
import makeKey from '../../../general/makeKey'
import exportGameScene from '../../../../exportGameScene'

const followCursor = (event, player, blueprintImg) => {
    const game = exportGameScene()

    blueprintImg.x = convertCordToTileFormat(event.worldX) * 96
    blueprintImg.y = convertCordToTileFormat(event.worldY) * 96
    const key = makeKey(convertCordToTileFormat(event.worldX), convertCordToTileFormat(event.worldY))
    if (!rangeCheckTile(player.x, player.y, event.worldX, event.worldY) || (game.world[key].structure)) blueprintImg.setTint(0xff5565)
    else blueprintImg.setTint(0xfff00f)
}

export { followCursor as default }
