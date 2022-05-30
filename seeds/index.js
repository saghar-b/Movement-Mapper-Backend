const sequelize = require("../config/connection");
const moment = require("moment");
const { User, Challenge, Participate, Logs } = require("../models");

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
        creator_id:2

    }, {
        Challenge_type: "sweem",
        Challenge_name: "fircrest swimming pool",
        creator_id:2
    }, {
        Challenge_type: "rowing",
        Challenge_name: "lake washington row",
        creator_id:2
    }, {
        Challenge_type: "biking",
        Challenge_name: "seattle bike",
        creator_id:1
    }
]
const participate = [
    {
        user_id: "1",
        challenge_id: "1",
        distance : "5.5"
    }, 
    {
        user_id: "1",
        challenge_id: "3",
        distance : "3.5"
    }, 
    {
        user_id: "1",
        challenge_id: "4",
        distance : "5"
    }, 
    {
        user_id: "2",
        challenge_id: "2",
        distance : "4"
    }, 
    {
        user_id: "2",
        challenge_id: "3",
        distance : "3"
    }, 
    {
        user_id: "2",
        challenge_id: "4",
        distance : "5"
    }, 
]
const logs = [
    {
        activity_type : "run",
        user_id: "1",
        distance: "1",
    }, 
    {
        activity_type : "run",
        user_id: "1",
        distance: "3",
    }, 
    {
        activity_type : "run",
        user_id: "1",
        distance: "6",
    }, 
    {
        activity_type : "run",
        user_id: "2",
        distance: "1",
    }, 
    {
        activity_type : "swim",
        user_id: "2",
        distance: "13",
    }, 
    {
        activity_type : "run",
        user_id: "2",
        distance: "1",
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
        await Logs.bulkCreate(logs)

        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()
