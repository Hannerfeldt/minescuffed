import game from '../../index'
import addImage from './addImage'
import addText from './addText'
import createBackground from './createBackground'

const addRow = (config, items, rowWidth) => {
    const _this = game.scene.scenes[2]
    let arr = []
    items.forEach((element, index) => {
        let obj = {}
        obj.background = createBackground(config.xOffset + 5, config.yOffset + 5 + (index * rowWidth), config.width - 10, rowWidth, 0x777777)
        obj.image = addImage(75, config.yOffset + 10 + (index * rowWidth), _this.items[element.key].key, 0.5, 0.2)
        obj.text = addText(120, config.yOffset + 10 + (index * rowWidth), _this.items[element.key].key + ' ' + element.quantity)
        obj.button = addText(350, config.yOffset + 10 + (index * rowWidth), '->')
        obj.button.setInteractive()
        obj.button.on('pointerdown', (event) => _this.drop(element.key))
        arr.push(obj)
    });

    return arr
}

export { addRow as default }
