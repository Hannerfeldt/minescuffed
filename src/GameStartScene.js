export class GameStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameStartScene" })
    }
    create(){
        this.add.text(this.game.config.width/2, 250, 'Enter name', {fontFamily:'pixel',fontSize:'150px'}).setOrigin(0.5)
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.classList.add('game-input')
        const start = this.add.text(this.game.config.width/2, 550, 'Start Game', {fontFamily:'pixel',fontSize:'100px'}).setOrigin(0.5).setInteractive()
        start.on('pointerover', (event) => start.setTint(0xfff00f))
        start.on('pointerout', (event) => start.setTint(0xffffff))
        start.on('pointerdown', (event) => {this.scene.start('GameScene', {name:input.value}), input.remove()})
    } 
}