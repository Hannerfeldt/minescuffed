import animations from './data/animations'
import images from './data/images'
import spritesheets from './data/spritesheets'
import items from './data/items'
import tiles from './data/tiles'
import crafts from './data/crafts'
import structures from './data/structures'
import biomes from './data/biomes'
import makeKey from './framework/general/makeKey'
import { Animals } from './models/animals'
import { Player } from './models/player'
import perlin from './perlin.js'
import Cooking from './ui/cooking'
import Clock from './models/Clock'
import checkWorld from './framework/world/checkWorld'

  export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
        this.images = images
        this.spritesheets = spritesheets
        this.animations = animations
        this.biomes = biomes
        this.items = items
        this.tiles = tiles
        this.crafts = crafts
        this.structures = structures

        this.ui = {
            coords: null,
        }

        this.animals = {
            0: {
                key: 'chicken',
                drop: [{
                    id: 3,
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }]
            },
            1: {
                key: 'cow',
                drop: [{
                    id: 3,
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }]
            },
            2: {
                key: 'pig',
                drop: [{
                    id: 3,
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }]
            },
            3: {
                key: 'sheep',
                drop: [{
                    id: 3,
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }]
            },
        }

        this.world = {
            x0y0: {
                inView: false,
                tile: {
                    key: "grass",
                    src: undefined,
                    border: undefined,
                }
            }
        }

        this.npc = []
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
        Object.values(this.tiles).forEach(e => e.group = this.add.group({
            classType: Phaser.GameObjects.Image
        }))
        //Object.values(this.structures).forEach(e => e.group = this.add.group({classType: Phaser.GameObjects.Image}))
        Object.values(this.animals).forEach(e => e.group = this.add.group({
            classType: Phaser.GameObjects.Image
        }))
        this.solid = this.add.group({
            classType: Phaser.GameObjects.Image
        })
        // create all the animations
        this.animations.forEach(e => this.animationsCreate(e.name, e.skin, e.key, e.repeat, e.rate))

        // creates the player object
        //this.player = new Player(this, 0, 0, 30, 40, [this.add.sprite(0, 0, 'player'), this.add.sprite(0, 0, 'legs').setTint(0x9c8468), this.add.sprite(0, 0, 'chest').setTint(0x32a852)])
        this.player = new Player(this, 'knapp')

        this.clock = new Clock()

        // adding listening events for keys
        this.keyboard = this.input.keyboard.addKeys('W, A, S, D, B, E, SPACE, F, R', false, false)
        this.keyboard.W.on('down', e => this.player.movement(e))
        this.keyboard.A.on('down', e => this.player.movement(e))
        this.keyboard.S.on('down', e => this.player.movement(e))
        this.keyboard.D.on('down', e => this.player.movement(e))
        this.keyboard.W.on('up', e => this.player.movement(e))
        this.keyboard.A.on('up', e => this.player.movement(e))
        this.keyboard.S.on('up', e => this.player.movement(e))
        this.keyboard.D.on('up', e => this.player.movement(e))
        this.keyboard.B.on('down', e => this.player.bag.openOrClose())
        this.keyboard.E.on('down', e => this.player.crafting.open())
        // this.keyboard.F.on('down', e => this.clock.update())
        this.keyboard.F.on('down', e => this.player.hunger.eating())
        this.keyboard.SPACE.on('down', e => this.player.interact())

        this.cameras.main.startFollow(this.player)
        // zoom
        this.input.on('wheel', e => {
            const zoom = e.deltaY > 0 ? this.cameras.main.zoom - 0.5 : this.cameras.main.zoom + 0.5
            this.cameras.main.zoomTo(zoom == 0.5 ? 1 : zoom, 100, 'Sine.easeInOut')
        })
        // if tile is breakable, you cant walk through it
        this.physics.add.collider(this.solid, this.player, null, null, this)

        // Object.values(this.animals).forEach(e => this.physics.add.collider(e.group, this.player, (animal) => animal.setDrag(500,500), null, this))
        // Object.values(this.animals).forEach(e => {
        //     this.physics.add.collider(this.solid, e.group, null, null, this)
        //     this.physics.add.collider(this.tiles[1].group, e.group, null, null, this)
        //     Object.values(this.animals).forEach(a => {
        //         this.physics.add.collider(e.group, a.group, null, null, this)
        //     })
        // })
        // create text element for coords
        this.ui.coords = this.add.text(50, 50, 'x0y0', {
            fontFamily: 'Courier',
            fontSize: '40px'
        }).setScrollFactor(0, 0).setDepth(10)
        this.timer = 0
    }
    update(time, delta) {
        checkWorld(this)
        this.timer += delta;
        while (this.timer > 1000) {
            this.clock.update()
            this.timer -= 1000
        }
        this.player.checkPlayerPosition()
        this.npc.forEach(e => e.movement())
    }

    setInteraction(constructorName) {
        if (constructorName == 'Cooking') return new Cooking(this)
    }

    tileAdaptive(x, y, id) {
        const top = this.world['x' + x + 'y' + (y - 1)].key == id
        const bottom = this.world['x' + x + 'y' + (y + 1)].key == id
        const right = this.world['x' + (x + 1) + 'y' + y].key == id
        const left = this.world['x' + (x - 1) + 'y' + y].key == id

        if (top && right) this.world['x' + x + 'y' + y].src.setFrame(2)
        else if (top && left) this.world['x' + x + 'y' + y].src.setFrame(3)
        else if (bottom && left) this.world['x' + x + 'y' + y].src.setFrame(4)
        else if (bottom && right) this.world['x' + x + 'y' + y].src.setFrame(5)
        else if (bottom) this.world['x' + x + 'y' + y].src.setFrame(1)
        else if (top) this.world['x' + x + 'y' + y].src.setFrame(1)
        else if (right) this.world['x' + x + 'y' + y].src.setFrame(0)
        else if (left) this.world['x' + x + 'y' + y].src.setFrame(0)
        else this.world['x' + x + 'y' + y].src.setFrame(0)

        if (top) this.tileAdaptive(x, (y - 1), id)
        if (bottom) this.tileAdaptive(x, (y + 1), id)
        if (left) this.tileAdaptive((x - 1), y, id)
        if (right) this.tileAdaptive((x + 1), y, id)
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
