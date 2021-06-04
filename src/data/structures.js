import grow from '../framework/timer/grow'

const structures = {
    'tree': {
        key: 'tree',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
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
        solid: [{
            w: 20,
            h: 15,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },
        mineduration: 1,
        drop: [{
            key: 'sapling',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
        alarm: [{
            time: [5, 0, 0, 0, 0, 0],
            fn: (e) => grow('tree', e),
        }, {
            time: [10, 0, 0, 0, 0, 0],
            fn: (e) => grow('pinetree', e),
        }]
    },
    'stone_ore': {
        key: 'stone_ore',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 3,
        drop: [{
            key: 'stone',
            rate: [{
                amount: 1,
                chance: 0.9,
            }, ],
        }],
    },
    'coal_ore': {
        key: 'coal_ore',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 4,
        drop: [{
            key: 'coal',
            rate: [{
                amount: 1,
                chance: 0.7,
            }, ],
        }],
    },
    'campfire': {
        key: 'campfire',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
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
        solid: [{
            w: 10,
            h: 10,
            x: 10,
            y: -20,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
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
            rate: [{
                amount: 1,
                chance: 0.5,
            }, ],
        }],
    },
    'stone_ore2': {
        key: 'stone_ore2',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 3,
        drop: [{
            key: 'stone',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'cactus': {
        key: 'cactus',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 2,
    },
    'palmtree': {
        key: 'palmtree',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'stone_moss': {
        key: 'stone_moss',
        solid: [{
            w: 30,
            h: 25,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 2,
        drop: [{
            key: 'stone',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'savanna_tree': {
        key: 'savanna_tree',
        solid: [{
            w: 15,
            h: 15,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 1,
        },

        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall0': {
        name: 'wooden wall',
        key: 'wooden_wall0',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall1': {
        name: 'wooden wall',
        key: 'wooden_wall1',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall2': {
        name: 'wooden wall',
        key: 'wooden_wall2',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall3': {
        name: 'wooden wall',
        key: 'wooden_wall3',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall4': {
        name: 'wooden wall',
        key: 'wooden_wall4',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall5': {
        name: 'wooden wall',
        key: 'wooden_wall5',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall6': {
        name: 'wooden wall',
        key: 'wooden_wall6',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall7': {
        name: 'wooden wall',
        key: 'wooden_wall7',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall8': {
        name: 'wooden wall',
        key: 'wooden_wall8',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall9': {
        name: 'wooden wall',
        key: 'wooden_wall9',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
    'wooden_wall10': {
        name: 'wooden wall',
        key: 'wooden_wall10',
        solid: [{
            w: 96,
            h: 5,
            x: 0,
            y: 33,
        }],
        origin: {
            x: 0.5,
            y: 0.5,
        },
        mineduration: 2,
        drop: [{
            key: 'wood',
            rate: [{
                amount: 1,
                chance: 1,
            }, ],
        }],
    },
}

export { structures as default }
