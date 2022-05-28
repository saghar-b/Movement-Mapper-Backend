// import models

const User = require('./User');
const Challenge = require('./Challenge');
const Participate = require('./Participate');

// Many to many relationship between User and Challenge through Participate
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
module.exports = {
    User,Challenge,Participate
};