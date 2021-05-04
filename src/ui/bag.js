export default class Bag  {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        // key, quantity
        this.items = []
        this.graphics = {
            background:null,
            // image, text, button
            items:[]
        }
    }

    open() {
        if(this.isOpen) return this.close()
        this.isOpen = true
        const ADD = this.scene.add
        this.graphics.background = ADD.rectangle(50,50,350,400,0x333333).setScrollFactor(0,0).setOrigin(0) .setDepth(10)
        this.items.forEach((e,i) => {
            this.graphics.items[i] = {}
            this.graphics.items[i].image = ADD.image(75, 75+(i*30), this.scene.items[e.key].key).setScrollFactor(0).setScale(0.5).setOrigin(0.2).setDepth(10)
            this.graphics.items[i].text = ADD.text(120,75+(i*30),this.scene.items[e.key].key+' '+e.quantity,{fontSize:'20px'}).setScrollFactor(0).setDepth(10)
            this.graphics.items[i].button = ADD.text(350,75+(i*30), '->',{fontSize:'20px'}).setScrollFactor(0).setInteractive().setDepth(10)
            this.graphics.items[i].button.on('pointerdown', (event) =>  this.drop(e.key))
        })
    }

    close() {
        this.isOpen = false
        this.graphics.background.destroy()
        this.graphics.items.forEach(e=>{e.image.destroy(), e.text.destroy(), e.button.destroy()})
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
        index != -1 ? this.items[index].quantity++ : this.items.push({key: key, quantity:1})
        if(this.isOpen) this.update()
    }

    reduce(key, amount) {
        const arr = []
        const index = this.items.findIndex(e => e.key == key)
        if(this.items[index].quantity < amount) return false
        this.items[index].quantity -= amount
        if(this.items[index].quantity == 0) this.items.splice(index,1)
        if(this.isOpen)this.update()
        return true
    }

    drop(key) {
        const index = this.items.findIndex(e => e.key == key)
        const player = this.scene.player
        if(player.profession) if(player.profession.isOpen) return player.profession.use(this.items[index], this)
        this.items[index].quantity--
        if(this.items[index].quantity == 0) this.items.splice(index,1)
        let xoff = 0
        let yoff = 0
        player.facing == 'W' ? yoff-- : player.facing == 'S' ? yoff++ : player.facing == 'D' ? xoff++ : xoff--
        const droppedItem = this.scene.add.image(player.x,player.y,this.scene.items[key].key).setDepth(-1).setAlpha(0.8)
        this.scene.physics.add.existing(droppedItem)
        droppedItem.body.setSize(20,20)
        droppedItem.body.debugShowBody = false
        droppedItem.body.debugShowVelocity = false
        droppedItem.body.setVelocity((Math.random()*20-10)+(xoff*200),(Math.random()*20-10)+(yoff*200))
        droppedItem.body.setDrag(190,190)
        this.scene.physics.add.collkeyer(droppedItem, this.scene.solkey, null, null, this)
        if(this.isOpen) this.update()
        setTimeout(() => {
            droppedItem.setAlpha(1)
            this.scene.physics.add.overlap(this.scene.player, droppedItem, ()=>{this.add(key),droppedItem.destroy()} , this.canPickUp, this)
        }, 3000)
    }

    canPickUp() {
        console.log('check')
        return this.items.length < 10
    }
}