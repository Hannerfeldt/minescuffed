import makeKey from '../general/makeKey'
import exportGameScene from '../../exportGameScene'
import generateCluster from './generateCluster/index'

const generateBiome = (x, y, biome) => {
    const { world } = exportGameScene()

    const key = makeKey(x, y)
    if (world[key] === undefined) world[key] = {}
    world[key].biome = biome.name
    biome.clusters.forEach(cluster => generateCluster(x, y, cluster))
}

export { generateBiome as default }
