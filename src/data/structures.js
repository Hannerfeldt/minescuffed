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
            chance: 1,
            quantity: 2,
            chanceDivided: true
        }],
    },
    'bush': {
        key: 'bush',
        mineduration: 1,
        origin: {
            x: 0.5,
            y: 1,
        },
        offset: {
            x: 0.5,
            y: 0.5,
        },
        drop: [{
            key: 'wood',
            chance: 1,
            quantity: 1,
            chanceDivided: false
        }],
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
            chance: 1,
            quantity: 1,
            chanceDivided: false
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
            chance: 1,
            quantity: 3,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: false
        }],
        interaction: 'Cooking',
        animation: {
            start: 'not_burning',
            icon: 'burning',
            other: 'burning'
        }
    },
    'tree2': {
        key: 'tree2',
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
        }],
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
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
            chance: 1,
            quantity: 1,
            chanceDivided: false
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
            chance: 1,
            quantity: 1,
            chanceDivided: true
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
            chance: 1,
            quantity: 1,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
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
            chance: 1,
            quantity: 2,
            chanceDivided: true
        }],
        rotation: 0
    },
}
