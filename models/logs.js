const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Logs extends Model { }

Logs.init({
   
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    activity_type: {
        type: DataTypes.STRING,
       
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
    modelName: 'logs',
});

module.exports = Logs