export class Animals extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, id){
        super(
            scene,
            x,
            y,
            config
        )

        scene.add.existing(this)
        scene.physics.add.existing(this)
        // scene.animals[this.id].group.add(this)
        this.setSize({ w, h } = config.setSize)

        this.debugShowBody = false
        this.debugShowVelocity = false
        this.changeDir = true
        this.setMaxVelocity(50, 50)
        this.setDrag(50, 50)
        this.setImmovable(true)

        this.setInteractive()
        this.on('pointerdown', (e) => scene.player.attack(this))

        this.breed = [
            { animation: 'chicken_running', scale: 1, speed: 100, health: 10 },
            { animation: 'cow_running', scale: 1.2, speed: 50, health: 30 },
            { animation: 'pig_running', scale: 1.5, speed: 50, health: 20 },
            { animation: 'sheep_running', scale: 1, speed: 50, health: 20 }
        ]

        this.setScale(this.breed[id].scale)
        this.health = this.breed[id].health
        this.speed = this.breed[id].speed
        this.setTimeouts = {}
    }

    kill() {
        clearTimeout(this.setTimeouts.stop)
        clearTimeout(this.setTimeouts.go)
        this.destroy()
    }

    movement() {
        if(this.changeDir) {
            this.changeDir = false
            this.anims.play(this.breed[this.id].animation)
            this.setDrag(0, 0)
            const rand = 100 + 4900 * Math.random()
            const rand2 = rand + (500 + 15000 * Math.random())
            this.setVelocity(this.speed - ((this.speed * 2) * Math.random()), this.speed - ((this.speed * 2) * Math.random()))
            const stop = setTimeout(() => { this.setVelocity(0, 0), this.anims.pause() }, rand)
            const go = setTimeout(() => this.changeDir = true, rand2)
            this.setTimeouts = {stop:stop, go:go}
        }
    }
}
