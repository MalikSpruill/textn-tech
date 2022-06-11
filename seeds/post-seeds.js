const {Post} = require('../models');

const postData = [
    {
        title: 'Where is June?',
        post_url: 'https://www.google.com/',
        user_id: '1'
    },
    {
        title: 'This Week in Crypto',
        post_url: 'https://www.google.com/',
        user_id: '1'
    },
    {
        title: 'Where the Wild Things Are in Tech',
        post_url: 'https://www.google.com/',
        user_id: '1'
    },
    {
        title: 'GoldenEye Tech',   
        post_url: 'https://www.google.com/',
        user_id: '2'
    },
    {
        title: 'TechNine',
        post_url: 'https://www.google.com/',
        user_id: '3'
    }
];

const postsSeed = () => Post.bulkCreate(postData, {individualHooks: true});

module.exports = postsSeed;