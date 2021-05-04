import tiles from '../../data/tiles'
import addImage from '../addImage'
import game from '../../index'
import checkAdjacent from './checkAdjecent'


const renderWorld = (x, y, world) => {
    const _this  = game.scene.scenes[2]
    const tile = world.tile
    tile.src = addImage(x * 96, y * 96, _this.tiles[tile.key].key, -1)

    // unsure of _this
    // _this.tiles[tile.key].group.add(tile.src)

    checkAdjacent(x, y, world.tile)

    // if tile has structure handle it here
    if (world.structure !== undefined) {
        const struct = world.structure
        if (_this.structures[struct.key].animation !== undefined) struct.src = _this.add.sprite(x * 96, y * 96, _this.structures[struct.key].key).setDepth(2).anims.play(_this.structures[struct.key].animation['start'])
        else if (_this.structures[struct.key].rotation !== undefined) struct.src = _this.add.sprite(x * 96, y * 96, _this.structures[struct.key].key).setDepth(2)
        else struct.src = addImage(x * 96, y * 96, _this.structures[struct.key].key, 2)
        struct.src.setOrigin(_this.structures[struct.key].origin.x, _this.structures[struct.key].origin.y)
        // struct is solid, can't walk through it!
        if (_this.structures[struct.key].solid !== undefined) {
            _this.physics.add.existing(struct.src, true)
            //struct.src.body.setImmovable(true)
            struct.src.body.setSize(_this.structures[struct.key].solid.w, _this.structures[struct.key].solid.h, true)
            // struct.src.body.setOffset(_this.structures[struct.key].offset.x, _this.structures[struct.key].offset.y)
            _this.solid.add(struct.src)
            struct.src.body.debugShowBody = false
        }
        //
        if (_this.structures[struct.key].rotation !== undefined) {
            struct.src.setFrame(struct.rotate)
        }
        // struct is mineable, you can gather from it!
        if (_this.structures[struct.key].mineduration !== undefined) {
            struct.src.setInteractive()
            struct.src.on('pointerdown', (e) => {
                _this.player.gather(x, y, _this.structures[struct.key])
            })
        }
        // struct has an interaction, you can interact with it!
        if (_this.structures[struct.key].interaction !== undefined) {
            struct.interaction = _this.setInteraction(_this.structures[struct.key].interaction)
        }
    }
}

export { renderWorld as default }
