const postSeed = require('./postseedData');
const userSeed = require('./userseedData');
const commentSeeds= require('./comments');
const sequelize = require('../config/connection');
const seedDataBase = async () => {
    try{
        await sequelize.sync({ force: true });
        console.log("\n----- DATABASE SYNCED -----\n");
    
        await postSeed();
        console.log("\n----- POST SEEDED -----\n")
    
        await userSeed();
        console.log("\n----- USER SEEDED -----\n");
        
        await commentSeeds();
        console.log("\n----- COMMENT SEEDED -----\n");
        
        await seedReservationData();

    }catch(err){
        console.log("Error in seeding Database");

    }
}
seedDataBase();