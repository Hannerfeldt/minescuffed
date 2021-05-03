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
    'wooden_wall_up': {
        key: 'wooden_wall_up',
        tile: true,
        cost: [{
            key: 'wood',
            amount: 2
        }],
        rotations: ['wooden_wall_up', 'wooden_wall_right', 'wooden_wall_down', 'wooden_wall_left']
    },
}
