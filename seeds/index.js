const sequelize = require("../config/connection");
const moment = require("moment");
const { User, Challenge, Scores, Logs } = require("../models");

const users = [
    {
        user_name: "Saghar",
        email: "behinaeen.saghar@gmail.com",
        password: "password",
    },
    {
        user_name: "Nicole",
        email: "Nicole@gmail.com",
        password: "password"
    },
    {
        user_name: "Pablo",
        email: "Pablo@gmail.com",
        password: "password"
    },
    {
        user_name: "Jonathan",
        email: "Jonathan@gmail.com",
        password: "password"
    }


]


const feedMe = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        });
        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()
