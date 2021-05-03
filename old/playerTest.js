import ContainerLite from 'phaser3-rex-plugins/plugins/containerlite.js';
import Bag from '../src/ui/bag'
import Crafting from '../src/ui/crafting'
import Hunger from '../src/ui/hunger'


export class PlayerTest extends ContainerLite {
    constructor(scene, x, y, width, height, children) {
        super(scene, x, y, width, height, children)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.stunned = false
        this.swimming = false
        this.canGather = true
        this.facing = 'S'
        this.speed = 300
        this.setDepth(2)
        this.bag = new Bag(this.scene)
        this.crafting = new Crafting(this.scene)
        this.damage = 10
        this.hunger = new Hunger(this.scene)
        this.hunger.draw()
        this.gatheringSpeed = 0.2
        this.inputs = {
            W: {
                direction: {
                    x: 0,
                    y: -this.speed
                },
                attack: 'player_attacking_up',
                eating: 'player_eating_up',
                running: 'player_running_up',
                swimming: 'player_swimming_up'
            },
            A: {
                direction: {
                    x: -this.speed,
                    y: 0
                },
                attack: 'player_attacking_left',
                eating: 'player_eating_left',
                running: 'player_running_left',
                swimming: 'player_swimming_left'
            },
            S: {
                direction: {
                    x: 0,
                    y: this.speed
                },
                attack: 'player_attacking_down',
                eating: 'player_eating_down',
                running: 'player_running_down',
                swimming: 'player_swimming_down'
            },
            D: {
                direction: {
                    x: this.speed,
                    y: 0
                },
                attack: 'player_attacking_right',
                eating: 'player_eating_right',
                running: 'player_running_right',
                swimming: 'player_swimming_right'
            },
            STOP: {
                direction: {
                    x: 0,
                    y: 0
                },
                running: undefined
            },
        }
        this.animations = {
            'player': {
                runningTop: 'player_running_up',
                runningLeft: 'player_running_left',
                runningBottom: 'player_running_down',
                runningRight: 'player_running_right',
                swimmingTop: 'player_swimming_up',
                swimmingLeft: 'player_swimming_left',
                swimmingBottom: 'player_swimming_down',
                swimmingRight: 'player_swimming_right',
            },
            'legs': {
                runningTop: 'legs_running_up',
                runningLeft: 'legs_running_left',
                runningBottom: 'legs_running_down',
                runningRight: 'legs_running_right',
            },
            'chest': {
                runningTop: 'chest_running_up',
                runningLeft: 'chest_running_left',
                runningBottom: 'chest_running_down',
                runningRight: 'chest_running_right',
                swimmingTop: 'chest_swimming_up',
                swimmingLeft: 'chest_swimming_left',
                swimmingBottom: 'chest_swimming_down',
                swimmingRight: 'chest_swimming_right',
            },
        }
        this.body.debugShowBody = false
        this.body.debugShowVelocity = false
    }

    setAnimation(animation) {
        this.children.forEach((element) => {
            if (animation === 'STOP') element.anims.pause(element.anims.currentAnim.frames[0])
            else element.anims.play(this.animations[element.texture.key][animation], true)
        });
    }

    movement(event) {
        let input_key = (event.originalEvent.key).toUpperCase()
        const event_type = event.originalEvent.type
        if (this.stunned) return
        const button_held = Object.values(this.scene.keyboard).filter(e => (e.isDown && (e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68)))
        if (event_type == 'keyup' && button_held.length == 0) this.body.setVelocity(0, 0), this.setAnimation('STOP')
        else {
            if (event_type == 'keyup' && button_held.length > 0) input_key = button_held[0].originalEvent.key.toUpperCase()
            if (!this.swimming) {
                this.body.setVelocity(this.inputs[input_key].direction.x, this.inputs[input_key].direction.y)
            } else this.body.setVelocity(this.inputs[input_key].direction.x / 2, this.inputs[input_key].direction.y / 2)
            this.facing = input_key
            this.setAnimation(input_key === 'W' ? 'runningTop' : input_key === 'S' ? 'runningBottom' : input_key === 'A' ? 'runningLeft' : 'runningRight')
        }
    }

