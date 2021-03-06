// import models

const User = require('./User');
const Challenge = require('./Challenge');
const Scores = require('./Scores');
const Logs = require('./Records');

User.belongsToMany(Challenge, {
    through: Scores,
    as: "challenges",
    foreignKey: 'user_id',
});
User.belongsToMany(Challenge, {
    through: Scores,
    as: "scores",
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

module.exports = {
    User, Challenge, Scores, Logs
};