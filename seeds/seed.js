const sequelize = require('../config/connection');
const { User,Post,DashBoard} = require('../models/index');


const postSeedData =require('./postseedData.json');
const dashBoardData= require('./dashBoardseedData.json');
const userSeedData = require('./userseedData.json');

const seedDataBase = async () => {
    await sequelize.sync({force: true});

    const user = await User.bulkCreate(userSeedData,{
        individualHooks: true,
        returning: true,
    });

    for( const {id} of user){
        const newDash = await DashBoard.create(dashBoardData,{
            ...newDash,
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