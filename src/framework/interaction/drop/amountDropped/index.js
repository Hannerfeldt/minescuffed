
const chance = (e, RNG, chanceAccumulated) => {
    chanceAccumulated += e.chance
    return chanceAccumulated >= RNG
}

const amountDropped = (rate) => {
    const RNG = Math.random()
    let chanceAccumulated = 0
    const found = rate.find((e) => chance(e, RNG, chanceAccumulated));
    return found ? found.amount : 0
}

export { amountDropped as default }
