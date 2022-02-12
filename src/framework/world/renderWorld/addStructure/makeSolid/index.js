import world from '../../../../../data/world'

const makeSolid = (x, y, struct, game) => {
    const thing = game.structures[struct.key]
    let hitboxs = []
    thing.solid.forEach((e) => {
        const hitbox = game.physics.add.image(x * world.tileSize, y * world.tileSize)
        hitbox.setOrigin(0.5)
        game.physics.add.existing(hitbox, true)
        hitbox.body.setImmovable(true)
        hitbox.body.setSize(e.w, e.h, false)
        hitbox.body.setOffset(e.x, e.y)
        game.solid.add(hitbox)
        hitbox.body.debugShowBody = false
        hitboxs.push(hitbox)
    });
    struct.body = hitboxs
}

export { makeSolid as default }
