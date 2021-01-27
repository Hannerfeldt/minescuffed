export default class Hunger  {
    constructor(scene) {
        this.scene = scene
        this.graphics = {
            bar:null,
            text: null
        }
        this.hunger = 100
        this.hungerTick = 0 
    }

    eating() {
        if (this.hunger < 100) {
            const bag = this.scene.player.bag
            const player = this.scene.player
            const item = bag.items.find(e => this.scene.items[e.id].eatable)
            if(!item) return
            bag.reduce(item.id, 1)
            player.stunned = true
            player.setVelocity(0,0)
            player.anims.play(player.inputs[player.facing].eating).once('animationcomplete', () => {
                player.stunned = false
                this.hunger += this.scene.items[item.id].replenish
                if(this.hunger > 100) this.hunger = 100
                this.update()
                player.anims.play(player.inputs[player.facing].running)
                player.anims.pause(player.anims.currentAnim.frames[0])
            })
        } 
    }
 
    draw() {
        this.graphics.bar = this.scene.add.rectangle(50,650,200*(this.hunger/100), 40, 0x00aaaa).setScrollFactor(0,0).setOrigin(0)
        this.graphics.text = this.scene.add.text(115,660,this.hunger+'%', {fontSize:'20px'}).setScrollFactor(0,0).setOrigin(0)
    }
    
    drain(amount) {
        this.hungerTick += amount
        if(this.hungerTick >= 20) {this.update(), this.hungerTick = 0}
    }

    update() {
        this.hunger -= 1
        this.hunger = Math.round(this.hunger)
        this.graphics.bar.width = 200*(this.hunger/100)
        this.graphics.text.text = this.hunger+'%'
    }

}