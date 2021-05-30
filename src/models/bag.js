import createBackground from '../framework/graphics/createBackground'
import addText from '../framework/graphics/addText'
import addImage from '../framework/graphics/addImage'
import index from '../framework/item'

export default class Bag {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        // key, quantity
        this.items = []
        this.graphics = {
            background: null,
            // image, text, button
            items:[]
        }
    }

    openOrClose() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.isOpen = true

        const windowConfig = {
            xOffset: 50,
            yOffset: 50,
            width: 350,
            height: 400,
            color: 0x333333,
        }

        this.graphics.background = createBackground(50, 50, 350, 400, 0x333333)
        this.graphics.title = addText(140, 60, 'Inventory', 30)

        this.items.forEach((e, i) => {
            this.graphics.items[i] = {}
            const y = 105 + (i * 30) + (i * 5)
            this.graphics.items[i].background = createBackground(55, y - 5 , 340, 30, 0x666666)
            if (e.use) this.graphics.items[i].background.setInteractive(), this.graphics.items[i].background.on('pointerdown',
                (event) => index(e.use)(e.key))
            this.graphics.items[i].image = addImage(75, y, this.scene.items[e.key].key, 0.5, 0.2)
            this.graphics.items[i].text = addText(120, y, this.scene.items[e.key].key + ' ' + e.quantity)
            this.graphics.items[i].button = addText(350, y, '->')
            this.graphics.items[i].button.setInteractive()
            this.graphics.items[i].button.on('pointerdown', (event) => this.drop(e.key, event))
        })
    }

    close() {
        this.isOpen = false
        this.graphics.background.destroy()
        this.graphics.title.destroy()
        this.graphics.items.forEach(e => { e.background.destroy(), e.image.destroy(), e.text.destroy(), e.button.destroy() })
    }

    update() {
        this.close()
        this.open()
    }

    search(key) {
        const index = this.items.findIndex(e => e.key == key)
        return index == -1 ? false : this.items[index]
    }

    add(key) {
        const index = this.items.findIndex(e => e.key == key)
        index != -1 ? this.items[index].quantity++ : this.items.push({ key, quantity: 1, use: this.scene.items[key].use })
        if(this.isOpen) this.update()
    }

    reduce(key, amount) {
        const index = this.items.findIndex(e => e.key == key)
        if (this.items[index].quantity < amount) return false
        this.items[index].quantity -= amount
        if (this.items[index].quantity == 0) this.items.splice(index,1)
        if (this.isOpen)this.update()
        return true
    }

    drop(key, event) {
        const shift = event.event.shiftKey
        const index = this.items.findIndex(e => e.key === key)
        const player = this.scene.player

        if (player.profession) if (player.profession.isOpen) return player.profession.use(this.items[index], this)

        const amount = this.removeItemFromBag(index, shift)

        let xoff = 0
        let yoff = 0

        player.facing === 'W' ? yoff-- : player.facing === 'S' ? yoff++ : player.facing === 'D' ? xoff++ : xoff--
        for (let i = 0; i < amount; i++) {
            const droppedItem = this.scene.add.image(player.x, player.y, this.scene.items[key].key).setDepth(-1).setAlpha(0.8)
            this.scene.physics.add.existing(droppedItem)
            droppedItem.body.setSize(20, 20)
            droppedItem.body.debugShowBody = false
            droppedItem.body.debugShowVelocity = false
            droppedItem.body.setVelocity((Math.random() * 20 - 10) + (xoff * 200), (Math.random() * 20 - 10) + (yoff * 200))
            droppedItem.body.setDrag(190, 190)
            setTimeout(() => {
                droppedItem.setAlpha(1)
                this.scene.physics.add.overlap(this.scene.player, droppedItem, () => { this.add(key),droppedItem.destroy() } , this.canPickUp, this)
            }, 3000)
        }
        // this.scene.physics.add.collkeyer(droppedItem, this.scene.solkey, null, null, this)
        if (this.isOpen) this.update()
    }

    removeItemFromBag(index, shift) {
        const amount = shift ? this.items[index].quantity : 1
        this.items[index].quantity -= amount
        if (this.items[index].quantity === 0) this.items.splice(index, 1)
        return amount
    }

    canPickUp() {
        return this.items.length < 10
    }
}
