const {User} = require('../models');

const userData = [
    {
        username: 'Juneby',
        password: 'a++bc'
    },
    {
        username: 'Zene',
        password: 'aabbccde123'
    },
    {
        username: 'Aqual',
        password: 'Aqual123'
    },
    {
        username: 'Hodor251',   
        password: 'lorent23'
    },
    {
        username: 'Cloud912',
        password: 'renoback'
    }
];

const usersSeed = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = usersSeed;