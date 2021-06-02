import place from '../interaction/place'

const plant = (plantType, cost) => {
    place({ key: plantType },  [{ key: plantType, cost }])
}

export { plant as default }
