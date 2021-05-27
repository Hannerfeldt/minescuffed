import game from '../../index'

const addImage = (xOffset, yOffset, key, scale, origin, zIndex) => {
    const _this = game.scene.scenes[2]
    zIndex = zIndex || 10
    origin = origin || 0
    return _this.add.image(xOffset, yOffset, key).setScrollFactor(0).setScale(scale).setOrigin(origin).setDepth(zIndex)
}

export { addImage as default }
