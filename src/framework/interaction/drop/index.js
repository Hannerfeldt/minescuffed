import amountDropped from './amountDropped'
import dropLoot from './dropLoot'

const drop = (x, y, loot) => {
    const amount = amountDropped(loot.rate)
    dropLoot(loot, amount, x, y)
}

export { drop as default }
