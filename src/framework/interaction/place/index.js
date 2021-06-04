import addImage from '../../graphics/addImage'
import followCursor from './followCursor'
import placeStructure from './placeStructure'
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
        origin: game.structures[craft.key].origin
    })

    if (craft.rotations) rotate(craft.rotations, blueprintImg)


    game.input.activePointer.isDown = false
    game.input.on('pointermove', (e) => followCursor(e, game.player, blueprintImg))
    game.input.on('pointerdown', (e) => placeStructure(e, costs, blueprintImg, craft))
}

export { place as default }
