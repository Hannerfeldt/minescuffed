export class GameSetting extends Phaser.Scene {
    constructor() {
        super({ key: "GameSetting" })
    }
    create(){
        this.add.text(this.game.config.width/2, 250, 'Window size', {fontFamily:'Courier',fontSize:'100px'}).setOrigin(0.5)
        
        const input = document.createElement('input')
        input.setAttribute("type", "range")
        input.setAttribute("min", "600")
        input.setAttribute("max", "1200")
        input.setAttribute("step", "100") 
        document.body.appendChild(input)
        input.setAttribute('id', 'game-range')
    
        this.setting = this.add.text(this.game.config.width/2, 350, input.value + ' px', {fontFamily:'Courier',fontSize:'60px'}).setOrigin(0.5)
        
        const back = this.add.text(this.game.config.width, this.game.config.height, 'back',{fontFamily:'Courier',fontSize:'30px'}).setOrigin(1,1).setInteractive()
        back.on('pointerover', (event) => back.setTint(0xfff00f))
        back.on('pointerout', (event) => back.setTint(0xffffff))
        back.on('pointerdown', (event) => {this.scene.start('GameStartScene'), input.remove()})
        
        const apply = this.add.text(0, this.game.config.height, 'apply',{fontFamily:'Courier',fontSize:'30px'}).setOrigin(0,1).setInteractive()
        apply.on('pointerover', (event) => apply.setTint(0xfff00f))
        apply.on('pointerout', (event) => apply.setTint(0xffffff))
        apply.on('pointerdown', (event) => {
            this.scene.start('GameStartScene') 
            this.game.scale.resize(parseInt(input.value),parseInt(input.value))
            this.game.config.width = parseInt(input.value)  
            this.game.config.height = parseInt(input.value)  
            input.remove()
        })

    } 
    update() {
        const input = document.getElementById('game-range')
        this.setting.text = input.value + ' px'
    }
}