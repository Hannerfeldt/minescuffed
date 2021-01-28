//importing data

import animations from './data/animations.json'
import images from './data/images'
import spritesheets from './data/spritesheets.js'
import { Animals } from './classes/animals'
import { Player } from './classes/player'
import perlin from './perlin.js'
import Cooking from './ui/cooking'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
        
        this.images = images
        this.spritesheets = spritesheets
        this.animations = animations

        this.ui = {
            coords:null, 
        }

        this.naturalStructures = [0,1,2,3,4,5,6,8]

        this.animals = {
            0:{ key:'chicken', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            1:{ key:'cow', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            2:{ key:'pig', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            3:{ key:'sheep', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
        }

        this.tiles = {
            0:{ key:'grass', swimmable:false },
            1:{ key:'water', swimmable:true },
            2:{ key:'sand', swimmable:false },
        }

        this.structures = {
            0:{ key:'tree', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:true } ],},
            1:{ key:'bush', solid:true, mineduration:1, drop:[ { id:0, chance:1, quantity:1, chanceDivided:false } ],},
            2:{ key:'stone_ore', solid:true, mineduration:3, drop:[ { id:1, chance:1, quantity:1, chanceDivided:false } ],},
            3:{ key:'coal_ore', solid:true, mineduration:4, drop:[ { id:2, chance:1, quantity:3, chanceDivided:true } ],},
            4:{ key:'fence', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:true } ], adaptive:[0,1,2,3,4,5,6]},
            5:{ key:'campfire', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:false } ], interaction:'Cooking'},
        }

        this.crafts = {
            0:{ key:'campfire', tile:true, cost:[{id:0,amount:1}] },
            1:{ key:'fence', tile:true, cost:[{id:0,amount:2}] },
        }

        this.items = {
            0:{ key:'wood' },
            1:{ key:'stone' },
            2:{ key:'coal' },
            3:{ key:'raw_chicken', cookable:true, cooked_key:'cooked_chicken', cooked_id:4, cookingTime: 10000 },
            4:{ key:'cooked_chicken', eatable:true, replenish:20, },
        }
        
        this.world = {
            x0y0: { 
                inView: false, 
                tile: {
                    id: 0,
                    src: undefined,
                }
            }
        }
        
        this.npc = []
        this.biomes = []
        
    }

    init(data) {
        this.data.values = data
    }

    preload() {
        // load all the spritesheet
        this.spritesheets.forEach(e => {
            this.load.spritesheet(e.name, e.source, {
                frameWidth: 96,
                frameHeight: 96
            })
        })
        // load all the images 
        this.images.forEach(e => this.load.image(e.name, e.source))
    }

    create() {
        // create noise seed
        perlin.noise.seed(Math.random())  
        // create groups for each tile and animals
        Object.values(this.tiles).forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        Object.values(this.structures).forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        Object.values(this.animals).forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        this.solid = this.add.group({classType: Phaser.GameObjects.Image})
        // create all the animations
        this.animations.forEach(e => this.animationsCreate(e.name, e.skin, e.key, e.repeat, e.rate))
        // creates the player object
        this.player = new Player(this, this.data.values.name)
        // adding listening events for keys
        this.keyboard = this.input.keyboard.addKeys('W, A, S, D, B, E, SPACE, F', false, false)
        this.keyboard.W.on('down', e => this.player.movement(e))
        this.keyboard.A.on('down', e => this.player.movement(e))
        this.keyboard.S.on('down', e => this.player.movement(e))
        this.keyboard.D.on('down', e => this.player.movement(e))
        this.keyboard.W.on('up', e => this.player.movement(e))
        this.keyboard.A.on('up', e => this.player.movement(e))
        this.keyboard.S.on('up', e => this.player.movement(e))
        this.keyboard.D.on('up', e => this.player.movement(e))
        this.keyboard.B.on('down', e => this.player.bag.open())
        this.keyboard.E.on('down', e => this.player.crafting.open())
        this.keyboard.F.on('down', e => this.player.hunger.eating())
        this.keyboard.SPACE.on('down', e => this.player.useTile())
        this.cameras.main.startFollow(this.player)
        // if tile is breakable, you cant walk through it
        this.physics.add.collider(this.solid, this.player, null, null, this)
        Object.values(this.animals).forEach(e => this.physics.add.collider(e.group, this.player, (animal)=>animal.setDrag(500,500), null, this))
        Object.values(this.animals).forEach(e => {
            this.physics.add.collider(this.solid, e.group, null, null, this)
            this.physics.add.collider(this.tiles[1].group, e.group, null, null, this)
            Object.values(this.animals).forEach(a => {
                this.physics.add.collider(e.group, a.group, null, null, this)
            })
        })
        // create text element for coords
        this.ui.coords = this.add.text(50, 50, 'x0y0', {fontFamily:'Courier',fontSize:'40px'}).setScrollFactor(0,0)
    }
    
    update() { 
        this.checkWorld()
        // this.player.checkDepth()
        this.player.checkPlayerPosition()
        this.npc.forEach(e=>e.movement())
    }

    drop(x, y, obj) {
        // if it dropped or not
        if (Math.random() > obj.chance) return
        // chance per quantity
        let dropAmount = obj.quantity
        if (obj.chanceDivided) {
            let rand = Math.random()
            rand = rand == 0 ? 0.0000001 : rand
            dropAmount = Math.ceil(rand/(1/obj.quantity)) 
        }
        for(let i = 0; i < dropAmount ; i++) {
            const loot = this.add.image((x)*96+((Math.random()*48)-24), (y)*96+((Math.random()*48)-24), this.items[obj.id].key).setDepth(0)
            this.physics.add.existing(loot)
            loot.body.setSize(20,20)
            loot.body.debugShowBody = false
            this.physics.add.overlap(this.player, loot, () => {this.player.bag.add(obj.id), loot.destroy()}, () => this.player.bag.canPickUp(), this)
        }
    }

    checkWorld() {
        for (let col = Math.round(this.cameras.main.worldView.left/96); col < Math.round(this.cameras.main.worldView.right/96); col++) {
            for (let row = Math.round(this.cameras.main.worldView.top/96); row < Math.round(this.cameras.main.worldView.bottom/96); row++) {
                const key = 'x'+col.toString()+'y'+row.toString()
                if (!this.world[key]) this.generateWorld(col, row) 
                else if (!this.world[key].inView) this.rememberWorld(col, row) 
            }
        }
    }
   
    generateWorld(x, y) {
        const key = 'x'+x.toString()+'y'+y.toString()
        const noiseVal = perlin.noise.perlin2(x/20,y/20)+0.5

        let idTile
        let idStruct

        if(noiseVal < 0.2) idTile = 1
        else if(noiseVal < 0.25) idTile = 2
        else if(noiseVal < 0.45) idTile = 0
        else idStruct = 0, idTile = 0
        this.world[key] = {inView: true, tile: { id: idTile }}
        if (idStruct !== undefined) this.world[key].structure = { id: idStruct }
        this.renderWorld(x, y, this.world[key])
    }

    rememberWorld(x, y) {
        const key = 'x'+x.toString()+'y'+y.toString()
        this.world[key].inView = true
        this.renderWorld(x, y, this.world[key])
    }

    renderWorld(x, y, world) { 
        const tile = world.tile
        tile.src = this.add.image(x*96, y*96, this.tiles[tile.id].key).setDepth(-1)
        // unsure of this
        this.tiles[tile.id].group.add(tile.src)
        // if tile has structure handle it here
        if (world.structure !== undefined) {
            const struct = world.structure
            struct.src = this.add.image(x*96, y*96, this.structures[struct.id].key).setDepth(2)  
            // struct is solid, can't walk through it!
            if (this.structures[struct.id].solid) {
                this.physics.add.existing(struct.src)
                struct.src.body.debugShowBody = false 
                struct.src.body.setImmovable(true)
                struct.src.body.setSize(50,25)
                this.solid.add(struct.src)
            }
            // struct is mineable, you can gather from it!
            if (this.structures[struct.id].mineduration !== undefined) {
                struct.src.setInteractive()  
                struct.src.on('pointerdown', (e) => this.player.gather(x, y, this.structures[struct.id]))
            }
            // struct has an interaction, you can interact with it!
            if (this.structures[struct.id].interaction !== undefined) {
                struct.interaction = this.setInteraction(this.structures[struct.id].interaction)
            }
        }
    }

    setInteraction(constructorName) {
        if(constructorName == 'Cooking') return new Cooking(this)
    }

    tileAdaptive(x, y, id) {
       
        const top = this.world['x'+x+'y'+(y-1)].id == id
        const bottom = this.world['x'+x+'y'+(y+1)].id == id
        const right = this.world['x'+(x+1)+'y'+y].id == id
        const left = this.world['x'+(x-1)+'y'+y].id == id

        if(top && right) this.world['x'+x+'y'+y].src.setFrame(2)
        else if (top && left) this.world['x'+x+'y'+y].src.setFrame(3)
        else if (bottom && left) this.world['x'+x+'y'+y].src.setFrame(4)
        else if (bottom && right) this.world['x'+x+'y'+y].src.setFrame(5)
        else if (bottom) this.world['x'+x+'y'+y].src.setFrame(1)
        else if (top) this.world['x'+x+'y'+y].src.setFrame(1)
        else if (right) this.world['x'+x+'y'+y].src.setFrame(0)
        else if (left) this.world['x'+x+'y'+y].src.setFrame(0)
        else this.world['x'+x+'y'+y].src.setFrame(0)

        //let callBack = true
        if(top) this.tileAdaptive(x,(y-1),id)
        if(bottom) this.tileAdaptive(x,(y+1),id)
        if(left) this.tileAdaptive((x-1),y,id)
        if(right) this.tileAdaptive((x+1),y,id)
       
    }

    animationsCreate(name, skin, key, repeat, rate) {
        this.anims.create({
            key: name,
            repeat: repeat,
            frameRate: rate,
            frames: this.anims.generateFrameNames(skin, {
                frames: key
            })
        })
    }
}