import addImage from '../../graphics/addImage'
import followCursor from './followCursor'
import exportGameScene from '../../../exportGameScene'
import rotate from './rotate'

const place = (craft, costs) => {
    const game = exportGameScene()
    game.player.bag.close()

    const blueprintImg = addImage({
        x: 0,
        y: 0,
        key: craft.key,
        blendMode: 'SCREEN',
        tint: 0xfff00f,
    })

    if (craft.rotations) rotate(craft.rotations, blueprintImg)

    game.input.activePointer.isDown = false
    game.input.on('pointermove', (event) => followCursor(event, game.player, blueprintImg))
    game.input.on('pointerdown', (event) => placeBuilding(event, costs))
}

export { place as default }
