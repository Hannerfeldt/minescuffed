module.exports = {
    'campfire': {
        key: 'campfire',
        tile: true,
        cost: [{
            key: 'wood',
            amount: 1
        }],
        animation: true
    },
    'wooden_wall0': {
        name: 'wooden wall',
        key: 'wooden_wall0',
        tile: true,
        cost: [{
            key: 'wood',
            amount: 2,
        }],
        adaptable: [
            { key: 'wooden_wall10', top: true, left: true, right: true, bottom: true },
            { key: 'wooden_wall9', top: false, left: true, right: true, bottom: true },
            { key: 'wooden_wall8', top: true, left: false, right: true, bottom: true },
            { key: 'wooden_wall7', top: true, left: true, right: true, bottom: false },
            { key: 'wooden_wall6', top: true, left: true, right: false, bottom: true },
            { key: 'wooden_wall5', top: false, left: false, right: true, bottom: true },
            { key: 'wooden_wall4', top: true, left: false, right: true, bottom: false },
            { key: 'wooden_wall3', top: true, left: true, right: false, bottom: false },
            { key: 'wooden_wall2', top: false, left: true, right: false, bottom: true },
            { key: 'wooden_wall0', top: false, left: null, right: null, bottom: false },
            { key: 'wooden_wall1', top: null, left: false, right: false, bottom: null },
        ]
    },
}
