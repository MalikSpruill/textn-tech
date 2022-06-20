const {Post} = require('../models');

const postData = [
    {
        title: 'Where is June?',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '1'
    },
    {
        title: 'Where is Junezer?',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '1'
    },
    {
        title: 'Where is April?',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '1'
    },
    {
        title: 'This Week in Crypto',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '2'
    },
    {
        title: 'Where the Wild Things Are in Tech',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '3'
    },
    {
        title: 'GoldenEye Tech',   
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '4'
    },
    {
        title: 'TechNine',
        post_message: 'The reason why tech is as popular as it is now... is solely because of Big Tech!',
        user_id: '5'
    }
];

const postsSeed = () => Post.bulkCreate(postData, {individualHooks: true});

module.exports = postsSeed;