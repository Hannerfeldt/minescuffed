//importing data
import animations from './data/animations.json'
import images from './data/images'
import spritesheets from './data/spritesheets.js'
import biomes from './data/biomes.json'
import {
    Animals
} from './classes/animals'
import {
    Player
} from './classes/player'
import perlin from './perlin.js'
import Cooking from './ui/cooking'
export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })

        this.images = images
        this.spritesheets = spritesheets
        this.animations = animations
        this.biomes = biomes
        this.max
        this.min
        this.borders = {
            'grass': ['grass_top', 'grass_left', 'grass_bottom', 'grass_right'],
            'sand': ['sand_top', 'sand_left', 'sand_bottom', 'sand_right'],
            '': ['rock_top', 'rock_left', 'rock_bottom', 'rock_right'],
            'savanna_grass': ['savanna_grass_top', 'savanna_grass_left', 'savanna_grass_bottom', 'savanna_grass_right'],
            'dry_grass': ['dry_grass_top', 'dry_grass_left', 'dry_grass_bottom', 'dry_grass_right'],
        }

        this.ui = {
            coords: null,
        }

        this.naturalStructures = [0, 1, 2, 3, 4, 5, 6, 8]

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

        this.tiles = {
            'grass': {
                key: 'grass',
                swimmable: false,
                bordersHierarchy: 10
            },
            'water': {
                key: 'water',
                swimmable: true,
                bordersHierarchy: 100
            },
            'sand': {
                key: 'sand',
                swimmable: false,
                bordersHierarchy: 20
            },
            'dirt': {
                key: 'dirt',
                swimmable: false,
                bordersHierarchy: 15
            },
            'rock_front': {
                key: 'rock_front',
                swimmable: false,
                bordersHierarchy: 0
            },
            'path': {
                key: 'path',
                swimmable: false,
                bordersHierarchy: 50
            },
            'savanna_grass': {
                key: 'savanna_grass',
                swimmable: false,
                bordersHierarchy: 13
            },
            'dry_grass': {
                key: 'dry_grass',
                swimmable: false,
                bordersHierarchy: 11
            },
        }

        this.structures = {
            'tree': {
                key: 'tree',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 33,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
            },
            'bush': {
                key: 'bush',
                mineduration: 1,
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }],
            },
            'stone_ore': {
                key: 'stone_ore',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 3,
                drop: [{
                    key: 'stone',
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }],
            },
            'coal_ore': {
                key: 'coal_ore',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 4,
                drop: [{
                    key: 'coal',
                    chance: 1,
                    quantity: 3,
                    chanceDivided: true
                }],
            },
            'campfire': {
                key: 'campfire',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: false
                }],
                interaction: 'Cooking',
                animation: {
                    start: 'not_burning',
                    icon: 'burning',
                    other: 'burning'
                }
            },
            'tree2': {
                key: 'tree2',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
            },
            'pinetree': {
                key: 'pinetree',
                solid: {
                    w: 30,
                    h: 10
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 33,
                    y: 40,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
            },
            'stone_ore2': {
                key: 'stone_ore2',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 3,
                drop: [{
                    key: 'stone',
                    chance: 1,
                    quantity: 1,
                    chanceDivided: false
                }],
            },
            'cactus': {
                key: 'cactus',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
            },
            'palmtree': {
                key: 'palmtree',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 1,
                    chanceDivided: true
                }],
            },
            'stone_moss': {
                key: 'stone_moss',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'stone',
                    chance: 1,
                    quantity: 1,
                    chanceDivided: true
                }],
            },
            'savanna_tree': {
                key: 'savanna_tree',
                solid: {
                    w: 30,
                    h: 25
                },
                origin: {
                    x: 0.5,
                    y: 1,
                },
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
            },
            'wooden_wall_up': {
                key: 'wooden_wall_up',
                solid: {
                    w: 96,
                    h: 5
                },
                origin: {
                    x: 0.5,
                    y: 0.5,
                },
                offset: {
                    x: 0,
                    y: 33,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
                rotation: 0
            },
            'wooden_wall_right': {
                key: 'wooden_wall_right',
                solid: {
                    w: 5,
                    h: 96
                },
                origin: {
                    x: 0.5,
                    y: 0.5,
                },
                offset: {
                    x: 91,
                    y: 0,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
                rotation: 0
            },
            'wooden_wall_down': {
                key: 'wooden_wall_down',
                solid: {
                    w: 96,
                    h: 5
                },
                origin: {
                    x: 0.5,
                    y: 0.5,
                },
                offset: {
                    x: 0,
                    y: 66,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
                rotation: 0
            },
            'wooden_wall_left': {
                key: 'wooden_wall_left',
                solid: {
                    w: 5,
                    h: 96
                },
                origin: {
                    x: 0.5,
                    y: 0.5,
                },
                offset: {
                    x: 5,
                    y: 0,
                },
                mineduration: 2,
                drop: [{
                    key: 'wood',
                    chance: 1,
                    quantity: 2,
                    chanceDivided: true
                }],
                rotation: 0
            },
        }

        this.crafts = {
            'campfire': {
                key: 'campfire',
                tile: true,
                cost: [{
                    key: 'wood',
                    amount: 1
                }],
                animation: true
            },
            'wooden_wall_up': {
                key: 'wooden_wall_up',
                tile: true,
                cost: [{
                    key: 'wood',
                    amount: 2
                }],
                rotations: ['wooden_wall_up', 'wooden_wall_right', 'wooden_wall_down', 'wooden_wall_left']
            },
        }

        this.items = {
            'wood': {
                key: 'wood'
            },
            'stone': {
                key: 'stone'
            },
            'coal': {
                key: 'coal'
            },
            'raw_chicken': {
                key: 'raw_chicken',
                cookable: true,
                cooked_key: 'cooked_chicken',
                cooked_id: 4,
                cookingTime: 10000
            },
            'cooked_chicken': {
                key: 'cooked_chicken',
                eatable: true,
                replenish: 20,
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
        this.keyboard.B.on('down', e => this.player.bag.open())
        this.keyboard.E.on('down', e => this.player.crafting.open())
        this.keyboard.F.on('down', e => this.player.hunger.eating())
        this.keyboard.SPACE.on('down', e => this.player.interact())

        // pointer event
        this.input.on('pointerdown', (e) => {

        })
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
    }

    

    update() {
        this.checkWorld()
        this.player.checkPlayerPosition()
        this.npc.forEach(e => e.movement())
    }

    drop(x, y, obj) {
        // if it dropped or not
        if (Math.random() > obj.chance) return
        // chance per quantity
        let dropAmount = obj.quantity
        if (obj.chanceDivided) {
            let rand = Math.random()
            rand = rand == 0 ? 0.0000001 : rand
            dropAmount = Math.ceil(rand / (1 / obj.quantity))
        }
        for (let i = 0; i < dropAmount; i++) {
            const loot = this.add.image((x) * 96 + ((Math.random() * 48) - 24), (y) * 96 + ((Math.random() * 48) - 24), this.items[obj.key].key).setDepth(0)
            this.physics.add.existing(loot)
            loot.body.setSize(20, 20)
            loot.body.debugShowBody = false
            this.physics.add.overlap(this.player, loot, () => {
                this.player.bag.add(obj.key), loot.destroy()
            }, () => this.player.bag.canPickUp(), this)
        }
    }

    checkWorld() {
        for (let col = Math.round(this.cameras.main.worldView.left / 96); col < Math.round(this.cameras.main.worldView.right / 96); col++) {
            for (let row = Math.round(this.cameras.main.worldView.top / 96); row < Math.round(this.cameras.main.worldView.bottom / 96); row++) {
                const key = 'x' + col.toString() + 'y' + row.toString()
                if (!this.world[key]) this.generateWorld(col, row)
                else if (!this.world[key].inView) this.rememberWorld(col, row)
            }
        }
    }

    checkAdjacent(x, y, tile) {
        for (let i = 0; i < 4; i++) {
            let xDir = 0
            let yDir = 0
            i % 2 == 0 ? yDir += (i - 1) : xDir += (i - 2)
            const ADJECENT = this.checkTile(x + xDir, y + yDir)
            if (ADJECENT !== undefined) {
                const TILEDIFF = ADJECENT.key !== tile.key
                if (TILEDIFF) {
                    if (this.tiles[tile.key].bordersHierarchy < this.tiles[ADJECENT.key].bordersHierarchy) {
                        if (!ADJECENT.border) ADJECENT.border = []
                        if (this.borders[tile.key]) {
                            ADJECENT.border[i < 2 ? i + 2 : i - 2] = this.add.image((x + xDir) * 96, (y + yDir) * 96, this.borders[tile.key][i < 2 ? i + 2 : i - 2]).setDepth(1)
                        }
                    } else {
                        if (!tile.border) tile.border = []
                        if (this.borders[ADJECENT.key]) {
                            tile.border[i] = this.add.image(x * 96, y * 96, this.borders[ADJECENT.key][i]).setDepth(1)
                        }
                    }
                }
            }

        }
    }

    checkTile(x, y) {
        const key = 'x' + x + 'y' + y
        if (this.world[key] == undefined) return undefined
        return this.world[key].tile
    }

    generateWorld(x, y) {
        const noiseVal = perlin.noise.perlin2(x * 0.0075, y * 0.0075)

        let biomesId
        if (noiseVal < 0.0) biomesId = 0
        else if (noiseVal < 0.2) biomesId = 2
        else biomesId = 1

        this.generateBiome(x, y, this.biomes[biomesId])
    }

    generateBiome(x, y, biome) {
        const key = this.makeKey(x, y)
        if (this.world[key] === undefined) this.world[key] = {}
        this.world[key].biome = biome.name
        biome.clusters.forEach(e => this.generateCluster(x, y, e))
    }

    generateCluster(x, y, cluster) {
        const KEY = this.makeKey(x, y)
        if (this.world[KEY].tile !== undefined) return
        const noiseVal = perlin.noise.perlin2(x * cluster.multiplier, y * cluster.multiplier)

        const layer = cluster.layers.find(e => e.chance <= noiseVal)
        if (layer === undefined) return
        if (layer.type === 'mountain') this.generateMountain(x, y)
        const tileRNG = Math.random()
        const tile = layer.tile.find(e => e.chance >= tileRNG)
        this.world[KEY] = {
            ...this.world[KEY],
            inView: true,
            tile: {
                key: tile.key
            },
            cluster: cluster.name
        }

        if (layer.struct !== undefined) {
            const structRNG = Math.random()
            const struct = layer.struct.find(e => e.chance >= structRNG)
            if (struct !== undefined) this.world[KEY].structure = {}, this.world[KEY].structure.key = struct.key
        }
        this.renderWorld(x, y, this.world[KEY])
    }

    generateMountain(x, y) {
        const checkTile = (x, y) => {
            const obj = this.world[this.makeKey(x, y)]
            if (obj === undefined || obj.tile.key !== 4) return false
            return true
        }
        for (let col = y - 10; col < y + 10; col++) {
            for (let row = x - 10; row < x + 10; row++) {
                const top = checkTile(row, col - 1)
                const topLeft = checkTile(row - 1, col - 1)
                const topRight = checkTile(row + 1, col - 1)
                const right = checkTile(row + 1, col)
                const left = checkTile(row - 1, col)
                const bottom = checkTile(row, col + 1)
                const bottomRight = checkTile(row + 1, col + 1)
                const bottomLeft = checkTile(row - 1, col + 1)

            }
        }
    }

    rememberWorld(x, y) {
        const key = 'x' + x.toString() + 'y' + y.toString()
        this.world[key].inView = true
        this.renderWorld(x, y, this.world[key])
    }

    renderWorld(x, y, world) {
        const tile = world.tile
        tile.src = this.add.image(x * 96, y * 96, this.tiles[tile.key].key).setDepth(-1)
        // unsure of this
        this.tiles[tile.key].group.add(tile.src)
        this.checkAdjacent(x, y, world.tile)

        // if tile has structure handle it here
        if (world.structure !== undefined) {
            const struct = world.structure
            if (this.structures[struct.key].animation !== undefined) struct.src = this.add.sprite(x * 96, y * 96, this.structures[struct.key].key).setDepth(2).anims.play(this.structures[struct.key].animation['start'])
            else if (this.structures[struct.key].rotation !== undefined) struct.src = this.add.sprite(x * 96, y * 96, this.structures[struct.key].key).setDepth(2)
            else struct.src = this.add.image(x * 96, y * 96, this.structures[struct.key].key).setDepth(2)
            struct.src.setOrigin(this.structures[struct.key].origin.x, this.structures[struct.key].origin.y)
            // struct is solid, can't walk through it!
            if (this.structures[struct.key].solid !== undefined) {
                this.physics.add.existing(struct.src, true)
                struct.src.body.debugShowBody = false
                //struct.src.body.setImmovable(true)
                struct.src.body.setSize(this.structures[struct.key].solid.w, this.structures[struct.key].solid.h, true)
                struct.src.body.setOffset(this.structures[struct.key].offset.x, this.structures[struct.key].offset.y)
                this.solid.add(struct.src)
            }
            //
            if (this.structures[struct.key].rotation !== undefined) {
                struct.src.setFrame(struct.rotate)
            }
            // struct is mineable, you can gather from it!
            if (this.structures[struct.key].mineduration !== undefined) {
                struct.src.setInteractive()
                struct.src.on('pointerdown', (e) => {
                    this.player.gather(x, y, this.structures[struct.key])
                })
            }
            // struct has an interaction, you can interact with it!
            if (this.structures[struct.key].interaction !== undefined) {
                struct.interaction = this.setInteraction(this.structures[struct.key].interaction)
            }
        }
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