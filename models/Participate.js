const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Participate extends Model { }

Participate.init({
   
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    challenge_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'challenge',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    distance :{
        type : DataTypes.DECIMAL(10,1),
        defaultValue:0,
    }

}, {
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participate',
});

module.exports = Participate