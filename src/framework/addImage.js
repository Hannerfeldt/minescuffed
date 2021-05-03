import game from '../index'

const addImage = (x, y, src, z) => {
    const _this = game.scene.scenes[2]
    return _this.add.image(x, y, src).setDepth(z)
}

export { addImage as default}
