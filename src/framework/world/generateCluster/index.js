import makeKey from '../../general/makeKey'
import renderWorld from '../renderWorld/index'
import exportGameScene from '../../../exportGameScene'
import perlin from '../../../perlin'
import pickLayer from './pickLayer'
import pickTile from './pickTile'
import pickStructure from './pickStructure'

const generateCluster = (x, y, cluster) => {
    const key = makeKey(x, y)
    const { world } = exportGameScene()
    if (world[key].tile) return
    const noiseVal = perlin.noise.perlin2(x * cluster.multiplier, y * cluster.multiplier)

    const layer = pickLayer(cluster.layers, noiseVal)
    if (!layer) return
    const tile = pickTile(layer.tile)
    /* Updates world object */
    world[key] = {
        ...world[key],
        inView: true,
        tile: {
            key: tile.key
        },
        cluster: cluster.name
    }
    pickStructure(world[key], layer.struct)
    renderWorld(x, y, world[key])
}

export { generateCluster as default }
