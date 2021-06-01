import exportGameScene from '../../../../exportGameScene'
import addBody from '../../../physics/addBody'
import addImage from '../../../graphics/addImage'

const randomDropPostion = (dir) => {
    return dir * 96 + ((Math.random() * 48) - 24)
}

const dropLoot = (loot, amount, x, y) => {
    const game = exportGameScene()

    for (let i = 0; i < amount; i++) {
        const lootImg = addImage({
            x: randomDropPostion(x),
            y: randomDropPostion(y),
            key: game.items[loot.key].key,
        })

        addBody({
            key: lootImg,
            size: [20, 20],
        })

        game.physics.add.overlap(game.player, lootImg, () => {
            game.player.bag.add(loot.key), lootImg.destroy()
        }, () => game.player.bag.canPickUp(), game)
    }
}

export { dropLoot as default }
