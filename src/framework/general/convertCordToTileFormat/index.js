const convertCordToTileFormat = (cord) => {
    return Math.round(cord / 96)
}

export { convertCordToTileFormat as default }
