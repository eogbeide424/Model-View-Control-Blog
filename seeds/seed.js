const sequelize = require('../config/connection');
const { User,Post,Comment} = require('../models/index');


const postSeedData =require('./postseedData.json');
const commentSeedData= require('./comments.json');
const userSeedData = require('./userseedData.json');

const seedDataBase = async () => {
    await sequelize.sync({force: true});

    const user = await User.bulkCreate(userSeedData,{
        individualHooks: true,
        returning: true,
    });

    for( const {id} of user){
        const newComment = await Comment.create(commentSeedData,{
            ...newComment,
            user_id: id,
        });

        for (const post of postSeedData) {
             await Post.create({
                ...post,
                user_id: user[Math.floor(Math.random()*user.length)].id,
            });

        }
    }
    process.exit(0);
};

seedDataBase();