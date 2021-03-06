const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Scores extends Model { }

Scores.init({

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
    distance: {
        type: DataTypes.DECIMAL(10, 1),
        defaultValue: 0,
    },
    join: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

}, {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'score',
});

module.exports = Scores