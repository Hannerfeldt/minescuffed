import convertCordToTileFormat from '../../../general/convertCordToTileFormat'

const rangeCheckTileTwoDimDir = (arrayOfCords) => {
    arrayOfCords = arrayOfCords.map((e) => convertCordToTileFormat(e))
    return (arrayOfCords[0] + 1 === arrayOfCords[2]
        || arrayOfCords[0] - 1 === arrayOfCords[2])
        && arrayOfCords[1] === arrayOfCords[3]
}

const rangeCheckTile = (playerX, playerY, worldX, worldY) => {
    return rangeCheckTileTwoDimDir([playerX, playerY, worldX, worldY])
    || rangeCheckTileTwoDimDir([playerY, playerX, worldY, worldX])
}

export { rangeCheckTile as default }
