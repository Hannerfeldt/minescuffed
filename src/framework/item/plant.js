import place from '../interaction/place'

const plant = (plantType) => {
    place({ key: plantType },  [{ key: plantType, cost: 1 }])
}

export { plant as default }
