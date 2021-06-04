import makeKey from '../../../general/makeKey'
import getCordsforAdjecent from '../../../world/checkAdjecent/getCordsforAdjecent'
import renderWorld from '../../../world/renderWorld'
import exportGameScene from '../../../../exportGameScene'

const adaptSturcture = (x, y, name, adaptable, world, sendBack) => {
    const game = exportGameScene()
    const thisKey = makeKey(x, y)
    const isAdjecent = { top: null, left: null, bottom: null, right: null, }

    Object.keys(isAdjecent).map((isAdjecentKey, index) => {
        const { x: xCheck, y: yCheck } = getCordsforAdjecent(x, y, index)
        const key = makeKey(xCheck, yCheck)
        /* Garbage code, get your shit together */
        if (!world[key].structure) return isAdjecent[isAdjecentKey] = false
        if (!game.structures[world[key].structure.key]?.name === name) return isAdjecent[isAdjecentKey] = false
        isAdjecent[isAdjecentKey] = true
        if (sendBack) adaptSturcture(xCheck, yCheck, name, adaptable, world, false)
    })

    const { key } = adaptable.find(element => {
        return Object.keys(isAdjecent).every(key => {
            return element[key] === isAdjecent[key] || element[key] === null
        })
    })
    world[thisKey].structure.key = key

    renderWorld(x, y, world[thisKey])
}

export { adaptSturcture as default }
