// import models

const User = require('./User');
const Challenge = require('./Challenge');
const Participate = require('./Participate');
const Logs = require('./Logs');

User.belongsToMany(Challenge, {
    through: Participate,
    as: "challenges",
    foreignKey: 'user_id',
});
Challenge.belongsToMany(User, {
    through: Participate,
    as: 'participants',
    foreignKey: 'challenge_id',
});

Logs.belongsTo(User,{
    foreignKey: "user_id"
})

User.hasMany(Logs,{
    foreignKey: "user_id" 
})
module.exports = {
    User,Challenge,Participate,Logs
};