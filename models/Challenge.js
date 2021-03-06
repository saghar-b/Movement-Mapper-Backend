const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    creator_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: "no description",
    },
    picture_path: {
        type: DataTypes.STRING,
        defaultValue: "./Assets/challenge.png",
    },
    unit: {
        type: DataTypes.STRING,
        defaultValue: "Mile",
    },

}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'challenge',
});

module.exports = Challenge