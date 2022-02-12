const pickLayer = (layers, noiseVal) => {
    return layers.find(layer => layer.chance <= noiseVal)
}

export { pickLayer as default }
