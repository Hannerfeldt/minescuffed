import Bag from '../ui/bag'
import Crafting from '../ui/crafting'
import Hunger from '../ui/hunger'

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, name){
        super(scene, 0, 0, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.name = name
        this.setDepth(1)
        this.speed = 300
        this.setSize(30, 50)
        this.debugShowBody = false
        this.debugShowVelocity = false
        this.stunned = false
        this.canGather = true
        this.swimming = false
        this.gatheringSpeed = 0.2
        this.inputs = {
            W: { direction: { x:0, y:-this.speed }, attack:'player_attacking_up', eating:'player_eating_up', running: 'player_running_up', swimming: 'player_swimming_up'},
            A: { direction: { x:-this.speed, y:0 }, attack:'player_attacking_left', eating:'player_eating_left', running: 'player_running_left', swimming: 'player_swimming_left'},
            S: { direction: { x:0, y:this.speed }, attack:'player_attacking_down', eating:'player_eating_down', running: 'player_running_down', swimming: 'player_swimming_down'},
            D: { direction: { x:this.speed, y:0 }, attack:'player_attacking_right', eating:'player_eating_right', running: 'player_running_right', swimming: 'player_swimming_right'},
            STOP: { direction: { x:0, y:0 }, running: undefined}, 
        }
        this.bag = new Bag(this.scene)
        this.crafting = new Crafting(this.scene)
        this.facing = 'S'
        this.damage = 10
        this.hunger = new Hunger(this.scene)
        this.hunger.draw()
        //this.setDrag(100,100)
        this.canSwing = true
        this.profession = null
    } 

    attack(obj) {
        
        const x_dir = (this.x+96 > obj.x && this.x-96 < obj.x)
        const y_dir = (this.y+96 > obj.y && this.y-96 < obj.y)

        if(!this.canSwing || !x_dir || !y_dir) return
        this.hunger.drain(5)
        this.setVelocity(0,0)
        this.stunned = true
        this.anims.play(this.inputs[this.facing].attack).once('animationcomplete', () => this.stunned = false)
        this.canSwing = false
        obj.health -= this.damage
        if (obj.health <= 0) {
            this.scene.animals[obj.id].drop.forEach(e=> this.scene.drop(Math.round(obj.x/96), Math.round(obj.y/96), e))
            obj.kill()
        }   
        setTimeout(()=> this.canSwing = true, 1000)
    }

    checkPlayerPosition() {
        const x = Math.round(this.x/96)
        const y = Math.round(this.y/96)
        const key = 'x'+x+'y'+y
        this.scene.ui.coords.text = key
        // if we should be swimming or not
        if (this.scene.tiles[this.scene.world[key].tile.id].swimmable && !this.swimming) {
            this.swimming = true
            this.canGather = false
            this.setVelocity(this.inputs[this.facing].direction.x/2,this.inputs[this.facing].direction.y/2)
            this.anims.play(this.inputs[this.facing].swimming)
        }
        else if (!this.scene.tiles[this.scene.world[key].tile.id].swimmable && this.swimming) {
            this.swimming = false
            this.canGather = true
            this.setVelocity(this.inputs[this.facing].direction.x,this.inputs[this.facing].direction.y)
            this.anims.play(this.inputs[this.facing].running)
        }
        // close profession window if too far away
        if (this.profession) {
            const x_dir = (x + 1 == this.profession.x || x - 1 == this.profession.x) && y == this.profession.y
            const y_dir = (y + 1 == this.profession.y || y - 1 == this.profession.y) && x == this.profession.x
            if (!x_dir && !y_dir) this.profession.close()
        }
        // set depth for structures, either 0 or 2
        for (let i = 0; i < 4; i++) { 
            let x_dir = x;
            let y_dir = y;
            i % 2 == 0 ?  x_dir += (i-1) : y_dir += (i-2)
            if (!this.scene.world['x'+x_dir+'y'+y_dir]) return
            this.checkDepth(x_dir, y_dir)
        }
        this.checkDepth(Math.round(this.x/96), Math.round(this.y/96))
    }
    
    checkDepth(x, y) {
        const key = 'x'+x+'y'+y
        const struct = this.scene.world[key].structure
        if(struct !== undefined) {
            if(this.y > y*96) struct.src.setDepth(0)
            else struct.src.setDepth(2)
        }
    }

    movement(event) {
       
        let input_key = (event.originalEvent.key).toUpperCase()
        const event_type = event.originalEvent.type
        if (this.stunned) return
        const button_held = Object.values(this.scene.keyboard).filter(e => (e.isDown && (e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68)))
        if (event_type == 'keyup' && button_held.length == 0) this.setVelocity(0,0), this.anims.pause(this.anims.currentAnim.frames[0])
        else {
            if (event_type == 'keyup' && button_held.length > 0) input_key = button_held[0].originalEvent.key.toUpperCase()
            !this.swimming ? this.setVelocity(this.inputs[input_key].direction.x, this.inputs[input_key].direction.y) :
            this.setVelocity(this.inputs[input_key].direction.x/2, this.inputs[input_key].direction.y/2) 
            this.facing = input_key    
            this.anims.play(!this.swimming ? this.inputs[input_key].running : this.inputs[input_key].swimming )
        
        }
    }

    useTile() {
        let x = 0
        let y = 0
        this.facing == 'W' ? y-- : this.facing == 'S' ? y++ :  this.facing == 'A' ? x-- : x++
        x += Math.round(this.x/96)
        y += Math.round(this.y/96)
        //const tile = this.scene.tile[this.scene.world['x'+x+'y'+y].id]
        const struct = this.scene.world['x'+x+'y'+y].struct
        if(!struct) return
        if(struct.interaction) { 
            struct.interaction.x = x
            struct.interaction.y = y
            struct.interaction.open()
            this.profession = struct.interaction
        }
    }

    gather(x, y, struct) {
        if(!this.canGather) return
        this.setVelocity(0, 0)

        const this_x = Math.round(this.x/96)
        const this_y = Math.round(this.y/96)
        const x_dir = ( this_x + 1 == x || this_x - 1 == x) && this_y == y
        const y_dir = ( this_y + 1 == y || this_y - 1 == y) && this_x == x
        
        if (x_dir || y_dir) {
            this.anims.play('player_running_up')
            this.stunned = true
            this.canGather = false
            this.hunger.drain(2*struct.mineduration)
            const breaking = this.scene.add.sprite(x*96,y*96, 'breaking').setScale(0.7)
            breaking.anims.play('breaking_tile')
            breaking.anims.msPerFrame = struct.mineduration*(1000*this.gatheringSpeed)/3
            breaking.once('animationcomplete', () => breaking.destroy())
            setTimeout(()=> {
                this.stunned = false
                this.canGather = true
                this.scene.world['x'+x+'y'+y].structure.src.destroy()
                delete this.scene.world['x'+x+'y'+y].structure
                // scene.renderWorld(x, y, scene.world['x'+x+'y'+y])
                this.anims.pause()         
                struct.drop.forEach(e => this.scene.drop(x, y, e))
            }, struct.mineduration*(1000*this.gatheringSpeed))
        }
    }

}