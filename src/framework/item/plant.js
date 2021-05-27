import place from '../interaction/place'

const plant = (plantType) => {
    console.log('plant')
    place({ key: plantType },  [{ key: plantType, cost: 1 }])
}

export { plant as default }
