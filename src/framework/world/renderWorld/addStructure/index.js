import exportGameScene from '../../../../exportGameScene'
import addSrc from './addSrc'
import makeSolid from './makeSolid'

const addStructure = (x, y, struct) => {
    const game = exportGameScene()

    addSrc(x, y, struct, game)

    // struct is solid, can't walk through it!
    if (game.structures[struct.key].solid !== undefined) {
        makeSolid(x, y, struct, game)
    }

    //
    if (game.structures[struct.key].rotation !== undefined) {
        struct.src.setFrame(struct.rotate)
    }

    // struct is mineable, you can gather from it!
    if (game.structures[struct.key].mineduration !== undefined) {
        struct.src.setInteractive()
        struct.src.on('pointerdown', (e) => {
            game.player.gather(x, y, game.structures[struct.key])
        })
    }

    // struct has an interaction, you can interact with it!
    if (game.structures[struct.key].interaction !== undefined) {
        struct.interaction = game.setInteraction(game.structures[struct.key].interaction)
    }
}

export { addStructure as default }
