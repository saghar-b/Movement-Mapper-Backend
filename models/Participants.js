const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// const Participants = sequelize.define('participate', {
//     id:{
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//     } ,
//     distance: DataTypes.DECIMAL(10, 1),
// });

class Participants extends Model { }

Participants.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // challenge_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'challenge',
    //         key: 'id',
    //     },
    // },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'user',
    //         key: 'id',
    //     },
    // },
    distance: {
        type: DataTypes.DECIMAL(10, 1),
        defaultValue: 0,
    }

}, {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participate',
});

module.exports = Participants