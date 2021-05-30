import exportGameScene from '../../exportGameScene'

const addImage = (config) => {
    const game = exportGameScene()

    const image = game.add.image(config.x, config.y, config.key)

    config.scrollFactor ? image.setScrollFactor(0) : ''
    image.setOrigin(config.origin || 0.5)
    image.setDepth(config.zIndex ?? 10)
    config.scale ? image.setScale(config.scale) : ''
    config.tint ? image.setTint(config.tint) : ''
    config.blendMode ? image.setBlendMode(config.blendMode) : ''
    config.rotation ? image.rotation = config.rotation : ''

    return image
}

export { addImage as default }
