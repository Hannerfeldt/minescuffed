import world from '../../../data/world'

const convertCordToTileFormat = (cord) => {
    return Math.round(cord / world.tileSize)
}

export { convertCordToTileFormat as default }
