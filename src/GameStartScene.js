export class GameStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameStartScene" })
    }
    create() {
        this.add.text(this.game.config.width/2, 200, 'Enter name', {fontFamily:'Courier',fontSize:'120px'}).setOrigin(0.5)
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.classList.add('game-input')
        const start = this.add.text(this.game.config.width/2, 475, 'Start Game', {fontFamily:'Courier',fontSize:'100px'}).setOrigin(0.5).setInteractive()
        start.on('pointerover', (event) => start.setTint(0xfff00f))
        start.on('pointerout', (event) => start.setTint(0xffffff))
        start.on('pointerdown', (event) => {this.scene.start('GameScene', {name:input.value}), input.remove()})
        const setting = this.add.text(this.game.config.width, this.game.config.height, 'settings',{fontFamily:'Courier',fontSize:'30px'}).setOrigin(1,1).setInteractive()
        setting.on('pointerover', (event) => setting.setTint(0xfff00f))
        setting.on('pointerout', (event) => setting.setTint(0xffffff))
        setting.on('pointerdown', (event) => {this.scene.start('GameSetting'), input.remove()})
    }
}
