import game from '../../index'

const createBackground = (x, y, w, h, c, z) => {
    const _this = game.scene.scenes[2]
    const zIndex = z || 10
    return _this.add.rectangle(x, y, w, h, c).setScrollFactor(0, 0).setOrigin(0).setDepth(zIndex)
}

export { createBackground as default }
