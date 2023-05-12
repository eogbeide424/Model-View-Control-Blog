const {Comment} = require('../models/index');
const commentsData=[
    {
        "post_id": 1,
        "user_id":1,
        "comment": "this is my comment"
    },
    {
        "post_id":2,
        "user_id":2,
        "comment": "this is my comment"
    },
    {
        "post_id":3,
        "user_id":3,
        "comment": "this is my comment"
    }
]

const commentSeed =()=> Comment.bulkCreate(commentsData);
module.exports = commentSeed;