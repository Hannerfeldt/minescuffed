import game from '../index'
import addImage from './addImage'

const drop = (x, y, obj) => {
    const _this = game.scene.scenes[2]
    // if it dropped or not
    if (Math.random() > obj.chance) return
    // chance per quantity
    let dropAmount = obj.quantity
    if (obj.chanceDivided) {
        let rand = Math.random()
        rand = rand == 0 ? 0.0000001 : rand
        dropAmount = Math.ceil(rand / (1 / obj.quantity))
    }
    
    for (let i = 0; i < dropAmount; i++) {
        const loot = addImage(x * 96 + ((Math.random() * 48) - 24), (y) * 96 + ((Math.random() * 48) - 24), _this.items[obj.key].key, 0)
        _this.physics.add.existing(loot)
        loot.body.setSize(20, 20)
        loot.body.debugShowBody = false
        _this.physics.add.overlap(_this.player, loot, () => {
            _this.player.bag.add(obj.key), loot.destroy()
        }, () => _this.player.bag.canPickUp(), _this)
    }
}

export { drop as default }
