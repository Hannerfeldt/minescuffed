import game from '../../index'

const createBackground = (xOffset, yOffset, text, fontSize, zIndex) => {
    const _this = game.scene.scenes[2]
    zIndex = zIndex || 10
    fontSize = fontSize || 20 + 'px'
    return _this.add.text(xOffset, yOffset, text, { fontSize }).setScrollFactor(0).setDepth(zIndex)
}

export { createBackground as default }
