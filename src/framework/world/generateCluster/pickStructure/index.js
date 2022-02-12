const pickStructure = (worldKey, structure) => {
    if (structure === undefined) return
    const structRNG = Math.random()
    const struct = structure.find(structure => structure.chance >= structRNG)
    if (struct === undefined) return
    worldKey.structure = {}
    worldKey.structure.key = struct.key
}

export { pickStructure as default }
