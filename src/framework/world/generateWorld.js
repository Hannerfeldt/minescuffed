import generateBiome from './generateBiome'
import biomes from '../../data/biomes.json'
import perlin from '../../perlin'

const generateWorld = (x, y) => {
    const multiplier = 0.0075
    const noiseVal = perlin.noise.perlin2(x * multiplier, y * multiplier)
    let biomesId
    if (noiseVal < 0.0) biomesId = 0
    else if (noiseVal < 0.2) biomesId = 2
    else biomesId = 1

    generateBiome(x, y, biomes[biomesId])
}

export { generateWorld as default }
