module.exports = {
    'tree': {
        key: 'tree',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 33,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 0.6,
                },
                {
                    amount: 2,
                    chance: 0.3,
                },
                {
                    amount: 3,
                    chance: 0.1,
                },
            ],
        }],
    },
    'sapling': {
        key: 'sapling',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 33,
            y: 0.5,
        },
        mineduration: 1,
        drop: [{
            key: 'sapling',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        alarm: [{
            time: [0, 1, 0, 0, 0, 0],
            key: 'bush'
        },{
            time: [0, 1, 0, 0, 0, 0],
            key: 'pinetree'
        }]
    },
    'stone_ore': {
        key: 'stone_ore',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 3,
        drop: [{
            key: 'stone',
            rate: [
                {
                    amount: 1,
                    chance: 0.9,
                },
            ],
        }],
    },
    'coal_ore': {
        key: 'coal_ore',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 4,
        drop: [{
            key: 'coal',
            rate: [
                {
                    amount: 1,
                    chance: 0.7,
                },
            ],
        }],
    },
    'campfire': {
        key: 'campfire',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        interaction: 'Cooking',
        animation: {
            start: 'not_burning',
            icon: 'burning',
            other: 'burning'
        }
    },
    'pinetree': {
        key: 'pinetree',
        solid: {
            w: 15,
            h: 10
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 5,
            y: 20,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 0.9,
                },
                {
                    amount: 2,
                    chance: 0.6,
                },
            ],
        }, {
            key: 'sapling',
            rate: [
                {
                    amount: 1,
                    chance: 0.5,
                },
            ],
        }],
    },
    'stone_ore2': {
        key: 'stone_ore2',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 3,
        drop: [{
            key: 'stone',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
    },
    'cactus': {
        key: 'cactus',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
    },
    'palmtree': {
        key: 'palmtree',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
    },
    'stone_moss': {
        key: 'stone_moss',
        solid: {
            w: 30,
            h: 25
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'stone',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
    },
    'savanna_tree': {
        key: 'savanna_tree',
        solid: {
            w: 15,
            h: 15
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
    },
    'wooden_wall_up': {
        key: 'wooden_wall_up',
        solid: {
            w: 96,
            h: 5
        },
        origin: {
            x: 0.5,
            y: 0.5,
        },
        offset: {
            x: 0,
            y: 33,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        rotation: 0
    },
    'wooden_wall_right': {
        key: 'wooden_wall_right',
        solid: {
            w: 5,
            h: 96
        },
        origin: {
            x: 0.5,
            y: 0.5,
        },
        offset: {
            x: 91,
            y: 0,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        rotation: 0
    },
    'wooden_wall_down': {
        key: 'wooden_wall_down',
        solid: {
            w: 96,
            h: 5
        },
        origin: {
            x: 0.5,
            y: 0.5,
        },
        offset: {
            x: 0,
            y: 66,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        rotation: 0
    },
    'wooden_wall_left': {
        key: 'wooden_wall_left',
        solid: {
            w: 5,
            h: 96
        },
        origin: {
            x: 0.5,
            y: 0.5,
        },
        offset: {
            x: 5,
            y: 0,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [
                {
                    amount: 1,
                    chance: 1,
                },
            ],
        }],
        rotation: 0
    },
}
