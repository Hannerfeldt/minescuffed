const pickLayer = (layers, noiseVal) => {
    return layers.find(e => e.chance <= noiseVal)
}

export { pickLayer as default }
