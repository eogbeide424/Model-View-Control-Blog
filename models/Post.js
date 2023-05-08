const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        date_created: {
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW,
        },
        dashBoard_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'DashBoard',
                key: 'id',
            },
            
        },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'User',
                key:'id',
            },
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
      }
);

module.exports = Post;