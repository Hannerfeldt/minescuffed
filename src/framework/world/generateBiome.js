import makeKey from '../general/makeKey'
import game from '../../index'
import generateCluster from './generateCluster'

const generateBiome = (x, y, biome) => {
    const { world } = game.scene.scenes[2]

    const key = makeKey(x, y)
    if (world[key] === undefined) world[key] = {}
    world[key].biome = biome.name
    biome.clusters.forEach(e => generateCluster(x, y, e))
}

export { generateBiome as default }
