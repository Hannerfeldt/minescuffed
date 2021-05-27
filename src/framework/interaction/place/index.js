import addImage from '../../ui/addImage'
import game from '../../../index'
import renderWorld from '../../world/renderWorld'

const place = (craft, costArray) => {
    const _this = game.scene.scenes[2]
    _this.player.bag.close()
    const blueprintImg = _this.add.image(0, 0, craft.key).setDepth(30).setBlendMode('SCREEN').setTint(0xfff00f)
    // const blueprintImg = addImage(0, 0, craft.key, 0, 0, 3)
    // blueprintImg.setBlendMode('SCREEN').setTint(0xfff00f)
    if (craft.rotations) {
        _this.keyboard.R.on('down', e => {
            const index = craft.rotations.findIndex(e => e === blueprintImg.texture.key)
            const texture = index + 1 === craft.rotations.length ? craft.rotations[0] : craft.rotations[index + 1]
            blueprintImg.setTexture(texture)
        })
    }

    const followCursor = (e) => {
        const player = _this.player
        blueprintImg.x = Math.round(e.worldX / 96) * 96
        blueprintImg.y = Math.round(e.worldY / 96) * 96
        const xDir = (Math.round(player.x / 96) + 1 == Math.round(e.worldX / 96) || Math.round(player.x / 96) - 1 === Math.round(e.worldX / 96)) && Math.round(player.y / 96) == Math.round(e.worldY / 96)
        const yDir = (Math.round(player.y / 96) + 1 == Math.round(e.worldY / 96) || Math.round(player.y / 96) - 1 === Math.round(e.worldY / 96)) && Math.round(player.x / 96) == Math.round(e.worldX / 96)
        const key = 'x' + Math.round(e.worldX / 96) + 'y' + Math.round(e.worldY / 96)
        if ((!xDir && !yDir) || (_this.world[key].structure)) blueprintImg.setTint(0xff5565)
        else blueprintImg.setTint(0xfff00f)
    }

    const placeBuilding = (e) => {
        const player = _this.player
        const xDir = (Math.round(player.x / 96) + 1 == Math.round(e.worldX / 96) || Math.round(player.x / 96) - 1 == Math.round(e.worldX / 96)) && Math.round(player.y / 96) == Math.round(e.worldY / 96)
        const yDir = (Math.round(player.y / 96) + 1 == Math.round(e.worldY / 96) || Math.round(player.y / 96) - 1 == Math.round(e.worldY / 96)) && Math.round(player.x / 96) == Math.round(e.worldX / 96)

        if (!xDir && !yDir) return
        const key = 'x' + Math.round(e.worldX / 96) + 'y' + Math.round(e.worldY / 96)
        if (_this.world[key].structure) return

        _this.input.removeListener('pointerdown', placeBuilding)
        _this.input.removeListener('pointermove', followCursor)
        _this.world[key].structure = {}
        _this.world[key].structure.key = blueprintImg.texture.key
        if (craft.rotations) _this.keyboard.R.destroy()
        blueprintImg.destroy()

        renderWorld(Math.round(e.worldX / 96), Math.round(e.worldY / 96), _this.world[key])
        // if(_this.tile[id].adaptive) _this.tileAdaptive(Math.round(e.worldX/96), Math.round(e.worldY/96), id)
        costArray.forEach(c => player.bag.reduce(c.key, c.cost))
    }

    _this.input.on('pointermove', followCursor)
    _this.input.activePointer.isDown = false
    _this.input.on('pointerdown', placeBuilding)
}

export { place as default }
