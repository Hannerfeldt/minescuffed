import plant from '../framework/item/plant'

const items = {
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
        use: () => plant('sapling', 1),
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

export { items as default }
