//importing data

import animations from './data/animations.json'
import images from './data/images'
import spritesheets from './data/spritesheets.js'
import { Animals } from './game_objects/animals'
import { Player } from './game_objects/player'
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

        this.naturalTile = [0,1,2,3,4,5,6,8]

        this.animals = [
            {key:'chicken', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            {key:'cow', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            {key:'pig', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
            {key:'sheep', drop:[{ id: 3, chance: 1, quantity: 1, chanceDivided: false}]},
        ]

        this.ground = [
            { key:'grass', swimmable:false },
            { key:'water', swimmable:true },
            { key:'sand', swimmable:false },
        ]

        this.body = [
            { key:'tree', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:true } ], interaction:null},
            { key:'bush', solid:true, mineduration:1, drop:[ { id:0, chance:1, quantity:1, chanceDivided:false } ], interaction:null},
            { key:'stone_ore', solid:true, mineduration:3, drop:[ { id:1, chance:1, quantity:1, chanceDivided:false } ], interaction:null},
            { key:'coal_ore', solid:true, mineduration:4, drop:[ { id:2, chance:1, quantity:3, chanceDivided:true } ], interaction:null},
            { key:'fence', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:true } ], interaction:null, adaptive:[0,1,2,3,4,5,6]},
            { key:'campfire', solid:true, mineduration:2, drop:[ { id:0, chance:1, quantity:2, chanceDivided:false } ], interaction:'Cooking'},
        ]

        this.crafting = [
            { key:'campfire', tile:true, cost:[{id:0,amount:1}] },
            { key:'fence', tile:true, cost:[{id:0,amount:2}] },
        ]

        this.items = [
            { key:'wood' },
            { key:'stone' },
            { key:'coal' },
            { key:'raw_chicken', cookable:true, cooked_key:'cooked_chicken', cooked_id:4, cookingTime: 10000 },
            { key:'cooked_chicken', eatable:true, replenish:20, },
        ]
        
        this.npc = []
        this.world = {
            x0y0:{ id:0, inView:false, src:undefined, function:null, body:{id:undefined} }
        }

        this.biomes = [
            { 
                key:'woods',
                ground:[
                    {id:1, chance:0.15}, 
                    {id:2, chance:0.2}, 
                    {id:0, chance:0.65},
                ],
                body: [

                ]

            },
            { key:'desert', tiles:[{id:0,chance:0.15}, {id:5, chance:0.6}, {id:4, chance:0.15}, {id:6, chance:0.1}]},
            { key:'plains', tiles:[{id:0,chance:0.65}, {id:3, chance:0.2}, {id:6, chance:0.05}, {id:4, chance:0.05}, {id:5, chance:0.05}]},
            { key:'lake', tiles:[{id:1, chance:0.95}, {id:2, chance:0.05}]},
            { key:'mountainous', tiles:[{id:6, chance:0.7}, {id:0, chance:0.2}, {id:4, chance:0.1}]}
        ]
        
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
        this.ground.forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        this.animals.forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        
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
        // this.tile.forEach(e=>{if (e.breakable) this.physics.add.collider(e.group, this.player, null, null, this)})
        this.animals.forEach(e=>this.physics.add.collider(e.group, this.player, (animal)=>animal.setDrag(500,500), null, this))
        this.animals.forEach(e=>{
            // this.tile.forEach(t=>{
            //     if(t.breakable || t.swimmable)this.physics.add.collider(e.group, t.group, null, null, this)
            // })
            this.animals.forEach(a=>{
                this.physics.add.collider(e.group, a.group, null, null, this)
            })
        })
        // create text element for coords
        this.ui.coords = this.add.text(50, 50, 'x0y0', {fontFamily:'Courier',fontSize:'40px'}).setScrollFactor(0,0)
    }
    
    update() { 
        this.checkWorld()
        this.player.checkDepth()
       // this.player.checkPlayerPosition()
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
            const loot = this.add.image((x)*96+((Math.random()*48)-24), (y)*96+((Math.random()*48)-24), this.items[obj.id].key).setDepth(-1)
            this.physics.add.existing(loot)
            loot.body.setSize(20,20)
            loot.body.debugShowBody = false
            this.physics.add.overlap(this.player, loot, () => {this.player.bag.add(obj.id), loot.destroy()}, this.player.bag.canPickUp, this)
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

        let id
        let idBody 

        if(noiseVal < 0.2) id = 1
        else if(noiseVal < 0.25) id = 2
        else if(noiseVal < 0.45) id = 0
        else idBody = 0, id = 0
        
        this.world[key] = {id:id, inView: true, body:{id:idBody}}
        this.renderWorld(x, y, this.world[key])
    }

    rememberWorld(x, y) {
        const key = 'x'+x.toString()+'y'+y.toString()
        this.world[key].inView = true
        this.renderWorld(x, y, this.world[key])
    }

    renderWorld(x, y, world) { 
        world.src = this.add.image(x*96, y*96, this.ground[world.id].key).setDepth(-1)
        this.ground[world.id].group.add(world.src)
        if (world.body.id != undefined) {
            world.body.src = this.add.image(x*96, y*96, this.body[world.body.id].key).setDepth(2)   
            if (this.body[world.body.id].solid) {
                this.physics.add.existing(world.body.src)
                world.body.src.body.debugShowBody = false 
                world.body.src.body.setImmovable(true)
                world.body.src.body.setSize(50,25)
                this.solid.add(world.body.src)
                world.body.src.setInteractive()
                world.body.src.on('pointerdown', (e) => this.player.gather(x, y, this.body[world.body.id]))
            }
            world.body.interaction = this.bodyFunction(this.body[world.body.id].interaction)
        }
    }

    bodyFunction(constructor_name) {
        if(constructor_name == 'Cooking') return new Cooking(this)
    }

    tileAdaptive(x,y,id) {
       
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