export default class Crafting {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        this.graphics = {
            background: null,
            // image, text, build, costs[{ image, text }]
            items: [],
        }
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

            this.graphics.items[i].text = ADD.text(520, 75 + (i * 45), e.key, {
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
        if (canAfford) this.build(craft, cost_array)
    }

    build(craft, cost_array) {
        this.close()
        const blueprint_img = this.scene.add.image(0, 0, craft.key).setDepth(3).setBlendMode('SCREEN').setTint(0xfff00f)
        if (craft.rotations) {
            this.scene.keyboard.R.on('down', e => {
                const index = craft.rotations.findIndex(e => e === blueprint_img.texture.key)
                const texture = index + 1 === craft.rotations.length ? craft.rotations[0] : craft.rotations[index + 1]
                blueprint_img.setTexture(texture)
            })
        }

        const followCursor = (e) => {
            const player = this.scene.player
            blueprint_img.x = Math.round(e.worldX / 96) * 96
            blueprint_img.y = Math.round(e.worldY / 96) * 96
            const x_dir = (Math.round(player.x / 96) + 1 == Math.round(e.worldX / 96) || Math.round(player.x / 96) - 1 == Math.round(e.worldX / 96)) && Math.round(player.y / 96) == Math.round(e.worldY / 96)
            const y_dir = (Math.round(player.y / 96) + 1 == Math.round(e.worldY / 96) || Math.round(player.y / 96) - 1 == Math.round(e.worldY / 96)) && Math.round(player.x / 96) == Math.round(e.worldX / 96)
            const key = 'x' + Math.round(e.worldX / 96) + 'y' + Math.round(e.worldY / 96)
            if ((!x_dir && !y_dir) || (this.scene.world[key].structure)) blueprint_img.setTint(0xff5565)
            else blueprint_img.setTint(0xfff00f)

        }

        const placeBuilding = (e) => {
            const player = this.scene.player
            const x_dir = (Math.round(player.x / 96) + 1 == Math.round(e.worldX / 96) || Math.round(player.x / 96) - 1 == Math.round(e.worldX / 96)) && Math.round(player.y / 96) == Math.round(e.worldY / 96)
            const y_dir = (Math.round(player.y / 96) + 1 == Math.round(e.worldY / 96) || Math.round(player.y / 96) - 1 == Math.round(e.worldY / 96)) && Math.round(player.x / 96) == Math.round(e.worldX / 96)

            if (!x_dir && !y_dir) return
            const key = 'x' + Math.round(e.worldX / 96) + 'y' + Math.round(e.worldY / 96)
            if (this.scene.world[key].structure) return

            this.scene.input.removeListener('pointerdown', placeBuilding)
            this.scene.input.removeListener('pointermove', followCursor)
            this.scene.world[key].structure = {}
            this.scene.world[key].structure.key = blueprint_img.texture.key
            if (craft.rotations) this.scene.keyboard.R.destroy()
            blueprint_img.destroy()

            this.scene.renderWorld(Math.round(e.worldX / 96), Math.round(e.worldY / 96), this.scene.world[key])

            // if(this.scene.tile[id].adaptive) this.scene.tileAdaptive(Math.round(e.worldX/96), Math.round(e.worldY/96), id)

            cost_array.forEach(c => player.bag.reduce(c.key, c.cost))
        }

        this.scene.input.on('pointermove', followCursor)
        this.scene.input.on('pointerdown', placeBuilding)
    }
}