const makeSolid = (x, y, struct, game) => {
    const thing = game.structures[struct.key]
    let hitboxs = []
    thing.solid.forEach((e) => {
        const hitbox = game.physics.add.image(x * 96, y * 96)
        hitbox.setOrigin(0.5)
        game.physics.add.existing(hitbox, true)
        hitbox.body.setImmovable(true)
        hitbox.body.setSize(e.w, e.h, false)
        hitbox.body.setOffset(e.x, e.y)
        game.solid.add(hitbox)
        hitbox.body.debugShowBody = true
        hitboxs.push(hitbox)
    });
    struct.body = hitboxs
}

export { makeSolid as default }
