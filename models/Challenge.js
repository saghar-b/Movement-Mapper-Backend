const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const bcrypt = require("bcrypt")

class Challenge extends Model { }

Challenge.init({
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Challenge_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
       
    },
    Challenge_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },

}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'challenge',
});

module.exports = Challenge