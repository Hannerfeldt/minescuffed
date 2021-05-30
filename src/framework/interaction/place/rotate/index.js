import exportGameScene from '../../../../GameScene'

const rotate = (rotations, blueprintImg) => {
    const game = exportGameScene()
    game.keyboard.R.on('down', (e) => {
        const index = rotations.findIndex(e => e === blueprintImg.texture.key)
        const texture = index + 1 === rotations.length ? rotations[0] : rotations[index + 1]
        blueprintImg.setTexture(texture)
    })
}

export { rotate as default }
