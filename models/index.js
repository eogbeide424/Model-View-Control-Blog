const User = require('./User');
const Post = require('./Post');
const DashBoard = require('./dashBoard');

DashBoard.hasOne(User, {
    through: {
        model:DashBoard,
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
    }

});

User.belongsToMany(Post, {
    through: {
        model:DashBoard,
        foreignKey: 'post_id',
    onDelete: 'CASCADE',
    } 
   
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, DashBoard };