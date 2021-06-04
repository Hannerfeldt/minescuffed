import place from '../framework/interaction/place'

export default class Crafting {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        this.graphics = {
            background: null,
            // image, text, build, costs[{ image, text }]
            items: [],
        }
        this.place = place
    }

    open() {
        if (this.isOpen) return this.close()
        this.isOpen = true
        const ADD = this.scene.add
        this.graphics.background = ADD.rectangle(450, 50, 550, 400, 0x333344).setScrollFactor(0).setOrigin(0).setDepth(10)

        Object.values(this.scene.crafts).forEach((e, i) => {
            this.graphics.items[i] = {}
            this.graphics.items[i].image = e.animation == undefined ?
                ADD.image(480, 75 + (i * 45), e.key).setScrollFactor(0).setScale(0.5).setOrigin(0.2).setDepth(10) :
                ADD.sprite(480, 75 + (i * 45), e.key).setScrollFactor(0).setScale(0.75).setOrigin(0.4, 0.55).setDepth(10)

            this.graphics.items[i].text = ADD.text(520, 75 + (i * 45), e.name || e.key, {
                fontSize: '20px'
            }).setScrollFactor(0).setDepth(10)
            this.graphics.items[i].costs = []
            this.graphics.items[i].build = ADD.text(950, 75 + (i * 45), '->', {
                fontSize: '20px'
            }).setScrollFactor(0).setInteractive().setDepth(10)

            this.graphics.items[i].build.on('pointerdown', (event) => this.canBuild(e))
            e.cost.forEach((c, j) => {
                this.graphics.items[i].costs[j] = {}
                this.graphics.items[i].costs[j].image = ADD.image(900 - (j * 60), 75 + (i * 45), this.scene.items[c.key].key, {
                    fontSize: '20px'
                }).setScrollFactor(0).setScale(0.4).setOrigin(0.3).setDepth(10)
                this.graphics.items[i].costs[j].text = ADD.text(930 - (j * 60), 75 + (i * 45), c.amount, {
                    fontSize: '20px'
                }).setScrollFactor(0).setDepth(10)
            })
        })
    }

    close() {
        this.isOpen = false
        this.graphics.background.destroy()
        this.graphics.items.forEach(e => {
            e.text.destroy(),
            e.image.destroy(),
            e.build.destroy(),
            e.costs.forEach(c => {
                c.text.destroy(),
                c.image.destroy()
            })
        })
    }

    canBuild(craft) {
        let cost_array = []
        let canAfford = true
        craft.cost.forEach((e) => {
            const item = this.scene.player.bag.search(e.key)
            if (!item || item.quantity < e.amount) canAfford = false
            cost_array.push({
                key: item.key,
                cost: e.amount
            })
        })
        if (canAfford) {this.place(craft, cost_array), this.close()}
    }
}
