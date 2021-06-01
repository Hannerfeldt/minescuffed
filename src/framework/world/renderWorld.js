import tiles from '../../data/tiles'
import addImage from '../graphics/addImage'
import exportGameScene from '../../exportGameScene'
import checkAdjacent from './checkAdjecent/index'

const renderWorld = (x, y, world) => {
    const game = exportGameScene()
    const tile = world.tile

    tile.src = addImage({
        x: x * 96,
        y: y * 96,
        key: game.tiles[tile.key].key,
        zIndex: -1
    })

    checkAdjacent(x, y, world.tile)

    if (world.structure !== undefined) {
        const struct = world.structure
        if (game.structures[struct.key].animation !== undefined) struct.src = game.add.sprite(x * 96, y * 96, game.structures[struct.key].key).setDepth(2).anims.play(game.structures[struct.key].animation['start'])
        else if (game.structures[struct.key].rotation !== undefined) struct.src = game.add.sprite(x * 96, y * 96, game.structures[struct.key].key).setDepth(2)
        else struct.src = addImage({
            x: x * 96,
            y: y * 96,
            key: game.structures[struct.key].key,
            zIndex: 2,
        })
        struct.src.setOrigin(game.structures[struct.key].origin.x, game.structures[struct.key].origin.y)
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
}

export { renderWorld as default }