    checkPlayerPosition() {
        const x = Math.round(this.x / 96)
        const y = Math.round(this.y / 96)
        const key = 'x' + x + 'y' + y
        this.scene.ui.coords.text = this.scene.world[key].biome + ' ' + this.scene.world[key].cluster + ' ' + key
        // if we should be swimming or not
        if (this.scene.tiles[this.scene.world[key].tile.key].swimmable && !this.swimming) {
            this.swimming = true
            this.canGather = false
            this.body.setVelocity(this.inputs[this.facing].direction.x / 2, this.inputs[this.facing].direction.y / 2)
            this.setAnimation(this.facing === 'W' ? 'swimmingTop' : this.facing === 'S' ? 'swimmingBottom' : this.facing === 'A' ? 'swimmingLeft' : 'swimmingRight')
        } else if (!this.scene.tiles[this.scene.world[key].tile.key].swimmable && this.swimming) {
            this.swimming = false
            this.canGather = true
            this.setVelocity(this.inputs[this.facing].direction.x, this.inputs[this.facing].direction.y)
            this.anims.play(this.inputs[this.facing].running)
        }
        // close profession window if too far away
        if (this.profession) {
            const x_dir = (x + 1 == this.profession.x || x - 1 == this.profession.x) && y == this.profession.y
            const y_dir = (y + 1 == this.profession.y || y - 1 == this.profession.y) && x == this.profession.x
            const center = (x == this.profession.x && y == this.profession.y)
            if (!x_dir && !y_dir && !center) this.profession.close()
        }
        // set depth for structures, either 1 or 5
        for (let i = 0; i < 4; i++) {
            let x_dir = x
            let y_dir = y
            i % 2 == 0 ? x_dir += (i - 1) : y_dir += (i - 2)
            if (!this.scene.world['x' + x_dir + 'y' + y_dir]) return
            this.checkDepth(x_dir, y_dir)
        }
        this.checkDepth(Math.round(this.x / 96), Math.round(this.y / 96))

    }

    checkDepth(x, y) {
        const KEY = 'x' + x + 'y' + y
        const STRUCT = this.scene.world[KEY].structure
        if (STRUCT !== undefined) {
            const ORIGIN = ((96*this.scene.structures[STRUCT.key].origin.y)-48)
            if (this.y > (y * 96) - ORIGIN ) STRUCT.src.setDepth(1)
            else STRUCT.src.setDepth(5)
        }
    }


    gather(x, y, struct) {
        if (!this.canGather) return
        this.body.setVelocity(0, 0)

        const this_x = Math.round(this.x / 96)
        const this_y = Math.round(this.y / 96)

        const x_dir = (this_x + 1 == x || this_x - 1 == x) && this_y == y
        const y_dir = (this_y + 1 == y || this_y - 1 == y) && this_x == x

        if (x_dir || y_dir || (this_x === x && this_y === y)) {
            this.setAnimation('runningTop')
            this.stunned = true
            this.canGather = false
            this.hunger.drain(2 * struct.mineduration)
            const breaking = this.scene.add.sprite(x * 96, y * 96, 'breaking').setScale(0.7).setDepth(5)
            breaking.anims.play('breaking_tile')
            breaking.anims.msPerFrame = struct.mineduration * (1000 * this.gatheringSpeed) / 3
            breaking.once('animationcomplete', () => breaking.destroy())
            setTimeout(() => {
                this.stunned = false
                this.canGather = true
                this.scene.world['x' + x + 'y' + y].structure.src.destroy()
                delete this.scene.world['x' + x + 'y' + y].structure
                // scene.renderWorld(x, y, scene.world['x'+x+'y'+y])
                this.setAnimation('STOP')
                struct.drop.forEach(e => this.scene.drop(x, y, e))
            }, struct.mineduration * (1000 * this.gatheringSpeed))
        }
    }
}