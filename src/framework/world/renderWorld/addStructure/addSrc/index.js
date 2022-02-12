import addImage from '../../../../graphics/addImage'
import world from '../../../../../data/world'

const addSrc = (x, y, struct, game) => {
    if (struct.src) struct.src.destroy()
    /* @TODO clean this up */
    if (game.structures[struct.key].animation !== undefined) struct.src = game.add.sprite(x * world.tileSize, y * world.tileSize, game.structures[struct.key].key).setDepth(2).anims.play(game.structures[struct.key].animation['start'])
    else if (game.structures[struct.key].rotation !== undefined) struct.src = game.add.sprite(x * world.tileSize, y * world.tileSize, game.structures[struct.key].key).setDepth(2)
    else {
        struct.src = addImage({
            x: x * world.tileSize,
            y: y * world.tileSize,
            key: game.structures[struct.key].key,
            zIndex: 2,
        })
    }
    struct.src.setOrigin(
        game.structures[struct.key].origin.x,
        game.structures[struct.key].origin.y
    )
}

export { addSrc as default }
