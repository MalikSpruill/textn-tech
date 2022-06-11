const {Comment} = require('../models');

const commentData = [
    {
        comment_text: 'This is what tech is in the Today world.',
        user_id: '1',
        post_id: '1'
    },
    {
        comment_text: 'This is what tech is in the Today world.',
        user_id: '1',
        post_id: '1'
    },
    {
        comment_text: 'This is what tech is in the Today world.',
        user_id: '1',
        post_id: '1'
    },
    {
        comment_text: 'This is what tech is in the Today world.',
        user_id: '3',
        post_id: '1'
    },
    {
        comment_text: 'This is what tech is in the Today world.',
        user_id: '2',
        post_id: '1'
    }
];

const commentsSeed = () => Comment.bulkCreate(commentData, {individualHooks: true});

module.exports = commentsSeed;