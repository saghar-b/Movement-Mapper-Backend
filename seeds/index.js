const sequelize = require("../config/connection");
const moment = require("moment");
const { User, Challenge, Participate } = require("../models");

const users = [
    {
        user_name: "Saghar",
        email: "behinaeen.saghar@gmail.com",
        password: "123",

    }, {
        user_name: "Nicole",
        email: "Nicole@gmail.com",
        password: "password"
    }


]
const challenge = [
    {
        Challenge_type: "run",
        Challenge_name: "greenlacke run",

    }, {
        Challenge_type: "sweem",
        Challenge_name: "fircrest swimming pool",
    }, {
        Challenge_type: "rowing",
        Challenge_name: "lake washington row",
    }, {
        Challenge_type: "biking",
        Challenge_name: "seattle bike",
    }
]
const participate = [
    {
        user_id: "1",
        challenge_id: "1",
        distance : 5,

    }, 
    {
        user_id: "1",
        challenge_id: "3",
        distance : 5.5,

    }, 
    {
        user_id: "1",
        challenge_id: "4",
        distance : 3,

    }, 
    {
        user_id: "2",
        challenge_id: "2",
        distance : 2.3,

    }, 
    {
        user_id: "2",
        challenge_id: "3",
        distance : 5,

    }, 
    {
        user_id: "2",
        challenge_id: "4",
        distance : 6,

    }, 
]



const feedMe = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        });
        await Challenge.bulkCreate(challenge);
        await Participate.bulkCreate(participate)

        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()
