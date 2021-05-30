import makeKey from '../general/makeKey'
import renderWorld from './renderWorld'
import game from '../../index'
import perlin from '../../perlin'

const generateCluster = (x, y, cluster) => {
    const key = makeKey(x, y)

    const { world } = game.scene.scenes[2]
    if (world[key].tile !== undefined) return

    const noiseVal = perlin.noise.perlin2(x * cluster.multiplier, y * cluster.multiplier)

    /* Picks layer */
    const layer = cluster.layers.find(e => e.chance <= noiseVal)
    if (layer === undefined) return

    /* Picks tile */
    const tileRNG = Math.random()
    const tile = layer.tile.find(e => e.chance >= tileRNG)

    /* Updates world object */
    world[key] = {
        ...world[key],
        inView: true,
        tile: {
            key: tile.key
        },
        cluster: cluster.name
    }

    /* Picks struct */
    if (layer.struct !== undefined) {
        const structRNG = Math.random()
        const struct = layer.struct.find(e => e.chance >= structRNG)
        if (struct !== undefined) world[key].structure = {}, world[key].structure.key = struct.key
    }

    renderWorld(x, y, world[key])
}

export { generateCluster as default }
