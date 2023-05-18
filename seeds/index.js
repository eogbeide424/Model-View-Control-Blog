const {User,Post,Comments} = require('../models');
const P = require('./postseedData');
const userData= require('./userseedData.json');
const commentSeed = require('./comments.json');
const postSeed = require('./postseedData');
const sequelize = require('../config/connection');

const seedDataBase = async () => {
    try{

    
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData,{
        individualHooks: true,
        returning: true,
    });

console.log('--------SEEDED USER TABLE---------');
    for (const post of postSeed) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    console.log('--------SEEDED POST TABLE---------');
    for (const comment of commentSeed) {
        await Comments.create({
         ...comment,
         user_id: users[Math.floor(Math.random()*users.length)].id,   
        });
    }
    console.log('--------SEEDED COMMENTS TABLE---------');
    process.exit(0);

    } catch(err){
    console.error('\n----- Error in seeding -------\n',err);
    console.log(err,"\n--------Could not sync-------\n");
}
};
seedDataBase();
    
    
    
    // try{
    //     await sequelize.sync({ force: true });
    
    //     console.log("\n----- DATABASE SYNCED -----\n");
    // }catch(err){
    //     console.log('could not syc')
    // }
//     try{
//        await userSeed();
//         console.log("\n----- USER SEEDED -----\n");
//     }catch(err){
//         console.log('\n------could not seed post-------\n');
//     }try{
//         await postSeed();
//         console.log("\n----- POST SEEDED -----\n")
//     } catch(err){
//         console.log('could not seed user')
//     } try{   
//         await commentSeed();
//         console.log("\n----- COMMENT SEEDED -----\n");
//     }  
//        catch(err){
//         console.log("\n----Error in seeding Comments-----\n");

//     }
// };
// seedDataBase();