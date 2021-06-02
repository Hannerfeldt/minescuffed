import exportGameScene from '../../../../exportGameScene'
import addSrc from './addSrc'

const addStructure = (x, y, struct) => {
    const game = exportGameScene()

    addSrc(x, y, struct, game)

    // struct is solid, can't walk through it!
    if (game.structures[struct.key].solid !== undefined) {
        game.physics.add.existing(struct.src, true)
        //struct.src.body.setImmovable(true)
        struct.src.body.setSize(game.structures[struct.key].solid.w, game.structures[struct.key].solid.h, true)
        // struct.src.body.setOffset(game.structures[struct.key].offset.x, game.structures[struct.key].offset.y)
        game.solid.add(struct.src)
        struct.src.body.debugShowBody = false
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
