const RNG = Math.random()
let chanceAccumulated = 0

const chance = (e) => {
    chanceAccumulated += e.chance
    return chanceAccumulated >= RNG
}

const amountDropped = (rate) => {
    return { amount } = rate.find(chance);
}

export { amountDropped as default }
