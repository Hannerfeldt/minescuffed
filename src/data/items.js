module.exports = {
    'wood': {
        key: 'wood',
    },
    'stone': {
        key: 'stone',
    },
    'coal': {
        key: 'coal',
    },
    'sapling': {
        key: 'sapling',
        use: 'plant',
        parameter: 'sapling',
    },
    'raw_chicken': {
        key: 'raw_chicken',
        cookable: true,
        cooked_key: 'cooked_chicken',
        cooked_id: 4,
        cookingTime: 10000,
    },
    'cooked_chicken': {
        key: 'cooked_chicken',
        eatable: true,
        replenish: 20,
    },
}
