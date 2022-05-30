// import models

const User = require('./User');
const Challenge = require('./Challenge');
const Participants = require('./Participants');
const Logs = require('./Logs');

User.belongsToMany(Challenge, {
    through: Participants,
    as: "challenges",
    foreignKey: 'user_id',
});
Challenge.belongsToMany(User, {
    through: Participants,
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
    User,Challenge,Participants,Logs
};