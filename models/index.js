// import models

const User = require('./User');
const Challenge = require('./Challenge');
const Scores = require('./Scores');
const Logs = require('./Logs');

User.belongsToMany(Challenge, {
    through: Scores,
    as: "challenges",
    foreignKey: 'user_id',
});
Challenge.belongsToMany(User, {
    through: Scores,
    as: 'scores',
    foreignKey: 'challenge_id',
});

// Event belongs one creator
Challenge.belongsTo(User, {
    as: 'creator',
    foreignKey: "creator_id"
});
User.hasMany(Challenge, {
    foreignKey: "creator_id"
});
// Logs.belongsTo(User,{
//     foreignKey: "user_id"
// })

// User.hasMany(Logs,{
//     foreignKey: "user_id" 
// })
module.exports = {
    User,Challenge,Scores,Logs
};