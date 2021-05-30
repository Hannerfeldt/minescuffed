import exportGameScene from '../../../exportGameScene'

const addBody = (config) => {
    const game = exportGameScene()
    game.physics.add.existing(config.key)
    config.key.body.setSize(config.size[0], config.size[1])
    config.key.body.debugShowBody = false
    config.key.body.debugShowVelocity = false
}

export { addBody as default }
