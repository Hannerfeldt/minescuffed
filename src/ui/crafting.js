export default class Crafting  {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        this.graphics = {
            background:null,
            // image, text, build, costs[{ image, text }]
            items:[],
        }
    }
    
    open() {
        if(this.isOpen) return this.close()
        this.isOpen = true
        const ADD = this.scene.add
        this.graphics.background = ADD.rectangle(450,50,550,400,0x333344).setScrollFactor(0).setOrigin(0)
        this.scene.crafting.forEach((e,i) => {
            this.graphics.items[i] = {}
            this.graphics.items[i].image= ADD.image(480,75+(i*30), e.key).setScrollFactor(0).setScale(0.5).setOrigin(0.2)
            this.graphics.items[i].text = ADD.text(520,75+(i*30), e.key, {fontSize:'20px'}).setScrollFactor(0)
            this.graphics.items[i].costs = []
            this.graphics.items[i].build = ADD.text(950,75+(i*30), '->', {fontSize:'20px'}).setScrollFactor(0).setInteractive()
            this.graphics.items[i].build.on('pointerdown', (event) => this.canBuild(this.scene.crafting[i]))
            e.cost.forEach((c,j) => {
                this.graphics.items[i].costs[j] = {}
                this.graphics.items[i].costs[j].image = ADD.image(900-(j*60), 75+(i*30), this.scene.items[c.id].key, {fontSize:'20px'}).setScrollFactor(0).setScale(0.4).setOrigin(0.3)
                this.graphics.items[i].costs[j].text = ADD.text(930-(j*60), 75+(i*30), c.amount, {fontSize:'20px'}).setScrollFactor(0)
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

        craft.cost.forEach((e)=>{
            const item = this.scene.player.bag.search(e.id)
            if(!item || item.quantity < e.amount ) canAfford = false
            cost_array.push({index:item.id, cost:e.amount}) 
        })
        if(canAfford) this.build(craft, cost_array)
    }

    build(craft, cost_array) {
        this.close()
        
        const blueprint_img = this.scene.add.image(0, 0, craft.key).setDepth(0).setBlendMode('SCREEN').setTint(0xfff00f)
       
        const followCursor = (e) => { 
            const player = this.scene.player
            blueprint_img.x = Math.round(e.worldX/96)*96
            blueprint_img.y = Math.round(e.worldY/96)*96
            const x_dir = (Math.round(player.x/96) + 1 == Math.round(e.worldX/96) || Math.round(player.x/96) - 1 == Math.round(e.worldX/96)) && Math.round(player.y/96) == Math.round(e.worldY/96)
            const y_dir = (Math.round(player.y/96) + 1 == Math.round(e.worldY/96) || Math.round(player.y/96) - 1 == Math.round(e.worldY/96)) && Math.round(player.x/96) == Math.round(e.worldX/96)
            const key = 'x'+Math.round(e.worldX/96)+'y'+Math.round(e.worldY/96)
            if ((!x_dir && !y_dir) || (!this.scene.tile[this.scene.world[key].id].buildable) ) blueprint_img.setTint(0xff5565)
            else blueprint_img.setTint(0xfff00f)
        }
        const placeBuilding = (e) => { 
            const player = this.scene.player
            const x_dir = (Math.round(player.x/96) + 1 == Math.round(e.worldX/96) || Math.round(player.x/96) - 1 == Math.round(e.worldX/96)) && Math.round(player.y/96) == Math.round(e.worldY/96)
            const y_dir = (Math.round(player.y/96) + 1 == Math.round(e.worldY/96) || Math.round(player.y/96) - 1 == Math.round(e.worldY/96)) && Math.round(player.x/96) == Math.round(e.worldX/96)

            if (!x_dir && !y_dir) return
            const key = 'x'+Math.round(e.worldX/96)+'y'+Math.round(e.worldY/96)
            if(!this.scene.tile[this.scene.world[key].id].buildable) return
            blueprint_img.destroy()
            this.scene.input.removeListener('pointerdown', placeBuilding)
            this.scene.input.removeListener('pointermove', followCursor)
            const id = this.scene.tile.findIndex(e=>e.key == craft.key)
            this.scene.world[key].id = id
            this.scene.renderWorld(Math.round(e.worldX/96), Math.round(e.worldY/96), this.scene.world[key])
            if(this.scene.tile[id].adaptive) this.scene.tileAdaptive(Math.round(e.worldX/96), Math.round(e.worldY/96), id)
            cost_array.forEach(c => player.bag.reduce(c.index, c.cost))
        }

        this.scene.input.on('pointermove', followCursor)
        this.scene.input.on('pointerdown', placeBuilding) 
    }
}