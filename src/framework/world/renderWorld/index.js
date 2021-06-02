import checkAdjacent from '../checkAdjecent/index'
import addTile from './addTile'
import addStructure from './addStructure'

const renderWorld = (x, y, world) => {

    addTile(x, y, world.tile)

    /* Adds a border */
    checkAdjacent(x, y, world.tile)

    if (world.structure !== undefined) {
        addStructure(x, y, world.structure)
    }
}

export { renderWorld as default }
