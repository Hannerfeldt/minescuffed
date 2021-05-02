export default class Cooking  {
    constructor(scene) {
        this.scene = scene
        this.isOpen = false
        this.graphics = {
            background:null,
            items:[],
            progressBar:null
        }
        this.cookingProgress = 0
        this.queue = []
        this.finished = []
    }

    open() {
        const ADD = this.scene.add
        if(this.isOpen) return this.close()
        this.isOpen = true
        this.graphics.background = ADD.rectangle(450,50,100,400,0xaaa55a).setScrollFactor(0,0).setOrigin(0).setDepth(10)
        const progressBarY = this.queue[0] ? this.queue[0].index : 0
        this.graphics.progressBar = ADD.rectangle(465,115+(50*progressBarY),70*this.cookingProgress,7,0xffcc22).setScrollFactor(0).setOrigin(0).setDepth(10)
        this.finished.forEach(e => {
            const text = ADD.text(460,80+((e.index)*50),'<-',{fontSize:'20px'}).setScrollFactor(0).setInteractive().setDepth(10)
            text.on('pointerdown', (event) => this.take(e))
            this.graphics.items.push({
                image:ADD.image(500,95+((e.index)*50),this.scene.items[e.id].key).setScrollFactor(0).setScale(0.75).setOrigin(0.5).setDepth(10),
                text:text
            })
        }) 
        this.queue.forEach(e => {
            const text = ADD.text(460,80+((e.index)*50),'<-',{fontSize:'20px'}).setScrollFactor(0).setInteractive().setDepth(10)
            text.on('pointerdown', (event) => this.take(e))
            this.graphics.items.push({
                image:ADD.image(500,95+((e.index)*50),this.scene.items[e.id].key).setScrollFactor(0).setScale(0.75).setOrigin(0.5).setDepth(10),
                text:text
            })
        })
    }

    take(food) {
        let index = this.finished.findIndex(e => e.index == food.index)
        if(index!=-1) this.finished.splice(index,1)
        else {
            index = this.queue.findIndex(e => e.index == food.index)
            this.queue.splice(index,1)}
        this.scene.player.bag.add(food.id)
        this.finished.forEach(e=>{if(index<e.index) e.index--})
        this.queue.forEach(e=>{if(index<e.index) e.index--})
        this.update()
    }

    update() {
        this.close()
        this.open()
    }

    use(item, bag) {
        if(!this.scene.items[item.id].cookable) return
        if((this.queue.length + this.finished.length) == 7) return
        const reduced = bag.reduce(item.id,1)
        if (!reduced) return
        const ADD = this.scene.add
        const image = ADD.image(500,95+((this.graphics.items.length)*50), this.scene.items[item.id].key).setScrollFactor(0).setScale(0.75).setOrigin(0.5).setDepth(10)
        const text = ADD.text(460,80+((this.graphics.items.length)*50),'<-',{fontSize:'20px'}).setScrollFactor(0).setInteractive().setDepth(10)
        text.on('pointerdown', (event) => this.take(e))
        this.graphics.items.push({image:image,text:text})
        this.queue.push({id:item.id, index:this.graphics.items.length-1})
        if(this.queue.length-1 == 0) this.cooking(item.id, this.graphics.items.length-1)
    }

    cooking(id, index) {
        this.scene.world['x'+this.x+'y'+this.y].structure.src.anims.play('burning')
        const food = this.scene.items[id]
        let timeCooked = 0 
        const cookingInterval = setInterval(()=>{
            timeCooked += 500
            this.cookingProgress = timeCooked / food.cookingTime
            if (this.cookingProgress >= 1) {
                clearInterval(cookingInterval)
                if (this.isOpen) this.graphics.items[index].image.setTexture(food.cooked_key)
                const cookedFood = this.queue.shift()
                this.finished.push({id:this.scene.items[cookedFood.id].cooked_id, index:cookedFood.index})
                this.cookingProgress = 0
                if (this.queue[0]) this.cooking(this.queue[0].id, this.queue[0].index)
                else this.scene.world['x'+this.x+'y'+this.y].structure.src.anims.play('not_burning')
            }
            if (this.isOpen) this.update()
        }, 500)
    }
    
    close() {
        this.isOpen = false
        this.graphics.background.destroy()
        this.graphics.items.forEach(e=>{e.image.destroy(),e.text.destroy()})
        this.graphics.items = []
        this.graphics.progressBar.destroy()
    }
}