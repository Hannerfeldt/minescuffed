const removeStructure = (worldKey) => {
    worldKey.structure.src.destroy()
    worldKey.structure.body.forEach((e) => e.destroy());
    delete worldKey.structure
}

export { removeStructure as default }
