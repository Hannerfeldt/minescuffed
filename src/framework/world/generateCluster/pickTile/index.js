const pickTile = (tile) => {
    const tileRNG = Math.random()
    return tile.find(e => e.chance >= tileRNG)
}

export { pickTile as default }
